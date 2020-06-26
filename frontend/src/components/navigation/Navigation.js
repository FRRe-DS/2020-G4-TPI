import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escudo from '../../assets/icons/escudo-argentina.svg'


export default class Navigation extends Component {
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
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
