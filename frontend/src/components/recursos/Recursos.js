import React,{Component} from 'react'
import axios from 'axios'
import './Recursos.css'

export default class Recursos extends Component{
    state = {
        recursos:[]
    }

    async componentDidMount() {
        await this.getRecursos()
        console.log(this.state.recursos)
    }

    getRecursos = async () => {
        const res = await axios.get('http://localhost:8000/api/recurso/')
        this.setState({ recursos: res.data })
    }

    render(){
        return(
            <div className="container">
                <div className="header">
                   <h2 className="font-poppins text-center my-3">Recursos</h2>
                </div>
                <hr/>
            </div>
        )
    }

}