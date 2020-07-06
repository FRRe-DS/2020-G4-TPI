import React, { Component } from 'react'
import axios from 'axios'
import './Recursos.css'

export class DeleteRecurso extends Component {
    state = {
        id: ''
    }

    async componentDidMount(){
        this.getId()
    }

    cancelDelete = () => {
        console.log('Cancelado!')
        this.props.history.push("/recursos")
    }

    confirmDelete = async () => {
        console.log('Eliminando!')

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

        await Axios.delete('/recurso/'+this.state.id+'/')
        .then(res=>{
            console.log(res)
            redirect = `/recursos/deleted/${this.state.id}`
        })
        .catch(e=>{
            console.log(e)
            redirect = "/recursos/deleted/0"
        })
        this.resetState()
        this.props.history.push(redirect)
    }

    getId = async () => {
        let id = await this.props.match.params.id
        this.setState({
            id: id
        })
        console.log(this.state.id)
    }

    resetState = () => {
        this.setState({
            id: ''
        })
    }

    render() {
        return (
            <div className="mimodal">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 font-poppins bg-white delete-container">
                            <div className="row">
                                <div className="col p-3">
                                    <p className="h4">Eliminar Recurso</p>
                                </div>
                            </div>
                            <hr className="p-0 m-0"/>
                            <div className="row">
                                <div className="col p-3">
                                    <p className="">¿Seguro desea eliminar el Recurso?</p>
                                </div>
                            </div>
                            <hr className="p-0 m-0"/>
                            <div className="row">
                                <div className="col p-3 text-right">
                                    <button className="btn btn-outline-secondary ml-auto mr-2" onClick={this.cancelDelete}>Cancelar</button>
                                    <button className="btn btn-outline-danger" onClick={this.confirmDelete}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteRecurso