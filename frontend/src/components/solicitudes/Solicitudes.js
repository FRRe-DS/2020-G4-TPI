import React, { Component } from 'react'
import axios from 'axios'
import './Solicitudes.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component'

const tablaCampeones = [
    {id:1,año:"2000",campeon:"Real Madrid",subcampeon:"Valencia"},
    {id:2,año:"2001",campeon:"Bayern Munich",subcampeon:"Valencia"},
    {id:3,año:"2002",campeon:"Real Madrid", subcampeon:"Leverkusen"},
    {id:4,año:"2003",campeon:"Milan", subcampeon:"Juventus"},
    {id:5,año:"2004",campeon:"Porto", subcampeon:"Monaco"},
]

const columnas = [
    {
        name:"ID",
        selector:"id",
        sortable: true,
    },
    {
        name:"Año",
        selector:"año",
        sortable: true,
    },
    {
        name:"Campeon",
        selector:"campeon",
        sortable: true,
    },
    {
        name:"Subcampeon",
        selector:"subcampeon",
        sortable: true,
    },
]

const paginacionOpciones = {
    rowsPerPageText:"Filas por página",
    rangeSeparatorText:"de",
    selectAllRowsItem:true,
    selectAllRowsItemText:"Todos"
}

const contextActions = () => (
    <button>
        Aceptar
    </button>
)

export default class Solicitud extends Component{

    state = {
        selectedRows:[],
        data:tablaCampeones,
        estado:false
    }

    handleChange = state => {
        console.log('state',state.selectedRows)

        this.setState({selectedRows: state.selectedRows})
    }

    aceptarSolicitudes = () => {
        const {selectedRows} = this.state
        const rows = selectedRows.map(s => s.name)

        if(window.confirm(`Estas seguro de aceptar estas solicitudes?:\r ${rows}?`)){
            this.setState(state=>({estado:true,data:(state.data,state.selectedRows,'name')}))
        }
    }

    render(){
        return(
            <div className="container">
                <div className="header">
                    <h1 className="font-poppins text-center my-3">Soy un listado de solicitudes</h1>
                </div>
                <hr/>
                <div className="table-responsive">
                    <DataTable
                    columns={columnas}
                    data={tablaCampeones}
                    title="Solicitudes"
                    pagination
                    paginationComponentOptions={paginacionOpciones}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    selectableRows
                    contextActions={contextActions(this.aceptarSolicitudes)}
                    />
                </div>
            </div>
        )
    }
}