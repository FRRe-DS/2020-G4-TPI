import axios from 'axios'


const existToken = () => {
    if(localStorage.getItem('token') !== null){
        return true
    }
    return false
}

const isAuth = async () => {
    if(existToken()){
        let estado
        let data = {
            "token" : localStorage.getItem('token')
        }
        await axios.post('http://localhost:8000/api/auth/verify-token/',data)
        .then(res =>{
            if(res.status === 200) estado = true
        })
        .catch(e => {
            console.log(e)
            localStorage.setItem('token', null)
            estado = false
        })
        return estado
    }else{
        return false
    }
}

export default isAuth;