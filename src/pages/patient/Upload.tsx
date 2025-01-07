// import Swal from "sweetalert2";
import {useAuth} from "../../auth/AuthProvider.tsx";
import {PatientDataService} from "../../service/patient.service.tsx";
import {useState} from "preact/compat";
import * as React from "preact/compat";

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
            if (r.data.requestSucceeded) {
                console.log(r.data.message)
            } else {
                console.log(r.data.errors)
            }
        }).catch(e => console.log(e.error))

    }

    function onUploadBpFileClick(e: Event) {
        e.preventDefault();
        let data = new FormData();
        data.append('bloodPressureFile', bpFile as Blob);
        patientDataService.uploadBloodPressureFile(data).then(r => {
            if (r.data.requestSucceeded) {
                console.log(r.data.message)
            } else {
                console.log(r.data.errors)
            }
        }).catch(e => console.log(e.error))

    }


    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Upload</div>
            </div>
            <br/>
            <div>Upload files here</div>
            <br/>
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
        </div>
    )
}

export default UploadPage