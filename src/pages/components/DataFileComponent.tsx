import * as React from "react";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import {MTSectionBody, MTSectionContent, MTSectionHeading} from "../../components/section/MTSection.tsx";


type FileComponentProps = {
    title: string;
    file: File | null;
    setFile: Function;
    upload: Function;
    download: Function;
}

const DataFileComponent = ({title, file, setFile, upload, download}: FileComponentProps) => {

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
        <MTSectionBody>
            <MTSectionContent>


                <div className={'data-file-manager'}>
                    <MTSectionWithControls
                        mtHeading={
                            <MTSectionHeading>
                                Upload
                            </MTSectionHeading>}>
                        <MTSectionBody>
                            <MTSectionContent>
                                <div className={'upload-data-file-container'}>
                                    <div className="input-group">
                                        <input id={title + "File"} type="file"
                                               onChange={(event) => handleFileChange(event)}/>
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
                            </MTSectionContent>
                        </MTSectionBody>
                    </MTSectionWithControls>
                    <MTSectionWithControls
                        mtHeading={
                            <MTSectionHeading>
                                Download
                            </MTSectionHeading>}>
                        <MTSectionBody>
                            <MTSectionContent>
                                <div className={'download-data-file-container'}>
                                    <input
                                        type={'button'}
                                        onClick={() => download()}
                                        value={'Download'}
                                        className="download"/>
                                </div>
                            </MTSectionContent>
                        </MTSectionBody>
                    </MTSectionWithControls>
                </div>
            </MTSectionContent>
        </MTSectionBody>

    </MTSectionWithControls>

}


export default DataFileComponent