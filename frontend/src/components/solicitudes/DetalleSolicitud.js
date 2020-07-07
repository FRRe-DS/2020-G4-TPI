import React, { Component } from 'react'
import axios from 'axios'
import './Solicitudes.css'

export class DetalleSolicitud extends Component {
    state={
        solicitud: null,
        idsolicitud: '',
        hospital:'',
        motivo: '',
        detalle: '',
        estado: '',
        fechaSolicitud: '',
        usuario: '',
        fechaRespuesta:'',
        respuesta:'',
        recursosSolicitados:[],
        recursos: [],
        recursosSolicitadosDisponibilidad:[],
        respuestaSolicitud: '',
        alert: false,
        alertRechazo: false,
        alertAceptar: false,
    }
    async componentDidMount(){
        await this.getSolicitud()
        await this.getRecursos()
        await this.getDisponibilidad()
    }

    getSolicitud = async () => {
        let id = this.props.match.params.id
        await axios.get(`http://localhost:8000/api/solicitud/${id}`)
        .then(res=>{
            this.setState({
                solicitud: res.data,
                idsolicitud: res.data.id,
                hospital: res.data.hospital.nombre,
                motivo:res.data.motivo,
                detalle:res.data.detalle,
                estado:res.data.estado,
                respuesta:res.data.respuesta,
                fechaSolicitud:res.data.fecha_creacion,
                usuario:res.data.usuario,
                recursosSolicitados:res.data.recursos
            })
        })
        .catch(e=>{
            console.log(e)
        })
    }

    getRecursos = async () => {
        const res = await axios.get('http://localhost:8000/api/recurso/')
        this.setState({ 
            recursos: res.data,
        })
        console.log(this.state.recursos)
    }

    getDisponibilidad = async () => {
        let recursosSolicitados = await this.state.recursosSolicitados
        let recusos = await this.state.recursos
        
        let disponibilidad = []
        recursosSolicitados.map(recursoSolicitado => {
            let recsol = recursoSolicitado
            let rec = recusos.filter(item => item.id === recursoSolicitado.recurso.id)
            recsol.cantidad_disponible = rec[0].cantidad
            if(recursoSolicitado.cantidad<rec[0].cantidad){
                recsol.cantidad_enviada=recursoSolicitado.cantidad
            }else{
                recsol.cantidad_enviada=rec[0].cantidad
            }
            disponibilidad.push(recsol)
        }) 
        this.setState({
            recursosSolicitadosDisponibilidad: disponibilidad
        })
        console.log(this.state.recursosSolicitadosDisponibilidad)

    }

    alertRechazo = () => {
        this.setState({
            alert: true,
            alertRechazo: true,
            alertAceptar: false
        })
    }
    alertAceptar = () => {
        this.setState({
            alert: true,
            alertAceptar: true,
            alertRechazo: false,
        })
    }
    close = () => {
        this.setState({
            alert: false,
            alertAceptar: false,
            alertRechazo: false,
        })
    }

    aceptarSolicitud = async () => {
        this.close()

        let recurso = {
            "estado": "A",
            "respuesta": await this.state.respuestaSolicitud,
            "recursos": []
        }

        this.saveRespuestaSolicitud(recurso)
        
    }

    rechazarSolicitud = async () => {
        this.close()

        let recurso = {
            "estado": "R",
            "respuesta": await this.state.respuestaSolicitud,
            "recursos": []
        }

        this.saveRespuestaSolicitud(recurso)
    }

    saveRespuestaSolicitud = async (recurso) => {

        let recursosAprobados = await this.state.recursosSolicitadosDisponibilidad

        recursosAprobados.map(item => {
            let rec = {
                "recurso": item.recurso.id,
                "cantidad_enviada": item.cantidad_enviada
            }
            recurso.recursos.push(rec)
        })
        
        console.log('Recursos Aceptados', recurso)
        
        const apiURL = 'http://localhost:8000/api'
        const token = localStorage.getItem('token')
        const Axios = axios.create({
            baseURL:apiURL,
            headers:{
                Authorization: `JWT ${token}`,
                ['Content-Type']: `application/json`
            },
        })
        
        let redirect

        await Axios.put('/solicitud/'+this.state.idsolicitud+'/', recurso)
        .then(res=>{
            console.log(res)
            redirect = "/solicitudes/"
        })
        .catch(e=>{
            console.log(e)
            redirect = "/solicitudes/"
        })
        
        this.props.history.push(redirect)
    }

    setRespuesta = (e) =>{
        this.setState({
            respuestaSolicitud: e.target.value
        })
    }

    render() {
        return (
            <div className="container-fluid font-poppins">
                <h1 className="text-center">Detalle de la Solicitud</h1>
                <hr/>
                <div className="row">
                    <div className="col-10  mx-auto">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="id">ID:</label>
                                    <input className="form-control" type="text" id="id" value={this.state.idsolicitud || ''} disabled/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="hospital">Hospital:</label>
                                    <input className="form-control" type="text" id="hospital" value={this.state.hospital || ''} disabled/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fechasolicitud">Fecha Solicitud:</label>
                                    <input className="form-control" type="text" id="fechasolicitud" value={this.state.fechaSolicitud || ''} disabled/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="motivo">Motivo:</label>
                                    <textarea className="form-control" rows="5" id="motivo" value={this.state.motivo || ''} disabled></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="detalle">Detalle:</label>
                                    <textarea className="form-control" rows="5" id="detalle" value={this.state.detalle || ''} disabled></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="estado">Estado:</label>
                                    <input className="form-control" type="text" id="estado" value={this.state.estado || ''} disabled/>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-12">
                                        <h5>Lista de Recursos Solicitados</h5>
                                        <table className="table table-responsive table-hover table-bordered ">
                                            <thead className="">
                                                <tr> 
                                                    <th className="text-center">ID</th>
                                                    <th className="text-center col">Nombre</th>
                                                    <th className="text-center">Cant. Solicitada</th>
                                                    <th className="text-center">Cant. Disponible</th>
                                                    <th className="text-center">Cant. P/Enviar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.recursosSolicitadosDisponibilidad.map( (item, index) => 
                                                        <tr key={index}>
                                                            <td>
                                                                {item.recurso.id}
                                                            </td>
                                                            <td>
                                                                {item.recurso.nombre}
                                                            </td>
                                                            <td>
                                                                {item.cantidad}
                                                            </td>
                                                            <td className={ (item.cantidad_disponible>item.cantidad)? 'text-success font-weight-bold' : 'text-danger font-weight-bold' }>
                                                                {item.cantidad_disponible}
                                                            </td>
                                                            <td className={ (item.cantidad_disponible>item.cantidad)? 'text-primary font-weight-bold' : 'font-warning font-weight-bold' }>
                                                                {item.cantidad_enviada}
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    {
                                        (this.state.estado === 'Pendiente')?
                                        
                                            <div className="col-12 text-center">
                                                <button className="btn btn-danger mr-2" onClick={this.alertRechazo}>Rechazar Solicitud</button>
                                                <button className="btn btn-success" onClick={this.alertAceptar}>Aceptar Solicitud</button>
                                            </div>

                                        :

                                            <div className="col-12">
                                                {
                                                    (this.state.estado === 'Aprobada')?
                                                        <div class="alert alert-success" role="alert">
                                                            <h4 class="alert-heading">Aprobada!</h4>
                                                            <p>Esta solicitud se encuentra <strong>aprobada.</strong></p>
                                                            <hr></hr>
                                                            <p class="mb-0">{this.state.respuesta}</p>
                                                        </div>
                                                    :
                                                        <div class="alert alert-danger" role="alert">
                                                            <h4 class="alert-heading">Rechazada!</h4>
                                                            <p>Esta solicitud se encuentra <strong>rechazada.</strong></p>
                                                            <hr></hr>
                                                            <p class="mb-0"><strong>Respuesta:</strong> {this.state.respuesta}</p>
                                                        </div>
                                                }
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.alert?
                        <div className="alerta">
                            {/* Rechazar Solicitud */}
                            {
                                this.state.alertRechazo?    
                                    <div className="col-10 col-md-6 col-lg-4 alerta-modal mx-auto">
                                        <div className="row">
                                            <div className="col-12">
                                                <button type="button" className="close" title="Cerrar" onClick={this.close}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                <h5>Rechazar Solicitud</h5>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-12">
                                                ¿Esta seguro que desea rechazar la solicitud??
                                            </div>
                                            <div className="col-12 mt-5">
                                                <div className="form-group">
                                                    <label htmlFor="respuesta">Mensaje de Respuesta:</label>
                                                    <input type="text" className="form-control" name="" id="respuesta" onChange={this.setRespuesta} value={this.state.respuestaSolicitud || ''}/>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-12 text-right">
                                                <button className="btn btn-secondary mr-2" onClick={this.close}>Cancelar</button>
                                                <button className="btn btn-danger" onClick={this.rechazarSolicitud}>Aceptar</button>
                                            </div>
                                        </div>
                                    </div>
                                :false
                            }

                            {/* Aceptar Solicitud */}
                            {
                                this.state.alertAceptar?                            
                                    <div className="col-md-4 alerta-modal mx-auto">
                                        <div className="row">
                                            <div className="col-12">
                                                <button type="button" className="close" title="Cerrar" onClick={this.close}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                <h5>Aceptar Solicitud</h5>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-12">
                                                ¿Esta seguro que desea rechazar la solicitud??
                                            </div>
                                            <div className="col-12 mt-5">
                                                <div className="form-group">
                                                    <label htmlFor="respuesta">Mensaje de Respuesta:</label>
                                                    <input type="text" className="form-control" name="" id="respuesta" onChange={this.setRespuesta} value={this.state.respuestaSolicitud || ''}/>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-12 text-right">
                                                <button className="btn btn-secondary mr-2" onClick={this.close}>Cancelar</button>
                                                <button className="btn btn-success" onClick={this.aceptarSolicitud}>Aceptar</button>
                                            </div>
                                        </div>
                                    </div>
                                :false
                            }
                        </div>
                    :false
                }
            </div>
        )
    }
}

export default DetalleSolicitud