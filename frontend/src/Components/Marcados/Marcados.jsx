import React, { useContext, useEffect, useState } from 'react';
import './Marcados.css';
import { DashboardContext } from '../../Context/DashboardContext';
const Marcados = () => {

    const { clientesMarcados, setClientesMarcados, clientesQuePagaram, setClientesQuePagaram, adicionarDiasHorarios } = useContext(DashboardContext);
    const [valoresPagos, setValoresPagos] = useState({}); // Estado para armazenar os valores pagos por cliente

    const obterValorPago = (e, clienteIndex) => {
        const novoValorPago = { ...valoresPagos, [clienteIndex]: e.target.value }; // Atualiza o valor pago para o cliente específico
        setValoresPagos(novoValorPago);
    };


    useEffect(()=>{
        console.log(clientesQuePagaram)
    },[clientesQuePagaram])


    const valorPagoPeloCliente = (dataMarcada, valor, index, clienteIndex) => {
        if (clientesMarcados[dataMarcada] && clientesMarcados[dataMarcada][index]) {
            const cliente = clientesMarcados[dataMarcada][index];
            cliente.valor = valor;

            const novoValoresPagos = { ...valoresPagos };
            delete novoValoresPagos[clienteIndex]; // Exclui a chave do objeto
            setValoresPagos(novoValoresPagos);

            // Atualiza o estado dos clientes que pagaram
            setClientesQuePagaram(prevState => {
                const ano = dataMarcada.slice(0, 4);
                const mes = dataMarcada.slice(5, 7);
                const dia = dataMarcada.slice(8, 10);

                const newState = {
                    ...prevState,
                    [ano]: {
                        ...prevState[ano],
                        [mes]: {
                            ...prevState[ano][mes],
                            [dia]: [...(prevState[ano][mes][dia] || []), cliente]
                        }
                    }
                };

                return newState;
            });

            // Remove o cliente da lista de clientes marcados
            const novosClientesMarcados = { ...clientesMarcados };
            novosClientesMarcados[dataMarcada].splice(index, 1);
            setClientesMarcados(novosClientesMarcados);
        } else {
            alert("Esse cliente não está presente ou essa data não está presente!");
        }
    };

    const desmarcarCliente = (dataDesmarcada, horaDesmarcada, index) => {
        if (clientesMarcados[dataDesmarcada]) {
            if (clientesMarcados[dataDesmarcada][index]) {
                // Concatenando data e hora para obter o formato completo
                const dataHora = `${dataDesmarcada}T${horaDesmarcada}`;

                // Chamando a função para adicionar o horário disponível
                adicionarDiasHorarios(dataHora);

                // Removendo o cliente da lista de clientes marcados
                const novosClientesMarcados = { ...clientesMarcados };
                novosClientesMarcados[dataDesmarcada].splice(index, 1);
                setClientesMarcados(novosClientesMarcados);
            } else {
                alert("Esse cliente não está presente!");
            }
        } else {
            alert("Essa data não está presente!");
        }
    };

    return (
        <div className='marcados'>
            <h1>CLIENTES MARCADOS</h1>
            <div className="marcados-itens">
                <p>Nome</p>
                <p>Email</p>
                <p>Telefone</p>
                <p>Data</p>
                <p>Hora</p>
                <p></p>
                <p></p>
                <p></p>
            </div>
            <hr />
            {Object.keys(clientesMarcados).length > 0 ? Object.keys(clientesMarcados).map((data, index) => {
                return Object.values(clientesMarcados[data]).map((cliente, index2) => {
                    let clienteIndex = `${data}-${index2}`; // Identificador único para cada cliente
                    return (
                        <div className="marcados-dados-clientes" key={clienteIndex}>
                            <p>{cliente.nome}</p>
                            <p>{cliente.email}</p>
                            <p>{cliente.telefone}</p>
                            <p>{`${data.slice(8, 10)}/${data.slice(5, 7)}/${data.slice(0, 4)}`}</p>
                            <p>{cliente.hora_marcada}</p>
                            <input
                                type="text"
                                name="valor"
                                onChange={(e) => obterValorPago(e, clienteIndex, index2)}
                                value={valoresPagos[clienteIndex] ? valoresPagos[clienteIndex] : ''}
                                placeholder="Valor..."
                            />
                            <button className="marcados-pagar" onClick={() => { valorPagoPeloCliente(data, valoresPagos[clienteIndex], index2, clienteIndex) }}>Pagar</button>
                            <button className="marcados-desmarcar" onClick={() => { desmarcarCliente(data, cliente.hora_marcada, index2) }}>Desmarcar</button>
                        </div>
                    );
                });
            }) : <p className='nao-marcados'>Ainda não há clientes marcados!</p>}
        </div>
    );

}

export default Marcados;
