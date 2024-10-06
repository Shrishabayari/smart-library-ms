import axios from 'axios';
import React, {useState} from 'react'

const Contactpage=() => {
  const [formData, setFormData]=useState({
    name:'',
    email:'',
    message:''
  });
  const {name, email, message}=formData;
  const handleChange =(e)=>{
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit =async (e)=> {
    e.preventDefault();
    try{
      await axios.post('http://localhost:3000/api/v1/contact',formData);
      alert('mssage sent sucessfully');
      setFormData({
        name:'',
        email:'',
        message:''
      });
      }catch(error){
        console.error('error submiting message:',error);
        alert('error submiting message');
      }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label >name:</label>
            <input type="text" name="name" value={name} onChange={handleChange} required/>

            <label>email:</label>
            <input type="email" name="email" value={email} onChange={handleChange} required/>

            <label>password:</label>
            <textarea name="message" value={message} onChange={handleChange} required/>
          </div>

          <button  type='submit'>submit</button>
        </form>
      </div>
    </>
  );
};
export default Contactpage