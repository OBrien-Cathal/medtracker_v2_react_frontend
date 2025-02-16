// import Swal from "sweetalert2";
import {useAuth} from "../../auth/AuthProvider.tsx";
import {useState} from "preact/compat";
import * as React from "preact/compat";
import Swal from "sweetalert2";
import {MTPage, MTPageHeading, MTPageBody, MTPageContent, MTPageDescription} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import {BulkDataService} from "../../service/bulk-data.service.tsx";


const UploadPage = () => {
    const {token} = useAuth()
    const [doseFile, setDoseFile] = useState<File | null>(null);
    const [bpFile, setBpFile] = useState<File | null>(null);
    const bulkDataService = new BulkDataService(token)

    const handleDoseFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        console.log("dose handle")
        if (target) {
            if (target.files) {
                setDoseFile(target.files[0]);
            }
        }

    };

    const handleBpFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        console.log("bp handle")
        if (target) {
            if (target.files) {
                setBpFile(target.files[0]);
            }
        }
    };


    function onUploadDoseFileClick(e: Event) {
        e.preventDefault();
        let data = new FormData();
        data.append('dosesFile', doseFile as Blob);
        bulkDataService.uploadDoseFile(data).then(r => {
            if (r.data.responseInfo.successful) {
                handleSuccessfulUpload(r.data.responseInfo.message);
            } else {
                handleFailedUpload(r.data.responseInfo.message, r.data.responseInfo.errors)
            }
        }).catch(e => console.log(e.error))

    }

    function handleSuccessfulUpload(message: string) {
        console.log(message)
        Swal.fire({
            title: "Upload Successful",
            text: message,
            icon: "success"
        }).then()
    }

    function handleFailedUpload(message: string, errors: string[]) {
        console.log(message)

        Swal.fire("ERROR", errors.join("\n"), "error").then()

    }

    function onUploadBpFileClick(e: Event) {
        e.preventDefault();
        let data = new FormData();
        data.append('bloodPressureFile', bpFile as Blob);
        bulkDataService.uploadBloodPressureFile(data).then(r => {
            if (r.data.responseInfo.successful) {
                handleSuccessfulUpload(r.data.responseInfo.message);
            } else {
                handleFailedUpload(r.data.responseInfo.message, r.data.responseInfo.errors)

            }
        }).catch(e => console.log(e.error))

    }


    return (
        <MTPage>
            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        Upload
                    </MTPageHeading>}
                mtDescription={
                    <MTPageDescription>
                        <p>
                            Bulk data for different metrics can be uploaded below, the expect file format is
                            Excel
                            (.xlsx)
                        </p>
                    </MTPageDescription>
                }>

            </MTSectionWithControls>
            <MTPageBody>
                <MTPageContent>
                    <div className="uploadsContainer">
                        <div className={'uploadContainer'}>
                            <div className={'uploadContainer-header'}>
                                <div className={'upload-header'}>Dose</div>
                            </div>
                            <div className="input-group">
                                <input id="doseFile" type="file" onChange={handleDoseFileChange}/>
                            </div>
                            <br/>
                            {doseFile && (
                                <section>
                                    File details:
                                    <ul>
                                        <li>Name: {doseFile.name}</li>
                                        <li>Type: {doseFile.type}</li>
                                        <li>Size: {doseFile.size} bytes</li>
                                    </ul>
                                </section>
                            )}
                            <div className={'uploadContainerSubmitBox'}>
                                {doseFile && (
                                    <input
                                        type={'submit'}
                                        onClick={onUploadDoseFileClick}
                                        className="submitDose">
                                        Upload a file
                                    </input>
                                )}
                            </div>
                        </div>

                        <div className={'uploadContainer'}>
                            <div className={'uploadContainer-header'}>
                                <div className={'upload-header'}>Blood Pressure</div>
                            </div>
                            <div className="input-group">
                                <input id="bpfile" type="file" onChange={handleBpFileChange}/>
                            </div>
                            <br/>
                            {bpFile && (
                                <section>
                                    File details:
                                    <ul>
                                        <li>Name: {bpFile.name}</li>
                                        <li>Type: {bpFile.type}</li>
                                        <li>Size: {bpFile.size} bytes</li>
                                    </ul>
                                </section>
                            )}

                            <div className={'uploadContainerSubmitBox'}>
                                {bpFile && (
                                    <input
                                        type={'submit'}
                                        onClick={onUploadBpFileClick}
                                        className="submitBp">
                                        Upload a file
                                    </input>
                                )}
                            </div>
                        </div>
                    </div>
                </MTPageContent>
            </MTPageBody>

        </MTPage>


    )
}
export default UploadPage