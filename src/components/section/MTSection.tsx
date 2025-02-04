import React from "react";

export function MTSectionBody({children}: React.PropsWithChildren) {
    return (
        <div className={'MTSectionBody'}>
            {children}
        </div>
    )
}
export function MTSectionContent({children}: React.PropsWithChildren) {

    return (
        <div className={'MTSectionContent'}>
            {children}
        </div>
    )
}
export function MTSectionDescription({children}: React.PropsWithChildren) {
    return (
        <div className={'MTSectionDescription'}>
            {children}
        </div>
    )
}

export function MTSectionHeading({children}: React.PropsWithChildren) {
    return (
        <div className={'MTSectionHeading'}>{children}</div>
    )
}
export function MTSectionGroupHeading({children}: React.PropsWithChildren) {
    return (
        <div className={'MTSectionGroupHeading1'}>{children}</div>
    )
}