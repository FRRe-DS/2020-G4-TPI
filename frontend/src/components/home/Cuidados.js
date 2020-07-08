import React, { Component } from 'react'
import './Home.css'
import Tarjeta from './Tarjeta'
import Sintomas from './Sintomas'

export class Cuidados extends Component {
    render() {
        return (
            <div className="container">
                <div className="row pt-5">
                    <div className="col-12">
                        <h1 className="font-weight-bold font-OpenSans text-center mb-5">Cuidados</h1>
                        <div className="row mb-5">
                            <Tarjeta />
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Sintomas />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cuidados
