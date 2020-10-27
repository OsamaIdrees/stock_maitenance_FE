import React from 'react';
import { useHistory } from 'react-router-dom';
import classess from './style.module.css'
import Swal from 'sweetalert2'

const Login = () =>{

    const [loginValue,setLoginValue] = React.useState('')
    const [passwordValue,setPasswordValue] = React.useState('')
    const history = useHistory();
    const getLoginValue = (e) =>{
       setLoginValue(e.target.value)
    }
    const getLoginPassword = (e) =>{
        setPasswordValue(e.target.value)
    }
    const SubmitRecord = (e) =>{
        e.preventDefault();
        fetch('http://localhost/stock_maitenance_be/public/api/login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                login_name:loginValue,
                login_password:passwordValue
            })
        }).then(response=>{
            return response.json();
        }).then((data)=>{
            if(data.success===true){
                Swal.fire({
                    icon:'success',
                    text:data.message
                })
              
                sessionStorage.setItem('login',true)
                sessionStorage.setItem('login_name',loginValue)
                history.push({
                    pathname:'/product-info',
                    state:{
                        login_name:loginValue
                    }
                })
            }
            else{
                Swal.fire({
                    icon:'error',
                    text:data.message
                })
                sessionStorage.setItem('login',false)
            }
            
        })

    }
    return <React.Fragment>
        <div className = {classess.main_container_login}>
            <div className={classess.login_heading}>
                Login
            </div>
            <div className={classess.login_form_div}>
                <form onSubmit={SubmitRecord}>
                    <input type ="text" name= "login_name" placeholder= "Enter Login Name" className={classess.login_input_setting} onChange={getLoginValue}/>
                    <br/>
                    <input type ="password" name="login_password" placeholder = "Enter Password" className = {classess.login_input_setting} onChange={getLoginPassword}/>
                    <br/>
                    <input type = "submit" name="submit" value="Login" className={classess.login_button_styling}  />
                </form>
            </div>
        </div>
    </React.Fragment>
}
export default Login;