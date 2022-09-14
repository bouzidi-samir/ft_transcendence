import "../styles/Containers/ProfilSettings.css"
import Navbar from "../Components/Navbar";
import FormSetting from "../Components/FormSetting";


export default function ProfilSettings() {
    return (
        <>
            <Navbar></Navbar>
        <div className="profilset-content">
            <FormSetting></FormSetting>
        </div>
        </>
    );
}