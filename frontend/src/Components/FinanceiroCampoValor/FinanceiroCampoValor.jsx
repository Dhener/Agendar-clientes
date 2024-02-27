import React from 'react';
import "./FinanceiroCampoValor.css";
const FinanceiroCampoValor = (props) => {
    return (
        <div className='financeiro-campo-valor'>
            <div className="faturamento-campos">
                <p>{props.nome}</p>
                <p>{`R$${props.valor}`}</p>
            </div>
            <hr />
        </div>
    );
}

export default FinanceiroCampoValor;
