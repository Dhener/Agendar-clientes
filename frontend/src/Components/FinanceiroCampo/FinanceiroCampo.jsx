import React from 'react';
import FinanceiroCampoValor from '../FinanceiroCampoValor/FinanceiroCampoValor';

const FinanceiroCampo = (props) => {
    return (<>
        <h3>{props.diaDaSemana}</h3>
        <div className='faturamento-campos'>
            <h4>Nome</h4>
            <h4>Valor Pago</h4>
        </div>
        <hr />
        {props.clientes.map((cliente, index_cliente)=>{
            return <FinanceiroCampoValor key={index_cliente} nome={cliente.nome} valor={cliente.valor}/>
        })}
        </>
    );
}

export default FinanceiroCampo;
