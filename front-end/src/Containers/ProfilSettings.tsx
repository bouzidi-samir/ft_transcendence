
import "../styles/Containers/ProfilSettings.css"
import Navbar from "../Components/Share/Navbar";
import FormSetting from "../Components/ProfilSettings/FormSetting";

export default function ProfilSettings() {
    return (
        <>
        <Navbar></Navbar>
        <div className="profilset-content">
            <FormSetting/>
        </div>
        </>
    );
}