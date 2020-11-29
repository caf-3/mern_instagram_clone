import React, {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';
import {UserContext} from '../../Context/UserContext';
function Login() {
    //using the global state through context
    const [userData, setUserData] = useContext(UserContext);
    document.title = "Instagram - login";
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const requestLogin = (e) =>{
        e.preventDefault();
        fetch("/signin",{
            method: "post",
            headers:{
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json()).then(data =>{
            if(data.error){
                M.toast({html: data.error, classes: "red darken-3"});
            }else{
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUserData(prevState => ({
                    ...prevState,
                    user: data.user
                }));
                M.toast({html: "Usuario logado com sucesso", classes: "green darken-1"});
                history.push('/');
            }
        }).catch(err =>{
            M.toast({html: "Servidor fora de serviço! Contacte o suporte", classes: "red darken-3"})
        })
    }
    return (
        <section className="card z-depth-1 auth-card">
                <h1 className="light logotipo">Entrar</h1>
                <form onSubmit={requestLogin}>
                    <div className="input-field">
                        <input type="text" id="login" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="login">Email</label>
                    </div>
                    <div className="input-field">
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn-large meu-azul">Entrar</button>
                    <h6><Link to="/signup">Não tens uma conta ?</Link></h6>

                </form>
        </section>
    )
}
export default Login;