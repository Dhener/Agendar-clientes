import React, { useContext } from 'react';
import './Financeiro.css';
import { DashboardContext } from '../../Context/DashboardContext';
import FaturamentoDiario from '../FaturamentoDiario/FaturamentoDiario';
import FaturamentoMensal from '../FaturamentoMensal/FaturamentoMensal';
import FaturamentoAnual from '../FaturamentoAnual/FaturamentoAnual';

const Financeiro = () => {
    const {tipoDeFaturamento} = useContext(DashboardContext);

    return (
        <div className='faturamento'>
            <h1>FATURAMENTO</h1>
            {tipoDeFaturamento === "diario" ? <FaturamentoDiario /> : <></>}
            {tipoDeFaturamento === "mensal" ? <FaturamentoMensal /> : <></>}
            {tipoDeFaturamento === "anual" ? <FaturamentoAnual /> : <></>}
        </div>
    );
}

export default Financeiro;
