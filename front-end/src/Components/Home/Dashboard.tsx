import '../../styles/Components/Home/Dashboard.css'
import ProfilCard from './ProfilCard';
import Stats from './Stats';
import Users from './Users';
import Notifs from './Notifs';

export default function Dashboard() {
    return (
        <div className='dashboard-content'>
            <ProfilCard/>
            <Stats/>
            <div className='user-infos'>
                <Users/>
                <Notifs/>
            </div>
        </div>
    );
}