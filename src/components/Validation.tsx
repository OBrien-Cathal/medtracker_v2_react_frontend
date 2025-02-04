import MTSectionWithControls from "../components/MTSectionWithControls.tsx";
import CenteredFlex from "../components/layout/CenteredFlex.tsx";
import {MTSectionDescription, MTSectionHeading} from "./section/MTSection.tsx";
import {List} from "./List.tsx";

type Props = {
    errors: string[]
}
const Home = ({errors}: Props) => {

    return (
        <MTSectionWithControls
            mtHeading={
                <MTSectionHeading>
                    Errors
                </MTSectionHeading>
            }
            mtDescription={
                <MTSectionDescription>
                    <p>
                        Save allowed when suggestions are addressed
                    </p>
                </MTSectionDescription>
            }
        >
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
        </MTSectionWithControls>
    )
}

export default Home