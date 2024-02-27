import React, { useContext, useEffect, useState } from 'react';
import "./FaturamentoDiario.css";
import { DashboardContext } from '../../Context/DashboardContext';
import FinanceiroCampoValor from '../FinanceiroCampoValor/FinanceiroCampoValor';

const FaturamentoDiario = () => {
    const {clientesQuePagaram} = useContext(DashboardContext);
    const [data, setData] = useState("");
    const [totalDoFaturamentoDiario, setTotalDoFaturamentoDiario] = useState(0);
    const [ano, setAno] = useState("");
    const [mes, setMes] = useState("");
    const [dia, setDia] = useState("");

    const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

    const obterDataDoFaturamentoDiario = (e) => {
        setData(e.target.value);
        //let string = `${data.slice(8,10)}/${data.slice(5,7)}/${data.slice(0,4)}`;
    }

    // const style = {
    //     'textAlign': 'center',
    //     'marginTop': '15%'
    // }

    useEffect(() => {
        setAno(data.slice(0, 4));
        setMes(data.slice(5, 7));
        setDia(data.slice(8, 10));
        if(ano.length > 0 && mes.length > 0 && dia.length > 0 && clientesQuePagaram[ano][mes][dia]){
            let total = 0;
            clientesQuePagaram[ano][mes][dia].forEach(cliente => {
                total += parseFloat(cliente.valor);
            });
            setTotalDoFaturamentoDiario(total);
        }else{
            setTotalDoFaturamentoDiario(0);
        }
    }, [data, clientesQuePagaram, ano, mes, dia]);
    
    return (
        <div className="faturamento-diario">
            <div className="faturamento-titulo-data">
                <h2>FATURAMENTO DIÁRIO</h2>
                <input type="date" onChange={obterDataDoFaturamentoDiario} value={data} name="dataFaturamentoDiario" />
            </div>
            {ano.length > 0 && mes.length > 0 && dia.length > 0 ? <h3>{diasDaSemana[new Date(data).getDay()]}</h3> : <></>}
            <div className="faturamento-campos">
                <h4>Nome</h4>
                <h4>Valor Pago</h4>
            </div>
            <hr />
            {ano.length > 0 && mes.length > 0 && dia.length > 0 && clientesQuePagaram[ano][mes][dia] ?  clientesQuePagaram[ano][mes][dia].map((cliente, index)=>{
                return <FinanceiroCampoValor key={index} nome={cliente.nome} valor={cliente.valor}/>
            }) : <></>}
            <FinanceiroCampoValor nome={"Total"} valor={`${totalDoFaturamentoDiario}.00`}/>
        </div>
    );
}

export default FaturamentoDiario;
