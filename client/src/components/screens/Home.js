import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../../Context/UserContext';
import postPhoto from '../../wallpaper.jpg';
function Home() {
    document.title = "Instagram - home";
    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState(false);
    const [userData, setUserData] = useContext(UserContext);
    useEffect(() =>{
        fetch('/allposts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(response => response.json()).then(result => {
            setData(result.post);
        })
        console.log('making a resquest 1')
    }, []);
    useEffect(() =>{
        fetch('/allposts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(response => response.json()).then(result => {
            setData(result.post);
        })
        console.log('making a resquest 2')
    }, [updateData]);
    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
          const newData = data.map(item=>{
              if(item._id==result._id){
                return result
              }else{
                  return item
              }
          })
          setData(newData)
          setUpdateData(!updateData);
          
        }).catch(err=>{
            console.log(err)
        })
    }
    const unlikePost = (id)=>{
        fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            console.log(newData);
            setData(newData)
            setUpdateData(!updateData);
          }).catch(err=>{
            console.log(err)
        })
    }
    
    return (
        <section className="home container">
            {data.map(item => {
                return (
                    <div className="card" key={item._id}>
                        <h5>{item.postedBy.name}</h5>
                        <div className="card-image">
                            <img src={item.photo} />
                        </div>
                        <div className="card-content">
                            <i className="material-icons fav">favorite</i>
                            {item.likes.includes(userData.user._id) ?
                                <i className="material-icons fav" onClick={() => unlikePost(item._id)}>thumb_down</i>
                            :
                                <i className="material-icons" onClick={() => likePost(item._id)}>thumb_up</i>
                            }
                            <h6>{item.likes.length} Likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body} </p>
                            <div className="input-field">
                                <input type="text" id="adicionar um comentario" id="coment" />
                                <label htmlFor="coment">adicionar comentario</label>
                            </div>
                        </div>
                    </div>
                )
            })}



        </section>
    )
}
export default Home;