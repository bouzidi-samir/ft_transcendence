import '../styles/Components/Stats.css'

export default function Stats() {
    return (
        <div className='stats-content'>
            <div className='match-total'>
                <div className='circle'>
                    <p>0</p>
                </div>
                <p>Matchs joués</p>
            </div>
            <div className='match-stats'>
                <div className='win-lost'> 
                    <div className='circle'>
                        <p>0</p>
                    </div>
                        <p>Victoires</p>
                </div>
                <div className='win-lost'>
                    <div className='circle'>
                        <p>0</p>
                    </div>
                        <p>Défaites</p>
                </div>
            </div>
        </div>

    );
}