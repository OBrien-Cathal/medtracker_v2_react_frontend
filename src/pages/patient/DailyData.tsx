import {useAuth} from "../../auth/AuthProvider.tsx";
import {BloodPressureService} from "../../service/bloodPressure.service.tsx";
import {DosesService} from "../../service/dosesService.tsx";
import {useState} from "preact/compat";
import {TargetedEvent, useEffect} from "react";
import {handleError, handleResponse} from "../utils/response-handler.tsx";
import {IBloodPressureData, ISubmittedBloodPressureData} from "../../types/blood-pressure.type.ts";
import DailyBloodPressure from "./components/DailyBloodPressure.tsx";

import SectionComponentWithDescription from "../../components/SectionComponentWithDescription.tsx";
import BloodPressureEntry from "./components/BloodPressureEntry.tsx";
import {PrescriptionService} from "../../service/prescription.service.tsx";
import MaxWidthSection from "../../components/MaxWidthSection.tsx";


const DataVis = () => {
    const {token} = useAuth()
    const bloodPressureService = new BloodPressureService(token)
    const prescriptionService = new PrescriptionService(token)
    const dosesService = new DosesService(token)

    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10))
    const [dayStages, setDayStages] = useState<string[]>([])
    const [bloodPressureReadings, setBloodPressureReadings] = useState<ISubmittedBloodPressureData[]>([])

    function getDayStages() {
        prescriptionService.getDayStages()
            .then(r => {
                console.log(r.data)
                setDayStages(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function getDailyDoses() {
        dosesService.getDoseGraphData()
    }

    function getBloodPressureData() {
        bloodPressureService.getBloodPressureDailyData(date)
            .then(r => {
                handleResponse(r)
                setBloodPressureReadings(r.data.readings)
            })
            .catch(e => handleError(e))
    }

    function saveBloodPressureReading(reading: IBloodPressureData) {
        bloodPressureService.addBloodPressureDailyData({date: date, data: reading})
            .then(r => {
                handleResponse(r)
                console.log(r.data)
                getBloodPressureData()
            }).catch(e => handleError(e))
    }

    function onChangeDate(e: TargetedEvent<HTMLInputElement, Event>) {
        console.log(e.currentTarget.value)
        setDate(
            (e.currentTarget.value))
        getBloodPressureData()
    }

    useEffect(() => {
        getDayStages()
        getBloodPressureData()
        getDailyDoses()
    }, [])
    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Daily Data</div>
            </div>

            <MaxWidthSection content={
                <div className={'DailyEvaluation'}>
                    <SectionComponentWithDescription
                        heading={'Daily Data'}
                        description={
                            <div>
                                <p>Daily view of entered data</p>
                            </div>
                        }
                        content={

                            <div>
                                <div className={'labeled-field'}>
                                    <label>Viewing data for</label>
                                    <input aria-label="Date"
                                           value={
                                               date.toString()}
                                           type="date"
                                           onChange={(ev) => onChangeDate(ev)}
                                    />
                                </div>
                                <br/>

                                <MaxWidthSection content={
                                    <SectionComponentWithDescription heading={'Blood Pressure'}
                                                                     description={'Blood pressure readings for the selected date'}
                                                                     content={

                                                                         <div>
                                                                             <div className={'center-section-body'}>
                                                                                 <DailyBloodPressure
                                                                                     readings={bloodPressureReadings}></DailyBloodPressure>

                                                                             </div>
                                                                             <br/>
                                                                             <BloodPressureEntry
                                                                                 saveBloodPressureReading={saveBloodPressureReading}
                                                                                 dayStages={dayStages}></BloodPressureEntry>
                                                                         </div>
                                                                     }>
                                    </SectionComponentWithDescription>
                                }/>

                            </div>

                        }
                    />
                </div>
            }
            />
        </div>
    )
}

export default DataVis