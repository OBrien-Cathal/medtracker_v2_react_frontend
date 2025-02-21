import {useAuth} from "../../auth/AuthProvider.tsx";
import {useState} from "preact/compat";
import Swal from "sweetalert2";
import {MTPage, MTPageHeading, MTPageBody, MTPageContent, MTPageDescription} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import {BulkDataService} from "../../service/bulk-data.service.tsx";
import {AxiosResponse} from "axios";

import DataFileComponent from "../components/DataFileComponent.tsx";


const PractitionerDataManagementPage = () => {
    const {token} = useAuth()
    const [prescriptionsFile, setPrescriptionsFile] = useState<File | null>(null);
    const [medicationsFile, setMedicationsFile] = useState<File | null>(null);
    const bulkDataService = new BulkDataService(token)


    function onUploadPrescriptionsFileClick(e: Event) {
        e.preventDefault();
        let data = new FormData();
        data.append('prescriptionsFile', prescriptionsFile as Blob);
        bulkDataService.uploadPrescriptionsFile(data).then(r => {
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

    function onUploadMedicationsFileClick(e: Event) {
        e.preventDefault();
        let data = new FormData();
        data.append('medicationsFile', medicationsFile as Blob);
        bulkDataService.uploadMedicationsFile(data).then(r => {
            if (r.data.responseInfo.successful) {
                handleSuccessfulUpload(r.data.responseInfo.message);
            } else {
                handleFailedUpload(r.data.responseInfo.message, r.data.responseInfo.errors)

            }
        }).catch(e => console.log(e.error))

    }

    function onDownloadMedicationsFileClicked() {
        bulkDataService.downloadMedicationsFile().then(value => {
            saveExcelFileData(value)
        })
    }

    function onDownloadPrescriptionsFileClicked() {
        bulkDataService.downloadPrescriptionsFile().then(value => {
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

                    <DataFileComponent title={"Prescriptions"} file={prescriptionsFile} setFile={setPrescriptionsFile}
                                   upload={onUploadPrescriptionsFileClick} download={onDownloadPrescriptionsFileClicked}/>

                    <DataFileComponent title={"Medications"} file={medicationsFile} setFile={setMedicationsFile}
                                   upload={onUploadMedicationsFileClick} download={onDownloadMedicationsFileClicked}/>
                </MTPageContent>
            </MTPageBody>

        </MTPage>


    )
}



export default PractitionerDataManagementPage