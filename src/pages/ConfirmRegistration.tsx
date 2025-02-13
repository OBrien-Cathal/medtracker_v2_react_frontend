import {useNavigate, useParams} from "react-router-dom";
import {IRegistrationParams} from "../types/params.type.ts";
import {MTPage, MTPageHeading, MTPageBody, MTPageContent} from "../components/pages/MTPage.tsx";
import MTSectionWithControls from "../components/MTSectionWithControls.tsx";
import CenteredFlex from "../components/layout/CenteredFlex.tsx";


import Swal from "sweetalert2";
import accountRegistrationService from "../service/accountRegistrationService.tsx";


const ConfirmRegistration = () => {
    const params = useParams<IRegistrationParams>()
    console.log(params.userId)
    console.log(params.regUUID)
    const userId = params.userId ? params.userId : ''
    const regUUID = params.regUUID ? params.regUUID : ''

    const navigate = useNavigate()

    const confirmRegistration = () => {
        accountRegistrationService.confirmRegistration(userId, regUUID)
            .then((r) => {
                Swal.fire({
                    title: "Registration",
                    text: r.data
                }).then()
                return r.data === 'Confirmed'
            }).then(value => {

            if (value) navigate("/login")

        }).catch(reason => {
            console.log(reason)
            Swal.fire({
                title: "Confirmation Failed",
                text: reason.response.data.message,
                icon: "error"
            }).then();
        })
    }


    return (
        <MTPage>
            <MTSectionWithControls
                mtHeading={
                    <MTPageHeading>
                        Confirm Registration
                    </MTPageHeading>
                }
            >
            </MTSectionWithControls>
            <MTPageBody>
                <MTPageContent>
                    <CenteredFlex>Confirm your account by clicking the button below</CenteredFlex>
                    <CenteredFlex>
                        <div className={'buttonContainer'}>
                            <input className={'inputButton'} type='submit' value={'Confirm Registration'}
                                   onClick={confirmRegistration}/>
                        </div>
                    </CenteredFlex>

                </MTPageContent>
            </MTPageBody>
        </MTPage>
    )
}

export default ConfirmRegistration