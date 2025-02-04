import React from "react";
import {useState} from "preact/compat";
import question from "../assets/question.svg";
import collapseIcon from "../assets/collapse.svg";

interface Props extends React.PropsWithChildren {
    mtDescription?: React.ReactNode;
    mtHeading?: React.ReactNode;

}

export function MTSectionWithControls({children, mtHeading, mtDescription}: Props) {
    const [showDescription, setShowDescription] = useState<boolean>(false)
    const [collapsed, setCollapsed] = useState<boolean>(false)


    function toggleDescription() {
        setShowDescription(!showDescription)
    }

    function toggleCollapse() {
        if (!children) return
        let shouldToggleShowDescription: boolean = !collapsed && showDescription
        if (shouldToggleShowDescription) setShowDescription(false)
        setCollapsed(!collapsed)
    }

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
                            <img src={collapseIcon} alt="Collapse Section" onClick={toggleCollapse}/>
                        </div>}
                </div>
            </div>


            {
                showDescription &&
                <div className={'section-with-controls-description-content'}>
                    {mtDescription}
                </div>
            }

            {!collapsed && children &&
                <div className={'section-with-controls-content'}>
                    {children}
                </div>
            }
        </div>
    )
}

export default MTSectionWithControls;