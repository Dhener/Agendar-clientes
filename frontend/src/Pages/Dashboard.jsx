import Sidebar from '../Components/Sidebar/Sidebar';
import Agendamento from '../Components/Agendamento/Agendamento';
import Marcados from '../Components/Marcados/Marcados';
import Financeiro from '../Components/Financeiro/Financeiro';
import './CSS/Dashboard.css';
import { DashboardContext } from '../Context/DashboardContext';
import { useContext } from 'react';

const Dashboard = () => {
    const {estado} = useContext(DashboardContext);
    return ( 
        <div className='dashboard'>
            <Sidebar />
            <div className='dashboard-content'>
                {estado === "agendamento" ? <Agendamento /> : <></>}
                {estado === "marcados" ? <Marcados /> : <></>}
                {estado === "financeiro" ? <Financeiro /> : <></>}
            </div>
        </div>
    );
}

export default Dashboard;
