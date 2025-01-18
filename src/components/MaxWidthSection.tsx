import React from "react";

type Props = {
    content: React.ReactNode;
}

export function MaxWidthSection({content}: Props) {
    return (<div className={'max-width-section'}>
            {content}
        </div>
    )
}

export default MaxWidthSection;