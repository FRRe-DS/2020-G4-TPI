import React, { Component } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import './Recursos.css'
import icon_delete from '../../assets/icons/delete.svg'
import icon_edit from '../../assets/icons/edit.svg'

const columnas = [
    {
        name : "ID",
        selector: "id",
        sortable: true
    },
    {
        name: "Nombre",
        selector: "nombre",
        sortable: true
    },
    {
        name: "Descripción",
        selector: "descripcion",
        sortable: false
    },
    {
        name: "Cantidad",
        selector: "cantidad",
        sortable: true
    },
    {
        name: 'Editar',
        cell: row => <Link className="btn btn-secondary" to={'/recursos/edit/'+row.id} title="Editar"><img src={icon_edit} width="20px" height="auto" alt=""/></Link>,
        button: true,
    },
    {
        name: 'Borrar',
        cell: row => <button className="btn btn-danger" onClick={() => deleteRecurso(row.id)} title="Borrar"><img src={icon_delete} width="20px" height="auto" alt=""/></button>,
        button: true,
    },
]

function editRecurso (id) {
    console.log('Editar Recurso', id)
}

function deleteRecurso (id) {
    console.log('Borrar Recurso', id)
}

const optPag = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
}

export class Recursos extends Component {
    state = {
        recursos:[],
        recursosFiltrados:[],
        filtroRecurso:''
    }    

    async componentDidMount() {
        await this.getRecursos()
        console.log(this.state.recursos)
    }

    getRecursos = async () => {
        const res = await axios.get('http://localhost:8000/api/recurso/')
        this.setState({ 
            recursos: res.data,
            recursosFiltrados: res.data
        })
    }

    filtrarRecurso = async (e) => {
        this.setState({
            filtroRecurso: e.target.value,
        })

        const recursos = await this.state.recursos

        if(this.state.filtroRecurso != ''){
            let filter = recursos.filter(item => item.nombre && item.nombre.toLowerCase().includes(this.state.filtroRecurso.toLowerCase()))
            this.setState({
                recursosFiltrados: filter
            })
            console.log(this.state.filtroRecurso)
            console.log(this.state.recursosFiltrados)
        }else{
            this.setState({
                recursosFiltrados: recursos
            })
        }

    }
    cleanFilter = async () => {
        const recursos = await this.state.recursos
        this.setState({
            filtroRecurso: '',
            recursosFiltrados: recursos
        })
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                   <h2 className="font-poppins text-center my-3">Recursos</h2>
                </div>
                <hr/>
                <div className="table-responsive">
                    <DataTable 
                        title="Listado de Recursos" 
                        columns={columnas}
                        data={this.state.recursosFiltrados}
                        pagination
                        paginationComponentOptions={optPag}
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        highlightOnHover
                        pointerOnHover
                        subHeader
                        subHeaderComponent={
                        (
                            <div style={{ display: 'flex', alignItems: 'right' }}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Buqueda" value={this.state.filtroRecurso} onChange={this.filtrarRecurso} aria-label="Busqueda" aria-describedby="button-addon2" />
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

export default Recursos
