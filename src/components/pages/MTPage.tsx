import React from "react";

export function MTPage({children}: React.PropsWithChildren) {

    return (
        <div className={'MTPage'}>
            {children}
        </div>
    )
}

export function MTPageHeading({children}: React.PropsWithChildren) {
    return (
        <div className={'MTPageHeading'}>
            {children}
        </div>
    )


}

export function MTPageDescription({children}: React.PropsWithChildren) {

    return (
        <div className={'MTPageDescription'}>
            {children}
        </div>
    )
}

export function MTPageBody({children}: React.PropsWithChildren) {

    return (
        <div className={'MTPageBody'}>
            {children}
        </div>
    )
}


export function MTPageContent({children}: React.PropsWithChildren) {

    return (
        <div className={'MTPageContent'}>
            {children}
        </div>
    )
}