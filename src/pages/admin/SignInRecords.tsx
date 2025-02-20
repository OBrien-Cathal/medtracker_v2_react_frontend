import {useAuth} from "../../auth/AuthProvider.tsx";
import {useEffect, useMemo, useState} from "react";
import {ColumnDef} from "@tanstack/react-table";
import {MTPage, MTPageBody, MTPageContent, MTPageDescription, MTPageHeading} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import CenteredFlex from "../../components/layout/CenteredFlex.tsx";
import {ReactTable} from "../../components/table/ReactTable.tsx";
import {SignInRecordsService} from "../../service/sign-in-records.service.tsx";
import {ISignInRecordType} from "../../types/sign-in-records.type.ts";
import {formatTimestamp} from "../../date-time-utils.ts";

const SignInRecords = () => {
    const {token} = useAuth()


    const signInRecordsService = new SignInRecordsService(token)
    const [signInRecords, setSignInRecords] = useState<ISignInRecordType[]>([])


    function getSignInRecords() {
        signInRecordsService.getSignInRecords()
            .then(r => {
                console.log(r)
                setSignInRecords(r.data)

            }).catch((reason) => {
            console.log(reason.errors)
        });
    }


    useEffect(() => {
        getSignInRecords();
    }, [])

    const Columns: ColumnDef<ISignInRecordType>[] = [
        {
            header: "User ID",
            accessorKey: "userModelId",
        },
        {
            header: "Email",
            accessorKey: "username",
        },

        {
            header: "Sign In Time",
            accessorFn: originalRow => {
                return originalRow.signInTime ? formatTimestamp(originalRow.signInTime) : '-'
            }
        },
    ];

    const columns = useMemo(() => Columns, []);
    return (
        <MTPage>
            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        Access History
                    </MTPageHeading>
                }
                mtDescription={
                    <MTPageDescription>
                        <p>Log of user sign in events</p>
                    </MTPageDescription>}
            >
            </MTSectionWithControls>
            <MTPageBody>
                <MTPageContent>

                    <CenteredFlex>
                        <ReactTable<ISignInRecordType> data={signInRecords} columns={columns}/>
                    </CenteredFlex>

                </MTPageContent>
            </MTPageBody>
        </MTPage>
    )
}

export default SignInRecords