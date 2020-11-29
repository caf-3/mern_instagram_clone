import React, {createContext, useState} from 'react';
//consumer 
export const UserContext = createContext();
//provider
export function UserProvider(props){
    const [userData, setUserData] = useState({
        user:''
    });
    return(
        <UserContext.Provider value={[userData, setUserData]}>
            {props.childrens}
        </UserContext.Provider>
    )

}