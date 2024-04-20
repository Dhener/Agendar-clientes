import React, { useState, useContext, useEffect } from 'react';
import './Agendamento.css';
import { DashboardContext } from '../../Context/DashboardContext';

const Agendamento = () => {

    const {clientesMarcados, setClientesMarcados, diasHorariosDisponiveis, setDiasHorariosDisponiveis, adicionarDiasHorarios} = useContext(DashboardContext);
    const [cliente, setCliente] = useState({
        nome: "",
        email: "",
        telefone: "",
        dataHora: ""
    })

    const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

    const [dataHora, setDataHora] = useState("");

    const obterClientes = (e) => {
        setCliente({...cliente, [e.target.name]: e.target.value});
    }

    const obterDataHora = (e) => {
        setDataHora(e.target.value);
    }

    useEffect(()=>{
      console.log(diasHorariosDisponiveis);
    },[diasHorariosDisponiveis])

    const verificarSeOClienteEstaMarcado = (dataMarcada, horaMarcada) => {
      if(Object.keys(clientesMarcados).length === 0){
        return true;
      } else{
        clientesMarcados[dataMarcada].forEach(cliente => {
          if(cliente.hora_marcada === horaMarcada){
            return false;
          }
        });
        return true;
      }
    }

    function adicionarClienteParaMarcacao() {
      
        let dataMarcada = cliente.dataHora.slice(0, 10);
        let horaMarcada = cliente.dataHora.slice(11, 16);
        console.log(diasHorariosDisponiveis.length)
        if ((Object.keys(diasHorariosDisponiveis).length > 0 && diasHorariosDisponiveis[dataMarcada].indexOf(horaMarcada) !== -1) && verificarSeOClienteEstaMarcado(dataMarcada, horaMarcada)) {
          //console.log("Hora está disponível para marcação!");
          setClientesMarcados(prevState => {
            const newState = { ...prevState };
            if (newState[dataMarcada]) {
              if (Array.isArray(newState[dataMarcada])) {
                newState[dataMarcada].push({
                  nome: cliente.nome,
                  email: cliente.email,
                  telefone: cliente.telefone,
                  hora_marcada: horaMarcada
                });
              } else {
                newState[dataMarcada] = [newState[dataMarcada]];
                newState[dataMarcada].push({
                  nome: cliente.nome,
                  email: cliente.email,
                  telefone: cliente.telefone,
                  hora_marcada: horaMarcada
                });
              }
            } else {
              newState[dataMarcada] = [{
                nome: cliente.nome,
                email: cliente.email,
                telefone: cliente.telefone,
                hora_marcada: horaMarcada
              }];
            }
            return newState;
          });
    
          setDiasHorariosDisponiveis(prevState => {
            const matriz = Object.entries(prevState);
            matriz.sort((a, b) => new Date(a[0]) - new Date(b[0]));
            return Object.fromEntries(matriz);
          });
    
          removerDiasHorarios(dataMarcada, horaMarcada);
          setCliente({
            nome: "",
            email: "",
            telefone: "",
            dataHora: ""
        });
          alert("Cliente adicionado com sucesso!");
        } else {
          alert("Essa data e hora não estão disponíveis para marcação!");
        }
      }
    
      function removerDiasHorarios(dataParaSerRemovida, horaParaSerRemovida) {
        setDiasHorariosDisponiveis(prevState => {
          const newState = { ...prevState };
          if (newState[dataParaSerRemovida]) {
            newState[dataParaSerRemovida] = newState[dataParaSerRemovida].filter(hora => hora !== horaParaSerRemovida);
            if (newState[dataParaSerRemovida].length === 0) {
              delete newState[dataParaSerRemovida];
              console.log(newState);
            }
          } else {
            alert("Nenhuma hora encontrada para a data fornecida");
          }
          return newState;
        });
      }

    const styleDoElementoi = {
        'fontSize': '12px',
        "borderRadius": "4px",
        background: "rgb(192,192,192)",
        color: 'rgb(64,64,64)',
        'position': 'absolute',
        top: "0px",
        rigth: "0px",
        cursor: 'pointer'
    }

    const styleDoElementoSpan = {
        padding: "5px 12px",
        background: "rgb(192,192,192)",
        position: "relative",
        "fontSize": "14px",
        "borderRadius": "5px",
        "margin": "3px",
        border: "1px solid"

    }

    return (<><div className='agendamento'>
                <div className="agendamento-conteudo">
                    <h1>AGENDAR CLIENTE</h1>
                    <div className="agendamento-campos">
                        <div>
                            <p>Nome do cliente</p>
                            <input type="text" name="nome" value={cliente.nome} onChange={obterClientes} placeholder='Digite o nome...'/>
                            <p>Email do cliente</p>
                            <input type="email" name="email" value={cliente.email} onChange={obterClientes} placeholder='Digite o email...'/>
                        </div>
                        <div>
                            <p>Telefone do cliente</p>
                            <input type="tel" name="telefone" value={cliente.telefone} pattern="([0-9]{2})9[0-9]{4}-[0-9]{4}" onChange={obterClientes} placeholder='(99)99999-9999' />
                            <p>Escolha o horário e a data</p>
                            <input type="datetime-local" value={cliente.dataHora} onChange={obterClientes} name="dataHora" />
                        </div>
                    </div>
                    <button onClick={adicionarClienteParaMarcacao}>Agendar</button>
                </div>
            </div>
            <div className="agendamento-adicionar-horarios">
                <h3>ADICIONAR HORÁRIOS</h3>
                <span>Escolha horários para adicionar: </span>
                <input type="datetime-local" onChange={obterDataHora} value={dataHora} name="dataHora" />
                <button onClick={()=>{adicionarDiasHorarios(dataHora); setDataHora("");}}>Adicionar</button>
            </div>
            <div className="agendamento-horarios-disponiveis">
                    <h2>Dias e Horários disponíveis</h2>
                    {Object.keys(diasHorariosDisponiveis).length > 0 ? 
                        <table>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Horários Disponíveis</th>
                                </tr>
                            </thead>
                            <tbody >
                                {Object.keys(diasHorariosDisponiveis).map((data, index)=>{
                                    const dataEmOutroFormato = `${data.slice(8,10)}/${data.slice(5,7)}/${data.slice(0,4)}`;
                                    const diaDaSemanaEmNumero = new Date(data).getDay();
                                    return <tr key={index}>
                                        <td>{`${dataEmOutroFormato} : ${diasDaSemana[diaDaSemanaEmNumero]}`}</td>
                                        <td>{Object.values(diasHorariosDisponiveis[data]).map((hora)=>{return <span style={styleDoElementoSpan}>{hora}<i style={styleDoElementoi} onClick={()=>{removerDiasHorarios(data, hora)}} className="material-icons">&#xe5cd; </i> </span>})}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    :
                    <p>Ainda não há horários e datas disponíveis.</p>
                    }

            </div>
            </>
    );
}

export default Agendamento;
