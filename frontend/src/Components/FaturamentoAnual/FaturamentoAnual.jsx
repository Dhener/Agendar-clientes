import React, { useContext, useEffect, useState } from 'react';
import "./FaturamentoAnual.css";
import { DashboardContext } from '../../Context/DashboardContext';
import FinanceiroCampoValor from '../FinanceiroCampoValor/FinanceiroCampoValor';
//import FinanceiroCampo from '../FinanceiroCampo/FinanceiroCampo';

const FaturamentoAnual = () => {

    const {clientesQuePagaram} = useContext(DashboardContext);
    const [data, setData] = useState("");
    const [totalDoFaturamentoAnual, setTotalDoFaturamentoAnual] = useState(0);
    const [ano, setAno] = useState("");

    const obterDataDoFaturamentoAnual = (e) => {
        setData(e.target.value);
        //let string = `${data.slice(8,10)}/${data.slice(5,7)}/${data.slice(0,4)}`;
    }
    // const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
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

    // const style = {
    //     'textAlign': 'center',
    //     'marginTop': '15%'
    // }

    useEffect(() => {
        console.log(data);
        setAno(data.slice(0, 4));
        if(ano.length > 0 && clientesQuePagaram[ano]){
            let total = 0;
            Object.keys(clientesQuePagaram[ano]).forEach(m => {
                Object.keys(clientesQuePagaram[ano][m]).forEach(d=> {
                    clientesQuePagaram[ano][m][d].forEach(cliente => {
                        total += parseFloat(cliente.valor);
                    })
                })
            });
            setTotalDoFaturamentoAnual(total);
        }else{
            setTotalDoFaturamentoAnual(0);
        }
    }, [data, clientesQuePagaram, ano]);

    return (
        <div className="faturamento-anual">
            <div className="faturamento-titulo-data">
                <h2>FATURAMENTO ANUAL</h2>
                <input type="number" onChange={obterDataDoFaturamentoAnual} name="ano" min="2024" max="2100" step="1" placeholder='Ano...'/>
            </div>
            {ano.length > 0 && clientesQuePagaram[ano] ?  Object.keys(clientesQuePagaram[ano]).map((m, index_m)=>{
                return Object.keys(clientesQuePagaram[ano][m]).map((d, index_d)=>{
                    return clientesQuePagaram[ano][m][d].map(cliente=> {
                        return <FinanceiroCampoValor nome={cliente.nome} valor={cliente.valor}/>
                    })
                })
            }) : <></>}
            <FinanceiroCampoValor nome={"Total"} valor={`${totalDoFaturamentoAnual}.00`}/>
        </div>
    );
}

export default FaturamentoAnual;
