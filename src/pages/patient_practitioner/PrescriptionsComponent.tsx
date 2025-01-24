import PractitionerPrescriptionDetails from "../Practitioner/PractitionerPrescriptionDetails.tsx";
import SectionComponentWithDescription from "../../components/SectionComponentWithDescription.tsx";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {IPrescriptionDetailsType, IPrescriptionOverviewType} from "../../types/prescription.type.ts";
import {PrescriptionService} from "../../service/prescription.service.tsx";
import {useEffect, useMemo, useState} from "react";
import {ColumnDef} from "@tanstack/react-table";
import MaxWidthSection from "../../components/MaxWidthSection.tsx";

type Props = {
    token: string
    patientId: number
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


    function onClickViewPrescriptionDetails(p: IPrescriptionOverviewType) {
        getPrescriptionDetails(p.id)
    }

    function setPrescriptionDetailsId(p: bigint) {
        getPrescriptionDetails(p)
    }

    function onClickResetSelectedPrescription() {
        setPrescriptionDetails({...prescriptionDetailsPlaceholder, id: null})
    }

    function getPrescriptions() {
        prescriptionService.getPrescriptionsForPractitionerPatient(patientId)
            .then(r => {
                setPrescriptionList(r.data)
            }).catch((reason) => {
            console.log(reason.errors)
        });
    }

    function getPrescriptionDetails(id: bigint | null) {
        if (!id) return

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
                const prescription = cell.row.original
                return (
                    <input type={"button"} value="View Details"
                           onClick={() => onClickViewPrescriptionDetails(prescription)}>
                        View Details
                    </input>)
            }
        },
    ];

    const columns = useMemo(() => Columns, []);

    return (<SectionComponentWithDescription
            heading={'Prescriptions'}
            description={
                <div>
                    <p>Prescription information for the current patient</p>
                </div>
            }
            content={
                <div>
                    <SectionComponentWithDescription
                        heading={'Current'}
                        description={
                            <div>
                                <p>Prescriptions that are currently valid, (Work in progress still includes old
                                    prescriptions)</p>
                            </div>
                        }
                        content={
                            <div className={'center-section-body'}>
                                <ReactTable<IPrescriptionOverviewType> data={prescriptionList} columns={columns}/>
                                <MaxWidthSection content={
                                    <SectionComponentWithDescription
                                        heading={`Prescription ${prescriptionDetails.id ? prescriptionDetails.id : '(New)'} Details`}
                                        description={
                                            <div>
                                                <p>Select a prescription from the above list to view details</p>
                                            </div>
                                        }
                                        content={
                                            <div>
                                                <PractitionerPrescriptionDetails
                                                    token={token}
                                                    patientId={patientId}
                                                    prescriptionDetails={prescriptionDetails}
                                                    setPrescriptionDetailsId={setPrescriptionDetailsId}>
                                                </PractitionerPrescriptionDetails>
                                                <input className={'inputButton'} type='submit' value={'Reset Edits'}
                                                       onClick={onClickResetSelectedPrescription}/>
                                            </div>

                                        }/>
                                }>
                                </MaxWidthSection>

                            </div>
                        }/>
                    <br/>
                    <SectionComponentWithDescription
                        heading={'Expired'}
                        description={
                            <div>
                                <p>Prescriptions that are no longer valid, this section is under construction </p>
                            </div>
                        }
                        content={
                            <div className={'center-section-body'}>
                            </div>
                        }/>
                </div>}/>
    )
}

export default PrescriptionsComponent