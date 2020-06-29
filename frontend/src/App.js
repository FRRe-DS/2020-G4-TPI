import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Hospitales from './components/hospitales/Hospitales';
import Reporte from './components/reporte/Reporte';
import Recursos from './components/recursos/Recursos';
import Solicitudes from './components/solicitudes/Solicitudes'
import Login from './components/login/Login'

function App() {
  return (
    <Router>
      <Navigation />

      <div className="">
        <Route path="/" exact component={Home} />
        <Route path="/hospitales" component={Hospitales} />
        <Route path="/reporte" component={Reporte} />
        <Route path="/recursos" component={Recursos}/>
        <Route path="/solicitudes" component={Solicitudes}/>
        <Route path="/login" component={Login}/>
      </div>

    </Router>
  );
}

export default App;
