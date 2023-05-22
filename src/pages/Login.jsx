import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login =() => {

    const [err,setErr] = useState(false);
    const navigate=useNavigate();


    const handleSubmit= async (e) => {
        e.preventDefault();

        const email =e.target[0].value;
        const password =e.target[1].value;
    

        try{

            await signInWithEmailAndPassword(auth, email, password);
            navigate("/") 

        }catch(err){

            setErr(true);
        }
};

    return (
        <div className="formContainer">
             <div className="formWrapper">
                <span className="logo">Messenger app </span>
                <span className="title">Login </span>

                <form className="form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"  />
                    <button className="b">Sign in</button>
                    {err && <span style={{color:"red"}}>Opps!! Something went wrong</span>}
                </form>
                <p className="p">If you don't have an account? <Link to="/register">Register</Link></p>
             </div>
        </div>
    );
};

export default Login;
