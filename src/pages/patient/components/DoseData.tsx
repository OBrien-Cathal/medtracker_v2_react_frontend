import {useMemo} from "react";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../../../components/table/ReactTable.tsx";

import {IDailyDoseData, IDailyMedicationDoseData} from "../../../types/dose.type.ts";
import SectionComponentWithDescription from "../../../components/SectionComponentWithDescription.tsx";


type Props = {
    readings: IDailyMedicationDoseData[]
    saveDailyDoseData: Function
}

const DoseData = ({readings, saveDailyDoseData}: Props) => {


    const Columns: ColumnDef<IDailyDoseData>[] = [
        {
            header: "Update time",
            accessorKey: "doseTime",
        },
        {
            header: "Day Stage",
            accessorFn: originalRow => {
                return originalRow.dayStage ? originalRow.dayStage.substring(0, 1) +
                    originalRow.dayStage.substring(1, originalRow.dayStage.length).toLowerCase() : '-'
            }
        },
        {
            header: "Taken",
            accessorKey: "taken",
        },

        {
            header: "Action",
            cell: ({cell}) => {
                const taken = cell.row.original.taken
                const obj = cell.row.original
                const label: string = taken ? 'Register Missed Dose' : 'Register Dose Taken'
                return (
                    <input type={"button"} value={label}
                           onClick={() => saveDailyDoseData(obj, !taken)}>
                        Approve
                    </input>)

            }
        },

    ];


    const columns = useMemo(() => Columns, []);
    return (
        <div className={'DoseData'}>
            {readings && readings.map(r => {
                    return (

                        <SectionComponentWithDescription
                            heading={
                                <div className={'single-row-section-header'}>
                                    <div className={'label-with-text'}>
                                        <label>
                                            Medication
                                        </label>
                                        <text>
                                            {r.medicationName}
                                        </text>
                                    </div>
                                    <div className={'label-with-text'}>
                                        <label>
                                            Dose
                                        </label>
                                        <text>
                                            {r.doseMg} Mg
                                        </text>
                                    </div>
                                </div>
                            }
                            description={
                                <div>
                                    <p>Dosage status for a prescription, the day stage indicates the time of day a dose
                                        should be taken.</p>

                                </div>
                            }
                            content={
                                <div className={'DailyMedicationDoseData'}>
                                    <div className={'center-section-body'}>
                                        <div className="DailyDoseData">
                                            <ReactTable<IDailyDoseData> data={r.doses} columns={columns}/>
                                        </div>
                                    </div>
                                </div>
                            }
                        />)
                }
            )}
        </div>
    )
}

export default DoseData