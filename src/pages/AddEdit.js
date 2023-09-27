import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import "./AddEdit.css"
import axios from "axios";
import {toast} from "react-toastify";

const initialState={
    name: "",
    email: "",
    contact: "",
};

const AddEdit=() => {
    const[state, setState] = useState(initialState);
    const{ name, email, contact} = state;
    const history = useNavigate();
    const{id} = useParams();
    useEffect(()=>{
  axios.get(`http://localhost:5000/api/get/${id}`).then((response)=> setState({...response.data[0]}))
},[id]);

    const handleSubmit=(e)=>{
        if(!name || !email || !contact){
            toast.error("please provide details in all the above fields")
        }else{
            if(!id){

                axios.post("http://localhost:5000/api/post",{
                    name,
                    email,
                    contact
                }).then(()=>{
                   setState({name:"",email:"",contact:""}) 
                }).catch((error)=>toast.error(error.response.data));
                toast.success("Contact added successfully")


            }else{


                axios.put(`http://localhost:5000/api/put/${id}`,{
                    name,
                    email,
                    contact
                }).then(()=>{
                   setState({name:"",email:"",contact:""}) 
                }).catch((error)=>toast.error(error.response.data));
                toast.success("Contact Updated successfully")

            }
          
            setTimeout(()=> history('/',) ,500);
        }
        e.preventDefault();
    }
    const handleInputChange=(e)=>{
        const{name, value} = e.target;
        setState({...state, [name]: value})

    }
  return (
    <div style={{marginTop: "100px"}}>
        <form style={{

            margin:"auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center"
        }}
        onSubmit={handleSubmit}
        >
<label htmlFor="name">Name</label>
<input
type="text"
id="name"
name="name"
placeholder="Your name..."
value={name || ""}
onChange={handleInputChange}

/>
<label htmlFor="email">Email</label>
<input
type="email"
id="email"
name="email"
placeholder="Your emai..."
value={email || ""}
onChange={handleInputChange}

/>
<label htmlFor="contact">Contact</label>
<input
type="number"
id="contact"
name="contact"
placeholder="Your contact no..."
value={contact || ""}
onChange={handleInputChange}

/>
<input type="submit" value={id ? "Update" : "save"}/>
<Link to="/">
    <input type="button" value="Go back"/>
</Link>
        </form>
        
    </div>
  )
}

export default AddEdit