import React, {useRef} from "react";
import {useEffect, useState} from "preact/compat";
import question from "../assets/question.svg";
import collapseIcon from "../assets/collapse.svg";
import expandIcon from "../assets/expand.svg";

interface Props extends React.PropsWithChildren {
    mtDescription?: React.ReactNode;
    mtHeading?: React.ReactNode;
    isInitiallyCollapsed?: boolean
}

export function MTSectionWithControls({children, mtHeading, mtDescription, isInitiallyCollapsed}: Props) {

    const initiallyOpen = (isInitiallyCollapsed == undefined) ? true : !isInitiallyCollapsed

    // console.log("Initial" + initiallyOpen)

    const [showDescription, setShowDescription] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(initiallyOpen)
    const [isAnimating, setIsAnimating] = useState<boolean>(false)
    const contentRef = useRef<HTMLDivElement>(null);


    function toggleDescription() {
        setShowDescription(!showDescription)
    }

    function toggleCollapse() {
        if (!children) return
        let shouldToggleShowDescription: boolean = open && showDescription
        if (shouldToggleShowDescription) setShowDescription(false)

        // console.log("Toggle to" + !open)
        setOpen(!open)


        setIsAnimating(true)

    }

    useEffect(() => {
        contentRef.current?.addEventListener("animationcancel", () => {
            setIsAnimating(false);
        });
        contentRef.current?.addEventListener("animationend", () => {
            setIsAnimating(false);

        });
    }, [contentRef.current]);

    return (
        <div className={'MTSectionWithControls'}>
            <div className={'heading-and-controls'}>
                <div className={'section-with-controls-heading'}>
                    {mtHeading}
                </div>
                <div className={'section-controls'}>
                    {
                        mtDescription &&
                        <div className={'section-control'}>
                            <img src={question} alt="Explain" onClick={toggleDescription}/>
                        </div>}
                    {children &&
                        <div className={'section-control'}>
                            <img src={open ? collapseIcon : expandIcon} alt="Collapse Section" onClick={toggleCollapse}/>
                        </div>}
                </div>
            </div>


            {
                showDescription &&
                <div className={'section-with-controls-description-content'}>
                    {mtDescription}
                </div>
            }


            {(open || isAnimating) &&
                <div ref={contentRef}
                     className={`section-with-controls-content open ${open && isAnimating ? "visible" : (!open ? "hidden" : "")}`}>
                    {children}
                </div>
            }
        </div>


    )
}

export default MTSectionWithControls;