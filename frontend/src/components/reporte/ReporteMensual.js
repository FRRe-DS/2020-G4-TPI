import React, { Component } from 'react'
import axios from 'axios'
import {Line} from 'react-chartjs-2';
import { baseURL } from '../../URLbase';

export class ReporteMensual extends Component {
    state = {
        datosMeses: {
            labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            datasets: [
              {
                label: 'Contagios por mes',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
              }
            ]
          },
    }

    async componentDidMount() {
      await this.getPacientes()
      await this.getPacientesMes()
  }

  getPacientes = async () => {
      const res = await axios.get(`${baseURL}/paciente/`)
      this.setState({ pacientes: res.data })
  }

  getPacientesMes = async () => {
    let pacientes = await this.state.pacientes
    if(pacientes) pacientes = pacientes.sort((a,b) => a.fecha_creacion.localeCompare(b.fecha_creacion))
    
    let mesActual = new Date().getMonth()

    let meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
    
    let mesesTranscurridos = meses.slice(0,mesActual+1)

    let pacientesMes = []
    for (let i = 0; i < mesActual+1; i++) {
      pacientesMes.push(0)
    }

    for (let i = 0; i < pacientesMes.length; i++) {
      const filtro = pacientes.filter(paciente => (new Date(Date.parse(paciente.fecha_creacion))).getMonth() === i )
      if(filtro.length > 0) pacientesMes[i]=filtro.length
    }
    this.setState({
      datosMeses: {
        labels: mesesTranscurridos,
        datasets: [
          {
            label: 'Contagios por mes 2020',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: pacientesMes
          }
        ]
      }
    })
  }


    render() {
        return (
            <div>
                <h6 className="py-2">Curva de contagios mensual:</h6>
                <Line data={this.state.datosMeses} />
            </div>
        )
    }
}

export default ReporteMensual
