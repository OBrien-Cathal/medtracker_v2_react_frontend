import {useParams} from "react-router-dom";
import {IParams} from "../../types/params.type.ts";


const MedicationDetails = () => {
const params = useParams<IParams>()
    const id= params.id
    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>MedicationDetails</div>
            </div>
            <div>Fill MedicationDetails here for ID: {id}</div>
        </div>
    )
}

export default MedicationDetails