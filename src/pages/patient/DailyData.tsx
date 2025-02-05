import {useAuth} from "../../auth/AuthProvider.tsx";
import {BloodPressureService} from "../../service/bloodPressure.service.tsx";
import {DosesService} from "../../service/dosesService.tsx";
import {useState} from "preact/compat";
import {useEffect} from "react";
import {handleError, handleResponse} from "../utils/response-handler.tsx";
import {IBloodPressureData, ISubmittedBloodPressureData} from "../../types/blood-pressure.type.ts";
import DailyBloodPressure from "./components/DailyBloodPressure.tsx";
import BloodPressureEntry from "./components/BloodPressureEntry.tsx";
import {PrescriptionService} from "../../service/prescription.service.tsx";
import DoseData from "./components/DoseData.tsx";
import {IDailyDoseData, IDailyMedicationDoseData} from "../../types/dose.type.ts";
import {MTPage, MTPageBody, MTPageContent, MTPageDescription, MTPageHeading} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import {MTSectionBody, MTSectionGroupHeading} from "../../components/section/MTSection.tsx";
import DateWidget from "../../components/date/DateWidget.tsx";

const DataVis = () => {
    const {token} = useAuth()
    const bloodPressureService = new BloodPressureService(token)
    const prescriptionService = new PrescriptionService(token)
    const dosesService = new DosesService(token)

    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10))
    const [dayStages, setDayStages] = useState<string[]>([])
    const [bloodPressureReadings, setBloodPressureReadings] = useState<ISubmittedBloodPressureData[]>([])

    const [doseReadings, setDoseReadings] = useState<IDailyMedicationDoseData[]>([])

    function getDayStages() {
        if (dayStages.length != 0) return
        console.log('getting day stages')
        prescriptionService.getDayStages()
            .then(r => {
                console.log(r.data)
                setDayStages(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function getDailyDoses() {
        dosesService.getDailyDoseData(date)
            .then(r => {
                handleResponse(r)
                setDoseReadings(r.data.medicationDoses)
            })
            .catch(e => handleError(e))
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

    function saveDailyDoseDataReading(reading: IDailyDoseData, newVal: boolean) {
        dosesService.addDailyDoseData({date: date, dailyDoseData: {...reading, taken: newVal}})
            .then(r => {
                handleResponse(r)
                console.log(r.data)
                getDailyDoses()
            }).catch(e => handleError(e))
    }

    function updateDate(newDateString: string) {
        setDate(newDateString)
        getBloodPressureData()
        getDailyDoses()
    }

    useEffect(() => {
        getDayStages()
        getBloodPressureData()
        getDailyDoses()
    }, [])
    return (
        <MTPage>
            <MTPageBody>

                <MTSectionWithControls
                    mtHeading={
                        <MTPageHeading>
                            <div>Daily Data</div>
                        </MTPageHeading>}
                    mtDescription={
                        <MTPageDescription>
                            <p>Daily view of entered data</p>
                        </MTPageDescription>
                    }/>

                <MTPageContent>
                    <DateWidget date={date} updateDate={updateDate}/>

                    <br/>

                    <MTSectionWithControls
                        mtHeading={
                            <MTSectionGroupHeading>
                                Blood Pressure
                            </MTSectionGroupHeading>
                        }

                        mtDescription={
                            <MTPageDescription>
                                <p>Blood pressure readings for the selected date</p>
                            </MTPageDescription>
                        }>
                        <MTSectionBody>

                            <DailyBloodPressure
                                readings={bloodPressureReadings}>

                            </DailyBloodPressure>
                            <br/>
                            <BloodPressureEntry
                                saveBloodPressureReading={saveBloodPressureReading}
                                dayStages={dayStages}>

                            </BloodPressureEntry>


                        </MTSectionBody>
                    </MTSectionWithControls>


                    <MTSectionWithControls
                        mtHeading={
                            <MTSectionGroupHeading>
                                Medication Dose Schedule
                            </MTSectionGroupHeading>
                        }

                        mtDescription={
                            <MTPageDescription>
                                <p>
                                    Dosage status for all current
                                    prescriptions.
                                </p>
                                <p>
                                    By default the system assumes
                                    that schedules are adhered to, manual
                                    changes can be made if reality does not
                                    reflect this assumption
                                </p>
                            </MTPageDescription>
                        }>
                        <MTSectionBody>

                            <DoseData
                                readings={doseReadings}
                                saveDailyDoseData={saveDailyDoseDataReading}></DoseData>

                        </MTSectionBody>
                    </MTSectionWithControls>


                </MTPageContent>
            </MTPageBody>
        </MTPage>


    )
}

export default DataVis