import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import '../../assets/img/Coronavirus.jpg'
import { Cuidados } from './Cuidados'
import isAuth from '../../Auth'

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid pt-5 bg-portada">
                    <div className="row align-items-end">
                        <div className="col-10 mx-auto">
                            <h1 className="text-white text-shadow text-lowercase font-OpenSans font-weight-bold">Nuevo coronavirus <br />
                                <span className="font-poppins title-covid text-uppercase">COVID-19</span>
                            </h1>
                        </div>
                        <div className="col-10 mx-auto align-self-end">
                            <Link className="btn btn-lg btn-info text-uppercase btn-reporte" to="/reporte">
                                <i className="icon-report"></i>&nbsp;Reporte Diario
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bg-informacion">
                    <Cuidados />
                </div>
            </div>
        )
    }
}
