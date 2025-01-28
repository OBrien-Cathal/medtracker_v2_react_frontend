import React from "react";

type Props = {
    heading: React.ReactNode;
    description: React.ReactNode;
    content: React.ReactNode;
}

export function MaxWidthSectionComponentWithDescription({heading, description, content}:Props) {
    return (
        <div className={'MaxWithSection'}>
            <div className={'section-header'}>{heading}</div>
            <div className={'section-description'}>{description}</div>
            <div className={'section-body'}>
                {content}
            </div>
        </div>

    )
}
export default MaxWidthSectionComponentWithDescription;