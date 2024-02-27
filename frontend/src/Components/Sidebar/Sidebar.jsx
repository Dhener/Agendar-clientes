import cliente_icon from '../Imagens/cliente.png';
import cifrao_icon from '../Imagens/cifrao.png';
import agenda_icon from '../Imagens/agendar.png';
import './Sidebar.css';
import { DashboardContext } from '../../Context/DashboardContext';
import { useContext, useRef } from 'react';
const Sidebar = () => {
    const {estado, setEstado, setTipoDeFaturamento} = useContext(DashboardContext);
    const agendamento = useRef();
    const marcados = useRef();
    const financeiro = useRef();

    const manipuladorDeEvento = (string, id1, id2, id3) =>{
        setEstado(string);
        id1.current.style.backgroundColor = "#01b58c";
        id1.current.style.color="white";
        id2.current.style.backgroundColor = "white";
        id2.current.style.color="#99aaae";
        id3.current.style.backgroundColor = "white";
        id3.current.style.color="#99aaae";}
    return (
        <div className='sidebar'>
            <div ref={agendamento} style={{backgroundColor: "#01b58c"}} onClick={()=>{manipuladorDeEvento("agendamento", agendamento, marcados, financeiro)}} className="sidebar-item">
                <div>
                    <img src={agenda_icon} alt="" />
                    <p>Agendamento</p>
                </div>
                <i className="fa">&#xf105;</i>
            </div>
            <hr/>
            <div ref={marcados} onClick={()=>{manipuladorDeEvento("marcados", marcados, agendamento, financeiro)}} className="sidebar-item">
                <div>
                    <img src={cliente_icon} alt="" />
                    <p>Clientes</p>
                </div>
                <i className="fa">&#xf105;</i>
            </div>
            <hr/>
            <div ref={financeiro} onClick={()=>{manipuladorDeEvento("financeiro", financeiro, marcados, agendamento)}} className="sidebar-item">
                <div>
                    <img src={cifrao_icon} alt="" />
                    <p>Financeiro</p>
                </div>
                <i className="fa">&#xf105;</i>
            </div>
            <hr/>
            {estado === "financeiro" ? <div className='sidebar-item-subdivis-financeiro'>
                <div onClick={()=>{setTipoDeFaturamento("diario")}}>1. Faturamento Diário</div>
                <div onClick={()=>{setTipoDeFaturamento("mensal")}}>2. Faturamento Mensal</div>
                <div onClick={()=>{setTipoDeFaturamento("anual")}}>3. Faturamento Anual</div>
            </div> : <></>}
        </div>
    );
}

export default Sidebar;
