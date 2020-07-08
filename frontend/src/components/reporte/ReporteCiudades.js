import React, { Component } from 'react'
import axios from 'axios'
import localidadesArgentina from '../../assets/json/localidades.json'
import {Bar} from 'react-chartjs-2';

export class ReporteCiudades extends Component {
    state = {
        ciudades: [],
        pacientes: [],
        contagiosCiudad: [],
        datosCiudades : {
            labels: [],
            datasets: [
              {
                label: '',
                backgroundColor: '',
                borderColor: 'r',
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
        await this.setDataContagiosCiudades()
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

        let localidad = {
            "nombre": '',
            "contagios": 0
        }
        
        let ListaCiudades = []

        for (let i = 0; i < deptos.length; i++) {
            localidad.nombre = deptos[i].localidad
            ListaCiudades.push(localidad)
            localidad = {
                "nombre": '',
                "contagios": 0
            }
        }

        

        // Obtener Lista de pacientes
        let pacientes = await this.state.pacientes

        // Ordenar la lista de pacientes por localidad
        if(pacientes) pacientes = pacientes.sort( (a,b) => a.localidad.localeCompare(b.localidad) )

        let localidadPaciente = pacientes[0].localidad
        let contagiadoLocalidad = 0

        for (let i = 0; i < pacientes.length; i++) {
            if(localidadPaciente != pacientes[i].localidad){
                
                ListaCiudades.map(ciudad => {

                        if(ciudad.nombre === localidadPaciente.toUpperCase()){
                            ciudad.contagios=contagiadoLocalidad
                        }

                    }
                )
                
                localidadPaciente = pacientes[i].localidad
                contagiadoLocalidad= 0
            }
            
            contagiadoLocalidad++
        }
        
        ListaCiudades.map(ciudad => {

                if(ciudad.nombre === localidadPaciente.toUpperCase()){
                    ciudad.contagios=contagiadoLocalidad
                }
                
            }
        )

        localidadPaciente = ''
        contagiadoLocalidad= 0
        
        let contagiosCiudad = ListaCiudades.sort( (a,b) => b.contagios - a.contagios )
        this.setState({ contagiosCiudad: contagiosCiudad })
        
    }

    setDataContagiosCiudades = async () => {
        let contagiosCiudades = await this.state.contagiosCiudad


        if(contagiosCiudades) contagiosCiudades = contagiosCiudades.filter(ciudad => ciudad.contagios > 0)
        

        let nombreCiudades= []
        let contagios=[] 

        for (let i = 0; i < contagiosCiudades.length; i++) {
            nombreCiudades.push(contagiosCiudades[i].nombre)
            contagios.push(contagiosCiudades[i].contagios)
        }



        this.setState({
            datosCiudades:{
                labels: nombreCiudades,
                datasets: [
                    {
                        label: 'Contagios por Ciudades',
                        backgroundColor: 'rgba(54,162,235,0.2)',
                        borderColor: 'rgba(54,162,235,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(54,162,235,0.4)',
                        hoverBorderColor: 'rgba(54,162,235,1)',
                        data: contagios
                    }
                ]
            }
        })
    }


    render() {
        return (
            <div>
                <h6 className="py-2">Contagios por Ciudades:</h6>
                <Bar data={this.state.datosCiudades} />
            </div>
        )
    }
}

export default ReporteCiudades
