import CenteredFlex from "../components/layout/CenteredFlex.tsx";
import {List} from "./List.tsx";

type Props = {
    errors: string[]
}
const Validation = ({errors}: Props) => {

    return (

        <CenteredFlex>
            <div className={'Validation'}>
                <List items={errors}
                      renderItem={(error) => (
                          <li>
                              <p>{error}</p>
                          </li>
                      )}/>
            </div>
        </CenteredFlex>

    )
}

export default Validation