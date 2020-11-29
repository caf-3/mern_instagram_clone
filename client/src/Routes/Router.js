import React, {useEffect, useContext} from 'react';
import {Switch, Route, useHistory, Redirect} from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import Home from '../components/screens/Home';
import Login from '../components/screens/Login';
import Signup from '../components/screens/Signup';
import Profile from '../components/screens/Profile';
import Notfound from '../components/screens/Notfound';
import Createpost from '../components/screens/Createpost';
function Routing (){
    let histtory = useHistory();
    let [userData, setUserData] = useContext(UserContext);
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            setUserData(prevState => ({
                ...prevState,
                user,
            }));
        }else{
            histtory.push('/login');
        }
      }, []);
    return (
      <>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login'>
            {userData.user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path="/createpost" component={Createpost} />
          <Route path='*' component={Notfound} />
        </Switch>
      </>
    )
  }
export default Routing;