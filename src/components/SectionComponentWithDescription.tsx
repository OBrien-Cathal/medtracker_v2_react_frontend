import React from "react";

type Props = {
    heading: string;
    description: React.ReactNode;
    content: React.ReactNode;
}

export function SectionComponentWithDescription({heading, description, content}:Props) {
    return (
        <div className={'SectionComponentWithDescription'}>
            <div className={'section-header'}>{heading}</div>
            <div className={'section-description'}>{description}</div>
            <div className={'section-body'}>
                {content}
            </div>
        </div>

    )
}
export default SectionComponentWithDescription;