import '../../styles/Components/Home/Dashboard.css'
import Notifs from './Notifs';
import ProfilCard from './ProfilCard';
import Stats from './Stats';
import Users from './Users';

export default function Dashboard() {
    return (
        <div className='dashboard-content'>
            <ProfilCard/>
            <Stats/>
            <Users/>
            <Notifs/>
        </div>
    );
}