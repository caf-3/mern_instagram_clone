import React from 'react';
import {Link} from 'react-router-dom';
function Notfound(){
    return(
        <main className="error-404">
            <h1 className="logotipo">404</h1>
            <p>Para onde vais ?</p>
            <Link to="/" className="back">Voltar</Link>
        </main>
    )
}
export default Notfound;