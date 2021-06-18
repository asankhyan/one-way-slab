import './widget.styles.scss'

let Widget = ({title, className, children})=>{
    return(
        <div className={`widget ${className}`}>
            <h3>{title}</h3>
            <div className="widget-content">
                {children}
            </div>
        </div>
    )
}

export default Widget