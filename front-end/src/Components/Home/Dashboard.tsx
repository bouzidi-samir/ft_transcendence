import '../../styles/Components/Home/Dashboard.css'
import Invitation from './Invitation';
import InvitationGame from './InvitationGame';
import Notifs from './Notifs';
import ProfilCard from './ProfilCard';
import Stats from './Stats';
import Users from './Users';

export default function Dashboard() {
    return (
        <div className='dashboard-content'>
            <ProfilCard/>
            <Stats/>
            <div className='user-infos'>
                <Users/>
                {/*<Notifs/>*/}
                {/*<Invitation/>*/}
            </div>
        </div>
    );
}