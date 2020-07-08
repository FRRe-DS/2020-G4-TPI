import React, { Component } from 'react'
import axios from 'axios'
import './Solicitudes.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component'
import icon_detail from '../../assets/icons/details.svg'
import { Link } from 'react-router-dom'

const columnas = [
    {
        name:"ID",
        selector:"id",
        sortable: true,
    },
    {
        name:"Hospital",
        selector:"hospital.nombre",
        sortable: true,
    },
    {
        name:"Fecha Solicitud",
        selector:"fecha_creacion",
        sortable: true,
    },
    {
        name:"Fecha Respuesta",
        selector:"fecha_respuesta",
        sortable: true,
    },
    {
        name:"Estado de Solicitud",
        selector:"estado",
        sortable: true,
    },
    {
        name:"Usuario",
        selector:"usuario",
        sortable: true,
    },
    {
        name: 'Detalles',
        cell: row => <Link className="btn btn-primary" to={`/solicitudes/${row.id}`} title="Detalle"><img src={icon_detail} width="20px" height="auto" alt=""/></Link>,
        button: true,
    },
]

const paginacionOpciones = {
    rowsPerPageText:"Filas por página",
    rangeSeparatorText:"de",
    selectAllRowsItem:true,
    selectAllRowsItemText:"Todos"
}

export default class Solicitud extends Component{

    state = {
        selectedRows:[],
        estado:false,
        solicitudes:[],
        solicitudesFiltradas:[],
        filtroSolicitud: ''
    }

    async componentDidMount(){
        await this.getSolicitudes()
    }

    aceptarSolicitudes = () => {
        const {selectedRows} = this.state
        const rows = selectedRows.map(s => s.name)

        if(window.confirm(`Estas seguro de aceptar estas solicitudes?:\r ${rows}?`)){
            this.setState(state=>({estado:true,data:(state.data,state.selectedRows,'name')}))
        }
    }
    
    getSolicitudes = async () => {
        axios.get('http://localhost:8000/api/solicitud')
        .then(res =>{
            this.setState({
                solicitudes: res.data,
                solicitudesFiltradas: res.data
            })
            console.log(this.state.solicitudes)
        })
        .catch(e=>{
            console.log(e)
        })
    }

    filtrarSolicitud = async (e) => {
        this.setState({
            filtroSolicitud: e.target.value,
        })
        let solicitudes = await this.state.solicitudes

        if(this.state.filtroSolicitud != ''){
            let filter = solicitudes.filter(item => item.hospital && item.hospital.nombre.toLowerCase().includes(this.state.filtroSolicitud.toLowerCase()))
            this.setState({
                solicitudesFiltradas: filter
            })
        }else{
            this.setState({
                solicitudesFiltradas: solicitudes
            })
        }
    }
    cleanFilter = async () => {
        const solicitudes = await this.state.solicitudes
        this.setState({
            filtrarSolicitud: '',
            solicitudesFiltradas: solicitudes
        })
    }

    render(){
        return(
            <div className="container">
                <div className="header">
                    <h1 className="font-poppins text-center my-3">Solicitudes de Recursos Hospitalarios</h1>
                </div>
                <hr/>
                <div className="table-responsive">
                    <DataTable
                    title="Listado de Solicitudes" 
                    columns={columnas}
                    data={this.state.solicitudesFiltradas}
                    // data={this.state.solicitudes}
                    pagination
                    paginationComponentOptions={paginacionOpciones}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    pointerOnHover
                    subHeader
                    subHeaderComponent={
                    (
                        <div style={{ display: 'flex', alignItems: 'right' }}>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Buqueda" value={this.state.filtroRecurso} onChange={this.filtrarSolicitud} aria-label="Busqueda" aria-describedby="button-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-primary btn-clean-filter" type="button" id="button-addon2" onClick={this.cleanFilter} title="Borrar Filtro">
                                        <i className="icon-back"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    }
                    />
                </div>
            </div>
        )
    }
}