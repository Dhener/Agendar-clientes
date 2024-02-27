import React, { useState } from 'react';
import './CSS/Login.css';

const Login = () => {

    const [estado, setEstado] = useState("Login");
    const [dados, setDados] = useState({
        nome: "",
        telefone: "",
        email: "",
        senha: ""
    })

    const getDadosInput = (e) => {
        setDados({...dados, [e.target.name]: e.target.value})
    }

    const enviarDados = () => {
        window.location.replace("/dashboard");
    }

    return (
        <div className='login'>
            <div className="login-form">
                {estado === "login" ? <h1>{estado}</h1> : <h1>{estado}</h1>}
                <div className="login-campos">
                    {estado === "Login" ? <></> : <><input type="text" value={dados.email} onChange={getDadosInput} name="email" placeholder="EMAIL" /> <input type="text" value={dados.telefone} onChange={getDadosInput} name="telefone"placeholder="TELEFONE" /></>}
                    <input type="text" value={dados.nome} onChange={getDadosInput} name="nome"placeholder="NOME DE USUÁRIO" />
                    <input type="password" value={dados.senha} name="senha" onChange={getDadosInput} placeholder="SENHA" />
                </div>
                <button onClick={enviarDados} >Entrar</button>
                {estado === "Login" ? 
                <p>Você ainda não possui uma conta ?! <span onClick={()=>{setEstado("Cadastro")}}>Clique aqui</span></p> :
                <p>Fazer login novamente. <span onClick={()=>{setEstado("Login")}}>Clique aqui</span></p>}
            </div>
        </div>
    );
}

export default Login;
