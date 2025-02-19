// import Swal from "sweetalert2";
import {useAuth} from "../../auth/AuthProvider.tsx";
import {useState} from "preact/compat";
import * as React from "preact/compat";
import Swal from "sweetalert2";
import {MTPage, MTPageHeading, MTPageBody, MTPageContent, MTPageDescription} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import {BulkDataService} from "../../service/bulk-data.service.tsx";
import {AxiosResponse} from "axios";
import {MTSectionHeading} from "../../components/section/MTSection.tsx";
import {handleError, handleResponseAndNotify} from "../utils/response-handler.tsx";


const DataManagementPage = () => {
    const {token} = useAuth()
    const [doseFile, setDoseFile] = useState<File | null>(null);
    const [bpFile, setBpFile] = useState<File | null>(null);
    const bulkDataService = new BulkDataService(token)


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

    function onDownloadBloodPressureFileClicked() {
        bulkDataService.downloadBloodPressureFile().then(value => {
            saveExcelFileData(value)
        })
    }

    function onDownloadDoseFileClicked() {
        bulkDataService.downloadDoseFile().then(value => {
            saveExcelFileData(value)
        })
    }


    function saveExcelFileData(response: AxiosResponse) {

        const url = window.URL.createObjectURL(new Blob([response.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));

        const disposition: string = response.headers['content-disposition']
        let strings = disposition.split(';')
        let found = strings.find(n => n.includes('filename='))
        let filenameToUse = found == null ? 'unknown_file.xlsx' : found.replace('filename=', '').trim();

        console.log(disposition)

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filenameToUse);
        document.body.appendChild(link);
        link.click();

    }

    function archiveToEmail() {
        bulkDataService.archiveToEmail().then(value => {
            handleResponseAndNotify(value);
        }).catch(reason => handleError(reason))
    }

    return (
        <MTPage>
            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        Data Management
                    </MTPageHeading>}
                mtDescription={
                    <MTPageDescription>
                        <p>
                            Bulk data for different metrics can be uploaded and downloaded below, the expected file
                            format is
                            Excel
                            (.xlsx)
                        </p>
                    </MTPageDescription>
                }>

            </MTSectionWithControls>
            <MTPageBody>
                <MTPageContent>

                    <FileComponent title={"Dose"} file={doseFile} setFile={setDoseFile}
                                   upload={onUploadDoseFileClick} download={onDownloadDoseFileClicked}/>

                    <FileComponent title={"Blood Pressure"} file={bpFile} setFile={setBpFile}
                                   upload={onUploadBpFileClick} download={onDownloadBloodPressureFileClicked}/>

                    <input
                        type={'button'}
                        onClick={() => archiveToEmail()}
                        value={'Send all data to registered email'}
                    />

                </MTPageContent>
            </MTPageBody>

        </MTPage>


    )
}


type FileComponentProps = {
    title: string;
    file: File | null;
    setFile: Function;
    upload: Function;
    download: Function;
}

const FileComponent = ({title, file, setFile, upload, download}: FileComponentProps) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target) {
            if (target.files) {
                setFile(target.files[0]);
            }
        }
    };


    return <MTSectionWithControls
        mtHeading={
            <MTSectionHeading>
                {title}
            </MTSectionHeading>}>

        <div className={'data-file-manager'}>
            <div className={'upload-data-file-container'}>
                <div className="input-group">
                    <input id={title + "File"} type="file" onChange={(event) => handleFileChange(event)}/>
                </div>
                <br/>
                {file && (
                    <section>
                        File details:
                        <ul>
                            <li>Name: {file.name}</li>
                            <li>Type: {file.type}</li>
                            <li>Size: {file.size} bytes</li>
                        </ul>
                    </section>
                )}
                <div className={'uploadContainerSubmitBox'}>
                    {file && (
                        <input
                            type={'submit'}
                            onClick={(event) => upload(event)}
                            value={'Upload'}
                            className="submitDose"/>


                    )}
                </div>
            </div>
            <div className={'download-data-file-container'}>
                <input
                    type={'button'}
                    onClick={() => download()}
                    value={'Download'}
                    className="download"/>
            </div>

        </div>

    </MTSectionWithControls>

}


export default DataManagementPage