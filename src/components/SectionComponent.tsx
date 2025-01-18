import React from "react";
import SectionComponentWithDescription from "./SectionComponentWithDescription.tsx";

type Props = {
    heading: string;
    content: React.ReactNode;
}

export function SectionComponent({heading, content}:Props) {
    return (
        <SectionComponentWithDescription heading={heading} description={''} content={content}/>
    )
}
export default SectionComponent;