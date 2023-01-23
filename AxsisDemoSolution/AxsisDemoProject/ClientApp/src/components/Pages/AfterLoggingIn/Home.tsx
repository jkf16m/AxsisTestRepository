import React from "react";

const Home = ()=>{
    return(
        <div>
            <h4>Español</h4>
            <h2>Acerca de este proyecto</h2>
            <p>Este proyecto es solo una demostración simple, donde puedes:</p>
            <ul>
                <li>Iniciar sesión</li>
                <li>Cerrar sesión</li>
                <li>Agregar usuarios</li>
                <li>Ver información de usuarios</li>
                <li>Editar información de usuarios</li>
                <li>Desactivar usuarios</li>
            </ul>
            
            <h4>English</h4>
            <h2>About this project</h2>
            <p>This project is just a simple demo, where you can:</p>
            <ul>
                <li>Log in</li>
                <li>Log out</li>
                <li>Add users</li>
                <li>Watch users info</li>
                <li>Edit users info</li>
                <li>Deactivate users</li>
            </ul>

            <footer>
                <p>Made with:</p>
                <ul>
                    <li>React</li>
                    <li>Redux-Toolkit</li>
                    <li>.NET CORE 6</li>
                    <li>Entity Framework Core</li>
                    <li>SQL Server</li>
                </ul>
            </footer>
        </div>
    )
}
export default Home;