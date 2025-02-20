import {useMemo} from "react";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../../../components/table/ReactTable.tsx";

import {IDailyDoseData, IDailyMedicationDoseData} from "../../../types/dose.type.ts";
import MTSectionWithControls from "../../../components/MTSectionWithControls.tsx";
import {MTSectionDescription, MTSectionHeading} from "../../../components/section/MTSection.tsx";
import CenteredFlex from "../../../components/layout/CenteredFlex.tsx";
import {formatTimestamp} from "../../../date-time-utils.ts";


type Props = {
    readings: IDailyMedicationDoseData[]
    saveDailyDoseData: Function
}

const DoseData = ({readings, saveDailyDoseData}: Props) => {


    const Columns: ColumnDef<IDailyDoseData>[] = [
        {
            header: "Update time",
            accessorFn: originalRow => {
                return originalRow.doseTime ? formatTimestamp(originalRow.doseTime) : '-'
            }
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
        <div className={'DailyDataSectionWrapper'}>
            {readings && readings.map(r => {
                    return (
                        <MTSectionWithControls
                            mtHeading={
                                <MTSectionHeading>

                                    <div className={'row'}>
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
                                </MTSectionHeading>

                            }
                            mtDescription={
                                <MTSectionDescription>
                                    <p>Dosage status for a prescription, the day stage indicates the time of
                                        day a dose
                                        should be taken.</p>
                                </MTSectionDescription>
                            }

                        >
                            <div className={'DailyMedicationDoseData'}>

                                <CenteredFlex>
                                    <ReactTable<IDailyDoseData> data={r.doses} columns={columns}/>
                                </CenteredFlex>


                            </div>

                        </MTSectionWithControls>
                    )
                }
            )}
        </div>
    )
}

export default DoseData