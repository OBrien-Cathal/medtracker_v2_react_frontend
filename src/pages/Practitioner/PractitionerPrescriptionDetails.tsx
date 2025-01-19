import { useParams} from "react-router-dom";
import {IParams} from "../../types/params.type.ts";

const PractitionerPrescriptionDetails = () => {
    const {id, userId} = useParams<IParams>()

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>PRACTITIONER PrescriptionDetails</div>
            </div>
            <div>Fill PrescriptionDetails here for ID: {id}</div>
            <div> Patient ID: {userId}</div>
        </div>
    )
}

export default PractitionerPrescriptionDetails