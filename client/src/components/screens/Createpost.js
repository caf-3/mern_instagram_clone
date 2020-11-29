import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';
function Createpost() {
    document.title = "Instagram - Create post";
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method: "post",
                headers:{
                    "content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title:title,
                    body:body,
                    photo: url
                })
            }).then(res => res.json()).then(dataP =>{
                if(dataP.error){
                    M.toast({html: dataP.error, classes: "red darken-3"});
                }else{
                    M.toast({html: "Postagem criada com sucesso", classes: "green darken-1"});
                    history.push('/');
                }
            }).catch(err =>{
                M.toast({html: "Servidor fora de serviço! Contacte o suporte", classes: "red darken-3"})
            })
        }
    }, [url]);

    const handleTitle = (e) =>{
        setTitle(e.target.value);
    }
    const handleBody = (e) =>{
        setBody(e.target.value);
    }
    const createPost = (e) =>{
        e.preventDefault();
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "dvhahi1lk");
        fetch("https://api.cloudinary.com/v1_1/dvhahi1lk/image/upload", {
            method: 'post',
            body: data
        }).then(res => res.json()).then(function(data){
            setUrl(data.url);
        }).catch(err =>{
            M.toast({html: "Impossivel carregar ficheiro! Contacte o suporte.", classes: "red darken-3"});
        }) 
    }
    return (
        <section className="container">
            <form onSubmit={createPost}>
                <div className="card input-field" style={{
                    margin: "10% auto",
                    maxWidth: "500px",
                    padding: "20px",
                    textAlign: "center"
                }}>
                    <div className="input-field">
                        <input type="text" id="title" value={title} onChange={handleTitle} />
                        <label htmlFor="title">Título</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="corpo" value={body} onChange={handleBody} />
                        <label htmlFor="corpo">corpo</label>
                    </div>
                    <div className="file-field input-field">
                        <div className="btn meu-azul">
                            <span>Ficheiro</span>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input type="text" className="file-path validate" />
                        </div>
                    </div>
                    <button className="btn meu-azul">Criar postagem</button>
                </div>
            </form>
        </section>
    )
}
export default Createpost;