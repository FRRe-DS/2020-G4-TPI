import React, { Component } from 'react'
import axios from 'axios'

export class Login extends Component {
    state={
        usuario: '',
        password: '',
        error: false,
        conn: false,
    }

    async componentDidMount() {
    }

    setUsuario = (e) => {
        this.setState({
            usuario: e.target.value
        })
    }

    setPassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    login = async (e) => {
        e.preventDefault()
        let data = {
            "username": this.state.usuario,
            "password": this.state.password
        }

        await axios.post('http://localhost:8000/api/auth/get-token/',data)
        .then(res=>{
            localStorage.setItem('token',res.data.token);
            this.props.history.push("/")
            this.setState({
                conn: true,
                error: false
            })
        })
        .catch(e => {
            console.log(e)
            this.setState({
                conn: false,
                error: true
            })
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-6 col-lg-5 col-xl-4 mx-auto">
                        { 
                            this.state.error ? 
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>ERROR!!</strong> Verifique usuario y contraseña.
                                </div>
                            :false
                        }
                        {
                            this.state.conn ?
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong>EXITO!!</strong> Usuario conectado.
                                </div>
                            :false
                        }
                        <form className="form font-poppins">
                            <h4>Log In</h4>
                            <div className="form-group">
                                <label htmlFor="usuario">Usuario</label>
                                <input type="text" name="" id="usuario" onChange={this.setUsuario} value={this.state.usuario} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" name="" id="password" onChange={this.setPassword} value={this.state.password} className="form-control" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-block btn-primary" onClick={this.login}>Ingresar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
