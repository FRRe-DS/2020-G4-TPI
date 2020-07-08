import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escudo from '../../assets/icons/escudo-argentina.svg'
import user from '../../assets/icons/user-man.svg'
import arrow_up from '../../assets/icons/arrow-up.svg'
import isAuth from '../../Auth'
import './Navigation.css'


export default class Navigation extends Component {
    state = {
        viewUser: false,
        auth: false
    }

    async componentDidMount(){
        await this.isLogged()   
    }

    viewUser = async () => {
        let estado = await this.state.viewUser
        this.setState({
            viewUser: !estado
        })
        await this.isLogged()
    }
    noViewUser = () => {
        this.setState({
            viewUser: false
        })
    }
    isLogged = async () => {
        if( await isAuth()){
            this.setState({
                auth: true
            })
        }else{
            this.setState({
                auth: false
            })
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={escudo} height="45px" alt=""/>
                        <span className="h2 align-middle">Ministerio de Salud</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/"> Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/hospitales"> Hospitales </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/recursos"> Recursos </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/solicitudes"> Solicitudes </Link>
                            </li>
                        </ul>
                        <a className="rounded-circle user" title="Mi Usuario" onClick={this.viewUser}>
                            <img src={user} className="img-fluid icon-user" alt=""/>                                    
                        </a>
                    </div>
                </div>
                {
                    this.state.viewUser ?
                        <div className="panel-user bg-dark shadow-lg">
                            {
                                this.state.auth ?
                                    <div>
                                        <ul className="nav flex-column py-3 px-5">
                                            <li>
                                                <p className="font-poppins text-center">Miguel Britos</p>
                                            </li>
                                            <li>
                                                <p className="font-poppins text-center">miguelbritos91</p>
                                            </li>
                                        </ul>
                                        <hr style={{background: '#f0f0f0'}}/>
                                        <div className="px-3 ">
                                            <Link className="btn btn-block btn-outline-danger" onClick={this.noViewUser} to="/logout">Cerrar Sesión</Link>
                                        </div>
                                    </div>
                                :
                                    <div className="px-3 pt-3">
                                        <Link className="btn btn-block btn-outline-success" onClick={this.noViewUser} to="/login">Iniciar Sesión</Link>
                                    </div>
                            }
                            <hr style={{background: '#f0f0f0'}}/>
                            <div className="text-center pb-3">
                                <div className="close-view-user rounded-circle mx-auto" onClick={this.noViewUser} title="Close">
                                    <img src={arrow_up} className="img-fluid" width="20px" alt=""/>
                                </div>
                            </div>
                        </div>
                    :false
                }
            </nav>
        )
    }
}
