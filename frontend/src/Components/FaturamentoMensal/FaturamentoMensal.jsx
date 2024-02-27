import React, { useContext, useEffect, useState } from 'react';
import "./FaturamentoMensal.css";
import { DashboardContext } from '../../Context/DashboardContext';
import FinanceiroCampoValor from '../FinanceiroCampoValor/FinanceiroCampoValor';
import FinanceiroCampo from '../FinanceiroCampo/FinanceiroCampo';

const FaturamentoMensal = () => {
    const {clientesQuePagaram} = useContext(DashboardContext);
    const [data, setData] = useState("");
    const [totalDoFaturamentoMensal, setTotalDoFaturamentoMensal] = useState(0);
    const [ano, setAno] = useState("");
    const [mes, setMes] = useState("");

    const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

    // const mesesDoAno = {
    //     "01": "Janeiro",
    //     "02": "Fevereiro",
    //     "03": "Março",
    //     "04": "Abril",
    //     "05": "Maio",
    //     "06": "Junho",
    //     "07": "Julho",
    //     "08": "Agosto",
    //     "09": "Setembro",
    //     "10": "Outubro",
    //     "11": "Novembro",
    //     "12": "Dezembro",
    // }

    const obterDataDoFaturamentoMensal = (e) => {
        setData(e.target.value);
        //let string = `${data.slice(8,10)}/${data.slice(5,7)}/${data.slice(0,4)}`;
    }
    // const style = {
    //     'textAlign': 'center',
    //     'marginTop': '15%'
    // }
    useEffect(() => {
        console.log(data);
        setAno(data.slice(0, 4));
        setMes(data.slice(5, 7));
        if(ano.length > 0 && mes.length > 0 && clientesQuePagaram[ano][mes]){
            let total = 0;
            Object.keys(clientesQuePagaram[ano][mes]).forEach(d => {
                clientesQuePagaram[ano][mes][d].forEach(cliente => {
                    total += parseFloat(cliente.valor);
                })
            });
            setTotalDoFaturamentoMensal(total);
        }else{
            setTotalDoFaturamentoMensal(0);
        }
    }, [data, clientesQuePagaram, ano, mes]);
    return (
        <div className="faturamento-mensal">
            <div className="faturamento-titulo-data">
                <h2>FATURAMENTO MENSAL</h2>
                <input type="month" onChange={obterDataDoFaturamentoMensal} name="mesDoFaturamento" />
            </div>
            {ano.length > 0 && mes.length > 0 && clientesQuePagaram[ano][mes] ?  Object.keys(clientesQuePagaram[ano][mes]).map((d, index_d)=>{
                let dataFormatada = `${data}-${d}`;
                return <FinanceiroCampo diaDaSemana={diasDaSemana[new Date(dataFormatada).getDay()]} clientes={clientesQuePagaram[ano][mes][d]} />;
            }) : <></>}
            <FinanceiroCampoValor nome={"Total"} valor={`${totalDoFaturamentoMensal}.00`}/>
        </div>
    );
}

export default FaturamentoMensal;
