import React, {createContext, useState} from "react";

export const DashboardContext = createContext(null);

const DashboardContextProvider = (props) => {
    const [estado, setEstado] = useState("agendamento");
    const [diasHorariosDisponiveis, setDiasHorariosDisponiveis] = useState({});
    const [clientesMarcados, setClientesMarcados] = useState({});
    const [clientesQuePagaram, setClientesQuePagaram] = useState({
      "2024":{
        "02": {
          "23":[{
            nome: "teste1",
            email: "teste1@gmail.com",
            telefone: "(21)00000-0000",
            hora_marcada: "21:00",
            valor: "20.00"
          },
          {
            nome: "teste2",
            email: "teste2@gmail.com",
            telefone: "(21)00000-0000",
            hora_marcada: "21:00",
            valor: "20.00"
          },]
        },
        "03": {
          "24":[{
            nome: "teste3",
            email: "teste3@gmail.com",
            telefone: "(21)00000-0000",
            hora_marcada: "21:00",
            valor: "20.00"
          },
          {
            nome: "teste4",
            email: "teste4@gmail.com",
            telefone: "(21)00000-0000",
            hora_marcada: "21:00",
            valor: "20.00"
          },],
          "25":[{
            nome: "teste5",
            email: "teste5@gmail.com",
            telefone: "(21)00000-0000",
            hora_marcada: "21:00",
            valor: "20.00"
          },
          {
            nome: "teste6",
            email: "teste6@gmail.com",
            telefone: "(21)00000-0000",
            hora_marcada: "21:00",
            valor: "20.00"
          },]
        },
      }
    });
    const [tipoDeFaturamento, setTipoDeFaturamento] = useState("diario");
    function adicionarDiasHorarios(dataHora) {

      if(dataHora.length === 0){
        alert("É necessário escolher algum horário");
      }else{
        let data = dataHora.slice(0, 10);
        let hora = dataHora.slice(11, 16);
    
        setDiasHorariosDisponiveis(prevState => {
          const newState = { ...prevState };
          if (!newState[data]) {
            newState[data] = [hora];
          } else if (!newState[data].includes(hora)) {
            newState[data].push(hora);
            newState[data].sort();
          } else {
            alert("Essa hora não está disponível!");
          }
          return newState;
        });
      }
      }
    const contextValue = {estado, setEstado, clientesMarcados, setClientesMarcados, diasHorariosDisponiveis, setDiasHorariosDisponiveis, tipoDeFaturamento, setTipoDeFaturamento, clientesQuePagaram, setClientesQuePagaram, adicionarDiasHorarios};

    return (
        <DashboardContext.Provider value = {contextValue}>
            {props.children}
        </DashboardContext.Provider>
    )
}

export default DashboardContextProvider;