const ContentSectionComponent = (children: any) => {

    return (
        <div className={'ContentSectionComponent'}>
            <div className={'content-section-header'}></div>
            <div className={'content-section-body'}>
                {children.children}
            </div>
        </div>

    )
}

export default ContentSectionComponent;