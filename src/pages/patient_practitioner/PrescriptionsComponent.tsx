import PractitionerPrescriptionDetails from "../Practitioner/PractitionerPrescriptionDetails.tsx";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {IPrescriptionDetailsType, IPrescriptionOverviewType} from "../../types/prescription.type.ts";
import {PrescriptionService} from "../../service/prescription.service.tsx";
import {useEffect, useMemo, useState} from "react";
import {ColumnDef} from "@tanstack/react-table";
import PatientPrescriptionDetails from "../patient/PatientPrescriptionDetails.tsx";
import {
    MTSectionBody,
    MTSectionContent,
    MTSectionDescription,
    MTSectionHeading,
} from "../../components/section/MTSection.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import CenteredFlex from "../../components/layout/CenteredFlex.tsx";
import {formatTimestamp} from "../../date-time-utils.ts";
import {useRef} from "react";

type Props = {
    token: string
    patientId: number | null

}

const PrescriptionsComponent = ({token, patientId}: Props) => {
    const prescriptionService = new PrescriptionService(token)
    const detailsRef = useRef<HTMLDivElement| null>(null)

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
    const [expiredPrescriptionList, setExpiredPrescriptionList] = useState<IPrescriptionOverviewType[]>([])
    const [prescriptionDetails, setPrescriptionDetails] = useState<IPrescriptionDetailsType>(prescriptionDetailsPlaceholder)

    function getPrescriptions() {
        getPrescriptionOverviews()
            .then(r => {
                let now = new Date();
                setExpiredPrescriptionList(r.data.filter((v) => {
                    return isExpired(v.endTime, now)
                }))

                setPrescriptionList(r.data.filter((v) => {
                    return !isExpired(v.endTime, now)
                }))
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function isExpired(endTime: string | null, now: Date): boolean {
        if (endTime === null || endTime === '') return false
        return new Date(endTime).getMilliseconds() < now.getMilliseconds()
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
            if (r.data.responseInfo.successful) {
                console.log(r.data.responseInfo.message)
                setPrescriptionDetails(r.data.prescriptionDetails)
                detailsRef.current?.scrollIntoView()
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
                return originalRow.beginTime ? formatTimestamp(originalRow.beginTime) : '-'
            },
        },
        {
            header: "End",
            accessorFn: originalRow => {

                return originalRow.endTime ? formatTimestamp(originalRow.endTime) : '-'
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
                    <p>Prescriptions that are currently active</p>
                </MTSectionDescription>
            }>
                <MTSectionBody>
                    <MTSectionContent>
                        <CenteredFlex>
                            <ReactTable<IPrescriptionOverviewType> data={prescriptionList} columns={columns}/>
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
                }
                isInitiallyCollapsed={true}>
                <MTSectionBody>
                    <MTSectionContent>
                        <CenteredFlex>
                            <ReactTable<IPrescriptionOverviewType> data={expiredPrescriptionList} columns={columns}/>

                        </CenteredFlex>
                    </MTSectionContent>
                </MTSectionBody>
            </MTSectionWithControls>


            <CenteredFlex>

                <div ref={detailsRef} id={'details'}>
                    {patientId &&
                        <PractitionerPrescriptionDetails
                            token={token}
                            patientId={patientId}
                            prescriptionDetails={prescriptionDetails}
                            getPrescriptionDetails={getPrescriptionDetails}>
                        </PractitionerPrescriptionDetails>}


                    {!patientId &&
                        <PatientPrescriptionDetails
                            prescriptionDetails={prescriptionDetails}></PatientPrescriptionDetails>}</div>

            </CenteredFlex>


        </MTSectionContent>
    )
}

export default PrescriptionsComponent