import React from 'react'
import {NavigationBarNoSearchBar} from './Navbar';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

export const AddDevice = (props) => (

  <div>
    <NavigationBarNoSearchBar/>
    <br / >
    <AddDeviceForm deviceid={props}>
    </AddDeviceForm>
  </div>
    
)

function AddDeviceForm(props) {
  let history = useHistory();

  const [cookies] = useCookies(['token']);

  const [input, setInput] = React.useState({})

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })


  const handleSubmit = (event) => {
    event.preventDefault();

    //Post request here
  var data = {
   deviceid: input.deviceid,
  }

    fetch('http://localhost:4000/devices/configure/' + input.deviceid, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Authorization': 'Bearer ' + cookies.token, 
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if(res.status === 200){
      history.push("/dashboard");
   }
 }).catch(err => console.log(err));

}

return (
  <>
    <div class="container center_div bg-light text-dark" >

    <form class="form-group align-center onSubmit={AlertDialog()} " >
    <div class="form-group">
    <label for="exampleFormControlInput1">Fill in Device ID</label>
    <input type="text" value={input.deviceid} class="form-control" id="deviceid" name="deviceid" onChange={handleInputChange} placeholder="Empty"/>
    </div>

    <button type="submit" onClick={handleSubmit}>submit</button><br/>

    </form>

  </div>



  }</>);
      
      

}