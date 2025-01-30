// import Swal from "sweetalert2";
import {useAuth} from "../../auth/AuthProvider.tsx";
import {PatientDataService} from "../../service/patient.service.tsx";
import {useState} from "preact/compat";
import * as React from "preact/compat";
import SectionComponentWithDescription from "../../components/SectionComponentWithDescription.tsx";
import Swal from "sweetalert2";

const UploadPage = () => {
    const {token} = useAuth()
    const [doseFile, setDoseFile] = useState<File | null>(null);
    const [bpFile, setBpFile] = useState<File | null>(null);
    const patientDataService = new PatientDataService(token)

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
        patientDataService.uploadDoseFile(data).then(r => {
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
        patientDataService.uploadBloodPressureFile(data).then(r => {
            if (r.data.responseInfo.successful) {
                handleSuccessfulUpload(r.data.responseInfo.message);
            } else {
                handleFailedUpload(r.data.responseInfo.message, r.data.responseInfo.errors)

            }
        }).catch(e => console.log(e.error))

    }


    return (
        <div className="mainContainer">

            <br/>
            <br/>
            <div className={'max-width-section'}>
                <SectionComponentWithDescription
                    heading={
                    <div className={'titleContainer'}>
                        <div>Upload</div>
                    </div>}
                    description={<p>Bulk data for different metrics can be uploaded below, the expect file format is
                        Excel
                        (.xlsx)</p>}
                    content={
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
                        </div>}/></div>
        </div>
    )
}

export default UploadPage