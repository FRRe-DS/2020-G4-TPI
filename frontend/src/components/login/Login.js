import React, { Component } from 'react'
import axios from 'axios'
import './Login.css'

export default class Login extends Component{

    render(){
        return(
            <div className="login-container">
                <div className="login">
                    <div>
                        <h1  className="login-title">INICIAR SESIÓN</h1> 
                    </div>
                    <form>
                        <div className="input-container">
                        <label for="usuario">Nombre de usuario</label>
                        <br/>
                        <input type="text" className="input-field" id="usuario"/> 
                        </div>
                        <div className="input-container">
                        <label for="contraseña">Contraseña</label>
                        <br/>
                        <input type="password" className="input-field" id="contraseña"/>
                        </div>
                        <input type="submit" className="submit" value="INGRESAR"/>
                    </form>   
                </div>
            </div> 
        )
    }

}