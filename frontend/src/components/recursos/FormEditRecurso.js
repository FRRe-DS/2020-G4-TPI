import React, { Component } from 'react'
import './Recursos.css';
import { Link } from 'react-router-dom'
import axios from 'axios'

export class FormEditRecurso extends Component {
    state={
        id: '',
        nombre:'',
        descripcion: '',
        estado:'',
        cantidad:0,
        saving: false
    }
    componentDidMount(){
        this.getRecurso()
    }

    getRecurso = async () => {
        let idRecurso = await this.props.match.params.id
        let res = await axios.get('http://localhost:8000/api/recurso/'+idRecurso)
        this.setState({
            id:res.data.id,
            nombre:res.data.nombre,
            descripcion: res.data.descripcion,
            estado: res.data.estado,
            cantidad:res.data.cantidad
        })
        console.log(this.state.recurso)
    }

    onChangeIdRecurso = (e) => {
        console.log('Accion no permitida!')
    }

    onChangeNombreRecurso = (e) => {
        this.setState({
            nombre: e.target.value
        })
        console.log('Nombre Recurso: ',this.state.nombre)
    }

    onChangeDescripcionRecurso = (e) => {
        this.setState({
            descripcion: e.target.value
        })
        console.log('Descripcion Recurso: ',this.state.descripcion)
    }

    onChangeCantidadRecurso = (e) => {
        let cantidad = parseInt(e.target.value)
        let estado = true
        if(cantidad===0){
            estado = false
        }
        this.setState({
            cantidad: cantidad,
            estado: estado
        })
        console.log('Cantidad Recurso: ',this.state.cantidad)
        console.log('Estado Recurso: ',this.state.estado)
    }

    resetState = () => {
        this.setState({
            id: '',
            nombre:'',
            descripcion: '',
            estado:'',
            cantidad:0,
        })
        console.log('Reset de parametros');
    }

    saveRecurso = async (e) => {
        e.preventDefault()
        this.setState({
            saving: true
        })
        console.log('Guardando cambios')
        const recurso = await this.state.recurso
        const res = await axios.put('http://localhost:8000/api/recurso/'+this.state.id,)
    }

    render() {
        return (
            <div className="mimodal">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10 col-md-6 col-lg-5 col-xl-4 mx-auto mt-5 contenedor-modal shadow-lg" id="staticBackdrop">
                            <div className="row pt-3 pb-2 px-3" style={{borderBottom:'1px solid #e3e3e3'}}>
                                <div className="col-10">
                                    <h4 className="font-poppins">Editar Recurso</h4>
                                </div>
                                <div className="col-2 my-auto">
                                    <Link type="button" className="close" title="Cerrar" onClick={this.resetState} to={'/recursos/'}>
                                        <span aria-hidden="true">&times;</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="row px-3 pt-3 pb-3">
                                <div className="col">
                                    <form action="" className="font-poppins">
                                        <div className="form-group row">
                                            <label htmlFor="id" className="col-sm-3 col-md-4 col-lg-3 col-xl-4 col-form-label text-right font-weight-bold">ID:</label>
                                            <div className="col-sm-9 col-md-8 col-lg-9 col-xl-8">
                                                <input className="form-control" type="text" id="id" onChange={this.onChangeIdRecurso} value={this.state.id || ''} disabled />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="nombre" className="col-sm-3 col-md-4 col-lg-3 col-xl-4 col-form-label text-right font-weight-bold">Nombre:</label>
                                            <div className="col-sm-9 col-md-8 col-lg-9 col-xl-8">
                                                <input className="form-control" type="text" id="nombre" onChange={this.onChangeNombreRecurso} value={this.state.nombre || ''} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="desc" className="col-sm-3 col-md-4 col-lg-3 col-xl-4 col-form-label text-right font-weight-bold">Descripcion:</label>
                                            <div className="col-sm-9 col-md-8 col-lg-9 col-xl-8">
                                                <textarea className="form-control" name="" id="desc" rows="5" onChange={this.onChangeDescripcionRecurso} value={this.state.descripcion || ''} ></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="cantidad" className="col-sm-3 col-md-4 col-lg-3 col-xl-4 col-form-label text-right font-weight-bold">Cantidad:</label>
                                            <div className="col-sm-9 col-md-8 col-lg-9 col-xl-8">
                                                <input className="form-control" type="number" min="0" id="cantidad" onChange={this.onChangeCantidadRecurso} value={this.state.cantidad || 0}/>
                                            </div>                                            
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-block btn-success" onClick={this.saveRecurso}>
                                                { 
                                                    !this.state.saving ? 
                                                        <span id="save">Guardar</span>
                                                    :  
                                                        <div className="loader" id="saving">
                                                            <div className="spinner-border text-white" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                        </div>
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default FormEditRecurso
