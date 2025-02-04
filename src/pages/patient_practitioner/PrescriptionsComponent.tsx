import PractitionerPrescriptionDetails from "../Practitioner/PractitionerPrescriptionDetails.tsx";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {IPrescriptionDetailsType, IPrescriptionOverviewType} from "../../types/prescription.type.ts";
import {PrescriptionService} from "../../service/prescription.service.tsx";
import {useEffect, useMemo, useState} from "react";
import {ColumnDef} from "@tanstack/react-table";
import PatientPrescriptionDetails from "../patient/PatientPrescriptionDetails.tsx";
import {
    MTSectionHeading,
    MTSectionDescription,
    MTSectionBody,
    MTSectionContent,
} from "../../components/section/MTSection.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import CenteredFlex from "../../components/layout/CenteredFlex.tsx";

type Props = {
    token: string
    patientId: number | null

}

const PrescriptionsComponent = ({token, patientId}: Props) => {
    const prescriptionService = new PrescriptionService(token)

    const prescriptionDetailsPlaceholder: IPrescriptionDetailsType = {
        id: null,
        doseMg: 0,
        medication: null,
        beginTime: '',
        endTime: '',
        patientId: patientId,
        practitionerId: 2,
        prescriptionScheduleEntries: []
    }

    const [prescriptionList, setPrescriptionList] = useState<IPrescriptionOverviewType[]>([])
    const [prescriptionDetails, setPrescriptionDetails] = useState<IPrescriptionDetailsType>(prescriptionDetailsPlaceholder)

    function getPrescriptions() {
        getPrescriptionOverviews()
            .then(r => {
                setPrescriptionList(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function getPrescriptionOverviews() {
        if (patientId) {
            return prescriptionService.getPrescriptionsForPractitionerPatient(patientId)
        } else {
            return prescriptionService.getPrescriptions()
        }
    }

    function getPrescriptionDetails(id: bigint | null) {
        if (!id) {
            setPrescriptionDetails({...prescriptionDetailsPlaceholder, id: null})
            return
        }

        prescriptionService.getPrescriptionDetails(id).then(r => {
            console.log('Received Get prescription details response  ')
            console.log(r.data)
            if (r.data.responseInfo.successful) {
                console.log(r.data.responseInfo.message)
                setPrescriptionDetails(r.data.prescriptionDetails)
            } else {
                console.log(r.data.responseInfo.message)
                console.log(r.data.responseInfo.errors)
            }
        })
    }

    useEffect(() => {
        getPrescriptions();
    }, [prescriptionDetails])

    const Columns: ColumnDef<IPrescriptionOverviewType>[] = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Medication",
            accessorKey: "medication.name",
        },
        {
            header: "Dose (mg)",
            accessorKey: "doseMg",
        },
        {
            header: "Patient",
            accessorKey: "patientUsername",
        },
        {
            header: "Prescriber",
            accessorKey: "practitionerUsername",
        },
        {
            header: "Start",
            accessorFn: originalRow => {
                let date = new Date(originalRow.beginTime);
                return originalRow.beginTime ? date.toDateString() + ' - ' + date.toLocaleTimeString() : '-'
            },
        },
        {
            header: "End",
            accessorFn: originalRow => {
                let date = new Date(originalRow.endTime);
                return originalRow.endTime ? date.toDateString() + ' - ' + date.toLocaleTimeString() : '-'
            },
        },

        {
            header: "Details",
            cell: ({cell}) => {
                const prescriptionId = cell.row.original.id
                return (
                    <input type={"button"} value="View Details"
                           onClick={() => getPrescriptionDetails(prescriptionId)}>
                        View Details
                    </input>)
            }
        },
    ];

    const columns = useMemo(() => Columns, []);

    return (
        <MTSectionContent>
            <MTSectionWithControls mtHeading={
                <MTSectionHeading>
                    Current
                </MTSectionHeading>
            } mtDescription={
                <MTSectionDescription>
                    <p>Prescriptions that are currently valid, (Work in progress still includes
                        old
                        prescriptions)</p>
                </MTSectionDescription>
            }>
                <MTSectionBody>
                    <MTSectionContent>
                        <CenteredFlex>


                            <ReactTable<IPrescriptionOverviewType> data={prescriptionList} columns={columns}/>


                            {patientId &&
                                <PractitionerPrescriptionDetails
                                    token={token}
                                    patientId={patientId}
                                    prescriptionDetails={prescriptionDetails}
                                    getPrescriptionDetails={getPrescriptionDetails}>
                                </PractitionerPrescriptionDetails>}


                            {!patientId &&
                                <PatientPrescriptionDetails
                                    prescriptionDetails={prescriptionDetails}></PatientPrescriptionDetails>}

                        </CenteredFlex>
                    </MTSectionContent>
                </MTSectionBody>
            </MTSectionWithControls>

            <br/>

            <MTSectionWithControls
                mtHeading={
                    <MTSectionHeading>
                        Expired
                    </MTSectionHeading>
                }
                mtDescription={
                    <MTSectionDescription>
                        <p>List of expired prescriptions, these can not be edited</p>
                    </MTSectionDescription>
                }>
                <MTSectionBody>
                    <MTSectionContent>
                        UNDER CONSTRUCTION
                    </MTSectionContent>
                </MTSectionBody>
            </MTSectionWithControls>
        </MTSectionContent>
    )
}

export default PrescriptionsComponent