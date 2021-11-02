import './Login.css'
import { useForm } from "react-hook-form";
import React from 'react';
import useAuth from '../../../Hooks/UseAuth/UseAuth';
import { Link, useHistory , useLocation } from 'react-router-dom';


const Login = () => {
    const { signInUsingGoogle , newUserLogin, setuser } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const Redirect_uri = location.state?.from || "/home";
    const handleGoogleLogin = () =>{
        signInUsingGoogle()
        .then(result =>{
            history.push(Redirect_uri);
        })
    }
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const {email, password} = data;
        console.log(email, password)
        newUserLogin(email, password)

        .then(result => {
            const user = result.user;
            setuser(user);
            history.push(Redirect_uri);
            console.log(user);
          })
          .catch((error) => {
            console.log(error.message)
          });
    };
    
    return (
     <div className="login-from">
                <div className="card border-primary mb-3">
                    <h2><b>Login</b></h2>
                    <hr />
                    <br />

                    
                    <button type="button" className=" mb-lg-3 btn btn-outline-success"
                    onClick={handleGoogleLogin}
                    > <i className="fab fa-google"></i> Google sing in</button>
              </div>
       </div>
 
    );
};

export default Login;


