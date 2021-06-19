import './widget.styles.scss'

let Widget = ({title, className, children})=>{
    return(
        <div className={`widget ${className?className:""}`}>
            <h3 className="title">{title}</h3>
            <div className="widget-content">
                {children}
            </div>
        </div>
    )
}

export default Widget