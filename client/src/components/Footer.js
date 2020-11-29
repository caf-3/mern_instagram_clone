import React from 'react';
import M from 'materialize-css';
class Footer extends React.Component{
    componentDidMount(){
        let photos = document.querySelectorAll(".materialboxed");
        M.Materialbox.init(photos)
    }
    render(){
        return(
            <div></div>
        )
    }
} 

export default Footer;