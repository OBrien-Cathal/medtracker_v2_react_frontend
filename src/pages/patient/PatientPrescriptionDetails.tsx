import { useParams} from "react-router-dom";
import {IParams} from "../../types/params.type.ts";

const PatientPrescriptionDetails = () => {
    const {id} = useParams<IParams>()
    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>PAtient PrescriptionDetails</div>
            </div>
            <div>Fill PrescriptionDetails here for ID: {id}</div>
        </div>
    )
}

export default PatientPrescriptionDetails