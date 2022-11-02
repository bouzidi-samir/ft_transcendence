import { Link } from "react-router-dom"
import "../../styles/Components/Share/Cross.css"

export default function Cross(props: any) {

    const {lastPage} = props; 

    return (
        <Link to={lastPage}>
            <div className="cross"></div>
        </Link>
    )
} 