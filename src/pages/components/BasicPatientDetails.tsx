import {MTSectionBody, MTSectionHeading} from "../../components/section/MTSection.tsx";
import {MTPageDescription} from "../../components/pages/MTPage.tsx";
import MTSectionWithControls from "../../components/MTSectionWithControls.tsx";
import {IAccountDetailsType} from "../../types/account-details.type.ts";
import CenteredFlex from "../../components/layout/CenteredFlex.tsx";

type Props = {
    accountDetails: IAccountDetailsType
}

const BasicPatientDetails = ({accountDetails}: Props) => {

    return (
        <MTSectionWithControls
            mtHeading={
                <MTSectionHeading>
                    Details
                </MTSectionHeading>
            }
            mtDescription={
                <MTPageDescription>
                    <p>Basic User Details</p>
                </MTPageDescription>
            }>
            <MTSectionBody>
                <CenteredFlex>
                    <div className={'user-details'}>
                        <div className={'labeled-field'}>
                            <label>First Name</label>
                            <div className={'read-only-field'}>
                                <text>
                                    {
                                        accountDetails?.firstName}
                                </text>

                            </div>
                        </div>
                        <div className={'labeled-field'}>
                            <label>Surname</label>
                            <div className={'read-only-field'}>
                                <text>
                                    {
                                        accountDetails?.surname}
                                </text>

                            </div>
                        </div>
                        <div className={'labeled-field'}>
                            <label>Email</label>
                            <div className={'read-only-field'}>
                                <text>
                                    {
                                        accountDetails?.email}
                                </text>

                            </div>
                        </div>
                        <div className={'labeled-field'}>
                            <label>User ID</label>
                            <div className={'read-only-field'}>
                                <text>
                                    {
                                        accountDetails?.userModelId}
                                </text>

                            </div>
                        </div>
                    </div>
                </CenteredFlex>
            </MTSectionBody>
        </MTSectionWithControls>


    )
}

export default BasicPatientDetails