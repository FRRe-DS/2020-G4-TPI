import React, { Component } from 'react'
import axios from 'axios'
import localidadesArgentina from '../../assets/json/localidades.json'
import {Bar} from 'react-chartjs-2';

export class ReporteDptos extends Component {
    state = {
        ciudades: [],
        pacientes: [],
        contagiosDepartamento: [],
        datosDepartamentos : {
            labels: [],
            datasets: [
              {
                label: '',
                backgroundColor: '',
                borderColor: '',
                borderWidth: 1,
                hoverBackgroundColor: '',
                hoverBorderColor: '',
                data: []
              }
            ]
          },
    }

    async componentDidMount() {
        await this.getCiudades()
        await this.getPacientes()
        await this.getPacientesDepartamentos()
        await this.setDatosGrafica()
    }

    getPacientes = async () => {
        const res = await axios.get('http://localhost:8000/api/paciente/')
        this.setState({ pacientes: res.data })
    }

    getCiudades = async () => {
        await this.setState({ ciudades: localidadesArgentina})
        const ciudadesChaco = this.state.ciudades.localidades.filter(localidad => localidad.provincia.nombre === 'Chaco')
        
        let localidadesChaco = []
        for (let i = 0; i < ciudadesChaco.length; i++) {
            const localidad = {
                "departamento": ciudadesChaco[i].departamento.nombre,
                "localidad": ciudadesChaco[i].nombre,
            }
            localidadesChaco.push(localidad)
        }
        
        this.setState({ ciudades: localidadesChaco })
    }

    getPacientesDepartamentos = async () => {
        // Obtener todos los departamentos del chaco
        let deptos = await this.state.ciudades

        // Ordenar todos los departamentos alfabeticamente
        if(deptos) deptos = deptos.sort((a, b) => a.departamento.localeCompare(b.departamento))

        let depto = deptos[0].departamento
        let localidad = {
            "nombre": '',
            "contagios": 0
        }
        let ciudadesdptos = {
            "departamento": '',
            "contagios": 0,
            "ciudades": []
        }
        let ListaDptoCiudades = []

        for (let i = 0; i < deptos.length; i++) {
            localidad.nombre = deptos[i].localidad

            if(depto != deptos[i].departamento){
                ciudadesdptos.departamento=depto
                
                ListaDptoCiudades.push(ciudadesdptos)
                
                depto = deptos[i].departamento
                ciudadesdptos = {
                    "departamento": '',
                    "contagios": 0,
                    "ciudades": []
                }
            }

            ciudadesdptos.ciudades.push(localidad)
            localidad = {
                "nombre": '',
                "contagios": 0
            }
        }

        ciudadesdptos.departamento=depto
        ListaDptoCiudades.push(ciudadesdptos)
        ciudadesdptos = {
            "departamento": '',
            "contagios": 0,
            "ciudades": []
        }


        // Obtener Lista de pacientes
        let pacientes = await this.state.pacientes

        // Ordenar la lista de pacientes por localidad
        if(pacientes) pacientes = pacientes.sort( (a,b) => a.localidad.localeCompare(b.localidad) )

        let localidadPaciente = pacientes[0].localidad
        let contagiadoLocalidad = 0

        for (let i = 0; i < pacientes.length; i++) {
            if(localidadPaciente != pacientes[i].localidad){
                ListaDptoCiudades.map(depto => 
                    depto.ciudades.map(
                        ciudad => {
                            if(ciudad.nombre === localidadPaciente.toUpperCase()){
                                ciudad.contagios=contagiadoLocalidad
                                depto.contagios+=contagiadoLocalidad
                            }
                        }
                    )
                )
                
                localidadPaciente = pacientes[i].localidad
                contagiadoLocalidad= 0
            }
            
            contagiadoLocalidad++
        }
        ListaDptoCiudades.map(depto => 
            depto.ciudades.map(
                ciudad => {
                    if(ciudad.nombre === localidadPaciente.toUpperCase()){
                        ciudad.contagios=contagiadoLocalidad
                        depto.contagios+=contagiadoLocalidad
                    }
                }
            )
        )
        localidadPaciente = ''
        contagiadoLocalidad= 0
        
        let contagiosDeptos = ListaDptoCiudades.sort( (a,b) => b.contagios - a.contagios )
        this.setState({ contagiosDepartamento: contagiosDeptos })
    }

    setDatosGrafica = async () => {
        let datos = await this.state.contagiosDepartamento
        
        let nombreDptos = []
        let contagiosDeptos = []

        datos.map( dato => {
            if(dato.contagios > 0){
                nombreDptos.push(dato.departamento)
                contagiosDeptos.push(dato.contagios)
            }
        })

        this.setState({
            datosDepartamentos:{
                labels: nombreDptos,
                datasets: [
                    {
                        label: 'Contagios por Departamentos',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: contagiosDeptos
                    }
                ]
            }
        })
        
    }
    
    render() {
        return (
            <div>
                <h6 className="py-2">Contagios por Departamentos:</h6>
                <Bar data={this.state.datosDepartamentos} />
            </div>
        )
    }
}

export default ReporteDptos
