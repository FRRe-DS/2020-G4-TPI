import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PrivateRoute from './PrivateRoute'
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Hospitales from './components/hospitales/Hospitales';
import Reporte from './components/reporte/Reporte';
import Recursos from './components/recursos/Recursos';
import FormEditRecurso from './components/recursos/FormEditRecurso';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import DeleteRecurso from './components/recursos/DeleteRecurso';
import FormNewRecurso from './components/recursos/FormNewRecurso';

function App() {
  return (
    <Router>
      <Navigation />

      <div className="">
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/hospitales" component={Hospitales} />
        <Route path="/reporte" component={Reporte} />
        <PrivateRoute path="/recursos/:action?/:id?" component={Recursos}/>
        <PrivateRoute path="/recursos/add" component={FormNewRecurso}/>
        <PrivateRoute path="/recursos/edit/:id" component={FormEditRecurso}/>
        <PrivateRoute path="/recursos/delete/:id" component={DeleteRecurso}/>
        <Route path="/login" component={Login}/>
        <Route exact path="/logout" component={Logout} />
      </div>

    </Router>
  );
}

export default App;
