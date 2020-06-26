import React, { Component } from 'react'
import mate from '../../assets/cuidados/21-no-compartir-mate.svg';
import barbijo from '../../assets/cuidados/noun_Doctor_3383256.svg';
import toser from '../../assets/cuidados/noun_dry cough_3381787.svg';
import lavar_manos from '../../assets/cuidados/noun_Hand Washing_3140461.svg';
import manos from '../../assets/cuidados/noun_Hand_2595880.svg';
import ventilar from '../../assets/cuidados/noun_open window_35517.svg';
import limpiar from '../../assets/cuidados/noun_cleaning_1406029.svg';
import aislamiento from '../../assets/cuidados/noun_isolation_3181705.svg';
import contacto from '../../assets/cuidados/noun_no hug_3381814.svg';

export class Tarjeta extends Component {
    render() {
        return (
            <div>
                <div className="row mt-2">
                    <div className="col-md-4">
                        <div className="row mx-auto bg-tarjeta rounded-circle mb-2">
                            <div className="col-12 text-center">
                                <div className="pt-3" >
                                    <img src={lavar_manos} className="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className="h5 text-center font-poppins">Lavate las manos con jabón frecuentemente</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row mx-auto bg-tarjeta rounded-circle mb-2">
                            <div className="col-12 text-center">
                                <div className="pt-3" >
                                    <img src={toser} className="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className="h5 text-center font-poppins">Estornudá y tosé en el pliegue del codo</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row mx-auto bg-tarjeta rounded-circle mb-2">
                            <div className="col-12 text-center">
                                <div className="pt-4" >
                                    <img src={manos} className="img-fluid pt-2" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className="h5 text-center font-poppins">No te lleves las manos a los ojos, nariz ni boca</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-4">
                        <div className="row mx-auto bg-tarjeta rounded-circle mb-2">
                            <div className="col-12 text-center">
                                <div className="pt-4" >
                                    <img src={ventilar} className="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className="h5 text-center font-poppins">Ventilá bien los ambientes de tu casa y tu lugar de trabajo</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row mx-auto bg-tarjeta rounded-circle mb-2">
                            <div className="col-12 text-center">
                                <div className="pt-3" >
                                    <img src={limpiar} className="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className="h5 text-center font-poppins">Limpiá los objetos que usás con frecuencia</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row mx-auto bg-tarjeta rounded-circle mb-2">
                            <div className="col-12 text-center">
                                <div className="pt-4" >
                                    <img src={aislamiento} className="img-fluid pt-3" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className="h5 text-center font-poppins">Permanecé en tu domicilio durante el aislamiento</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-4">
                        <div className="row mx-auto bg-tarjeta rounded-circle mb-2">
                            <div className="col-12 text-center">
                                <div className="pt-3" >
                                    <img src={contacto} className="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className="h5 text-center font-poppins">Reducí el contacto físico con otras personas</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row mx-auto bg-tarjeta rounded-circle mb-2">
                            <div className="col-12 text-center">
                                <div className="pt-3" >
                                    <img src={mate} className="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className="h5 text-center font-poppins">No compartas mate, vajilla ni otros objetos de uso personal</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row mx-auto bg-tarjeta rounded-circle mb-2">
                            <div className="col-12 text-center">
                                <div className="pt-3" >
                                    <img src={barbijo} className="img-fluid" width="80px" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className="h5 text-center font-poppins">No circules si no es necesario; si tenés que salir, usa barbijo casero y mantené la distancia de un metro con otras personas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tarjeta
