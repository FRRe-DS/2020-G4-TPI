import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escudo from '../../assets/icons/escudo-argentina.svg'
import user from '../../assets/icons/user-man.svg'
import arrow_up from '../../assets/icons/arrow-up.svg'
import isAuth from '../../Auth'
import './Navigation.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import * as jwt_decode from "jwt-decode"



export default class Navigation extends Component {
    state = {
        viewUser: false,
        auth: false,
        user: {}
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
            await this.dataUser()
        }else{
            this.setState({
                auth: false
            })
        }
    }
    dataUser = () => {
        let token = localStorage.getItem('token')
        let decoded = jwt_decode(token);
        this.setState({
            user: decoded
        })
    }

    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand>
                    <Link to="/" className="links">
                        <img src={escudo} height="45px" alt=""/>
                        <span className="h2 align-middle">Ministerio de Salud</span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link >
                            <Link to="/" className="links"> Home </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/hospitales" className="links"> Hospitales </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/recursos" className="links"> Recursos </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/solicitudes" className="links"> Solicitudes </Link>
                        </Nav.Link>
                    </Nav>
                    <a className="rounded-circle user" title="Mi Usuario" onClick={this.viewUser}>
                        <img src={user} className="img-fluid icon-user" alt=""/>
                    </a>
                    {
                        this.state.viewUser ?
                            <div className="panel-user bg-dark shadow-lg">
                                {
                                    this.state.auth ?
                                        <div>
                                            <ul className="nav flex-column pt-4 px-5">
                                                <li>
                                                    <p className="font-poppins text-center">Usuario: <b>{ this.state.user.username }</b></p>
                                                </li>
                                                <li>
                                                    <p className="font-poppins text-center">E-mail: <b>{ this.state.user.email }</b></p>
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
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
