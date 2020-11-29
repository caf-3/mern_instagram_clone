import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
function Signup() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const postData = (e) =>{
        e.preventDefault();
        fetch("/signup",{
            method: "post",
            headers:{
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        }).then(res => res.json()).then(data =>{
            if(data.error){
                M.toast({html: data.error, classes: "red darken-3"});
            }else{
                M.toast({html: data.message, classes: "green darken-1"});
                history.push('/login');
            }
        }).catch(err =>{
            M.toast({html: "Servidor fora de serviço! Contacte o suporte", classes: "red darken-3"})
        })
    }
    return (
        <section className="card auth-card">
            <h1 className="light logotipo">Registrar-se</h1>
            <form onSubmit={postData}>
                <div className="input-field">
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="input-field">
                    <input type="text" id="login" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="login">Email</label>
                </div>
                <div className="input-field">
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="btn btn-large meu-azul">Criar conta</button>
                <h6><Link to="/login">Tens uma conta ?</Link></h6>
            </form>
        </section>
    )
}
export default Signup;