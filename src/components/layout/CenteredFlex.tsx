import React from "react";

export function CenteredFlex({children}: React.PropsWithChildren) {

    return (
        <div className={'CenteredFlex'}>
            {children}
        </div>
    )
}

export default CenteredFlex;