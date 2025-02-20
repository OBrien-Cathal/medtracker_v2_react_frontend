import {useMemo} from "react";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../../../components/table/ReactTable.tsx";
import {ISubmittedBloodPressureData} from "../../../types/blood-pressure.type.ts";
import CenteredFlex from "../../../components/layout/CenteredFlex.tsx";
import {formatTimestamp} from "../../../date-time-utils.ts";


type Props = {
    readings: ISubmittedBloodPressureData[]
}

const DailyBloodPressure = ({readings}: Props) => {


    const Columns: ColumnDef<ISubmittedBloodPressureData>[] = [
        {
            header: "Time",
            accessorFn: originalRow => {
                return originalRow.readingTime ? formatTimestamp(originalRow.readingTime) : '-'
            },
        },
        {
            header: "Systole",
            accessorKey: "systole",
        },
        {
            header: "Diastole",
            accessorKey: "diastole",
        },
        {
            header: "Heart rate",
            accessorKey: "heartRate",
        },
        {
            header: "Day Stage",
            accessorFn: originalRow => {
                return originalRow.dayStage ? originalRow.dayStage.substring(0, 1) +
                    originalRow.dayStage.substring(1, originalRow.dayStage.length).toLowerCase() : '-'
            },
        },


    ];

    const columns = useMemo(() => Columns, []);
    return (
        <CenteredFlex>
            <ReactTable<ISubmittedBloodPressureData> data={readings} columns={columns}/>
        </CenteredFlex>
    )
}

export default DailyBloodPressure