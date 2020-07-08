import React, { Component } from 'react'
import axios from 'axios'
import {Doughnut} from 'react-chartjs-2';
import { baseURL } from '../../URLbase';

export class ReportePacienteEstados extends Component {

    state={
        pacientes: [],
        datosEstado: {
            labels: [''],
            datasets: [{
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }]
        },
        activos: '',
        asintomaticos: '',
        sintomaticos: '',
        recuperados: '',
        fallecidos: ''
    }

    async componentDidMount() {
        await this.getPacientes()
        await this.filterPacientesEstado()
    }

    getPacientes = async () => {
        const res = await axios.get(`${baseURL}/paciente/`)
        this.setState({ pacientes: res.data })
    }

    filterPacientesEstado = async () => {
        let pacientes = await this.state.pacientes

        const asintomaticos = pacientes.filter(paciente => paciente.estado != 'F' && paciente.estado != 'C' && paciente.condicion === 'A')
        const sintomaticos = pacientes.filter(paciente => paciente.estado != 'F' && paciente.estado != 'C' && paciente.condicion === 'S')
        const recuperados = pacientes.filter(paciente => paciente.estado === 'C')
        const fallecidos = pacientes.filter(paciente => paciente.estado === 'F')
        
        this.setState({
            datosEstado: {
                labels: [
                    'Asintomáticos',
                    'Sintomáticos',
                    'Recuperados',
                    'Fallecidos'
                ],
                datasets: [{
                    data: [asintomaticos.length, sintomaticos.length, recuperados.length ,fallecidos.length],
                    backgroundColor: [
                    '#36A2EB',
                    '#FFCE56',
                    '#00d397',
                    '#FF6384',
                    ],
                    hoverBackgroundColor: [
                    '#36A2EB',
                    '#FFCE56',
                    '#00d397',
                    '#FF6384',
                    ]
                }]
            },
            activos: 'Pacientes Activos ' +(this.getPorcentaje(pacientes.length,(asintomaticos.length+sintomaticos.length)))+'%',
            asintomaticos:'Asintomáticos '+(this.getPorcentaje(pacientes.length,asintomaticos.length))+'%',
            sintomaticos:'Sintomáticos '+(this.getPorcentaje(pacientes.length,sintomaticos.length))+'%',
            recuperados:'Recuperados '+(this.getPorcentaje(pacientes.length,recuperados.length))+'%',
            fallecidos:'Fallecidos '+(this.getPorcentaje(pacientes.length,fallecidos.length))+'%'
        })
    }

    getPorcentaje = (total,valor) =>{
        return Math.trunc(((valor*100)/total)*100)/100
    }

    render() {
        return (
            <div>
                <h6 className="py-2">Estadistica de Pacientes Por Estado Actual:</h6>
                <Doughnut data={this.state.datosEstado} />
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <span className="font-OpenSans font-size-reporte">
                            {this.state.activos}
                        </span>
                    </li>
                    <ul>
                        <li className="nav-item">
                            <span className="font-OpenSans font-size-reporte">
                                {this.state.asintomaticos}
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="font-OpenSans font-size-reporte">
                                {this.state.sintomaticos}
                            </span>
                        </li>
                    </ul>
                    <li className="nav-item">
                        <span className="font-OpenSans font-size-reporte">
                            {this.state.recuperados}
                        </span>
                    </li>
                    <li className="nav-item">
                        <span className="font-OpenSans font-size-reporte">
                            {this.state.fallecidos}
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ReportePacienteEstados
