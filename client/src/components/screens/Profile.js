import React, { useEffect, useState, useContext } from 'react';
import photo from '../../glitch.png'
import Footer from '../Footer';
import {UserContext} from '../../Context/UserContext';
import M from 'materialize-css';
function Profile() {
    const [userData, setUserData] = useContext(UserContext);
    const [myPosts, setMyPosts] = useState([]);
    useEffect(() => {
        fetch('/myposts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => response.json()).then(result => {
            M.AutoInit();
            setMyPosts(result.myPosts);
        })
    }, []);
    return (
        <section className="container">
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "3%"
            }}>
                <div>
                    <img style={{
                        width: "160px",
                        height: "160px",
                        borderRadius: "80px"
                    }}
                        src={photo}
                    />
                </div>
                <div>
                    <h4>{userData.user.name}</h4>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "108%"
                    }}>
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery row">
                {
                    myPosts.map(post => {
                        return (
                            <div className="col s12 m6 l4" key={post._id}>
                                <img src={post.photo} className="item responsive-img" alt="profile" />
                            </div>
                        )
                    })
                }

            </div>
            <Footer />
        </section>
    )
}
export default Profile;