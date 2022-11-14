import "../../styles/Components/Share/Alert.css"


export default function Alert(props: any) {

    const {message, setWindow} = props;

    return (
    <>
        <div className='fond1'></div>
        <div className="alert">
          <div onClick={()=>setWindow(false)} className="cross-alert"></div>
            <div className="alert-icon"></div>
            <p className="alert-message">{message}</p>
        </div>
    </>
    )

}