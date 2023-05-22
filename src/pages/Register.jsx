import React, { useState } from "react";
import Add from "../img/imageLogo.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db,auth,storage} from "../firebase";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from "react-router-dom";

const Register =() => {

    const [err,setErr] = useState(false);
    const navigate=useNavigate();


    const handleSubmit= async (e) => {
        e.preventDefault()
    
        const displayName =e.target[0].value;
        const email =e.target[1].value;
        const password =e.target[2].value;
        const file =e.target[3].files[0];

        try{

            const res =await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
              'state_changed',null,
               (error) => {
                     setErr(true);
                          }, 
                          
    () => {
   
    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
      await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL,
      });

      await setDoc(doc(db ,"users",res.user.uid),{
        uid:res.user.uid,
        displayName,
        email,
        photoURL:downloadURL,
    });

    await setDoc(doc(db,"userChats",res.user.uid),{});
    navigate("/");
    });
    
  }
);

        }catch(err){

            setErr(true);
        }

};

    return (
        <div className="formContainer">
             <div className="formWrapper">
                <span className="logo">Messenger app </span>
                <span className="title">Register </span>

                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Display Name" />
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"  />
                    <input style={{display:"none"}}type="file" id="file"/>
                    <label className="l" htmlFor="file">
                        <img className="image" src={Add} alt=""/>
                        <span>Add your Image</span>
                    </label>
                    <button className="b">Sign up</button>
                    {err && <span style={{color:"red"}}>Opps!! Something went wrong</span>}
                </form>
                <p className="p">If you have account? <Link to="/login">Login</Link></p>
             </div>
        </div>
    );
};

export default Register;
