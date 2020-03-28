  import React from 'react'
  import Button from '@material-ui/core/Button';
  import Dialog from '@material-ui/core/Dialog';
  import DialogActions from '@material-ui/core/DialogActions';
  import DialogContent from '@material-ui/core/DialogContent';
  import DialogContentText from '@material-ui/core/DialogContentText';
  import DialogTitle from '@material-ui/core/DialogTitle';
  import {NavigationBarNoSearchBar} from './Navbar';
  import { useCookies } from 'react-cookie';
  import { useHistory } from "react-router-dom";

  export const ConfigureDevice = (props) => (

    <div>
    <NavigationBarNoSearchBar/>
    <br / >
    <ConfigureDeviceForm deviceid={props}>
    </ConfigureDeviceForm>
    </div>
    
  )

  function ConfigureDeviceForm(props) {

    let history = useHistory();
    const [isPreviewShown, setPreviewShown] = React.useState(false);
    const [cookies] = useCookies(['token']);

    const [isLoaded,setLoaded] = React.useState(false);
    const [input, setInput] = React.useState({})

    React.useEffect(() => {
     fetch("http://localhost:4000/devices/"+props.deviceid.match.params.deviceid, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
       }
    }).then(res => res.json())
      .then(
      (result) => {
        console.log(result)

        input.User = (result.user)
        input.deviceid = (result.deviceId)
        input.Location = (result.location)
        input.WeatherAlarm = (result.alarm)
        input.WeatherType = (result.weatheralarm)
        input.lastRequest = (result.lastRequest)

              //Set Loaded
              setLoaded(true)
            },
            (error) => {
              setLoaded(true)
            }
            )
   }, []);

    const handlePreview=(e)=>{
      e.preventDefault();
          setPreviewShown(true); // Here we change state
        }

        const handleInputChange = (e) => setInput({
          ...input,
          [e.currentTarget.name]: e.currentTarget.value
        })


    const handleSubmit = (event) => {
          event.preventDefault();
          console.log(input)
      //Post request here
      var data = {
       User: input.User,
       deviceid: input.deviceid,
       Location: input.Location,
       WeatherAlarm: input.WeatherAlarm,
       WeatherType: input.WeatherType,
       lastRequest: input.lastRequest
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
            //AlertDialog()
       history.push("/dashboard");
       // console.log(data)
     }
   }).catch(err => console.log(err));



  }

  return (
    <>
    {!isLoaded ? (
      "Loading..."
      ) : (
      <div class="container center_div bg-light text-dark" >

      <form class="form-group align-center onSubmit={AlertDialog()} " >
      <div class="form-group">
      <label for="exampleFormControlInput1">Device ID</label>
      <input type="text" value={props.deviceid.match.params.deviceid} class="form-control" id="exampleFormControlInput1" onChange={handleInputChange} placeholder="Empty" readonly="reaconly"/>
      </div>

      <div class="form-group">
      <label for="User">User</label>
      <input type="text" value={input.User} id="User" name="User" class="form-control" placeholder="Empty"  readonly="readonly"/>
      </div>
      <div class="form-group">
      <label for="Location">Location</label>
      <input type="text" value={input.Location}  id="Location" name="Location" class="form-control" onChange={handleInputChange} placeholder="Empty"/>
      </div>
      <div class="form-group">
      <label for="WeatherAlarm">WeatherAlarm</label>
      <select class="form-control" value={input.WeatherAlarm} onChange={handleInputChange} name="WeatherAlarm" id="WeatherAlarm">
      <option value="true" >On</option>
      <option value="false">Off</option>
      </select>
      </div>
      <div class="form-group">
      <label for="WeatherType">WeatherType</label>
      <select class="form-control" value={input.WeatherType} onChange={handleInputChange} name="WeatherType" id="WeatherType">
      <option>Empty</option>
      <option>Rain</option>
      <option>Hail</option>
      <option>Snow</option>
      <option>Storm</option>
      <option>Clouds</option>
      <option>Clear</option>
      </select>
      </div>
      <div class="form-group">
      <label for="Last seen">Last seen</label>
      <input type="text" value={input.lastRequest} class="form-control" id="exampleFormControlInput2" onChange={handleInputChange} placeholder="Never" readonly="reaconly"/>
      <button type="submit" onClick={handleSubmit}>submit</button><br/>
      </div>
   
      </form>

      </div>



      )}</>);
      
      

    }

   // <button type="submit" onClick={handlePreview}>preview</button><br/>
   //    {props.render&& 
   //      <button type="submit" onClick={handlePreview}>Preview</button>
   //    }
   //    {isPreviewShown && <AlertDialog/>}

function AlertDialog() {
      const [open, setOpen] = React.useState(false);

      React.useEffect(() => {
        setOpen(true);
      }, []);

      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      return (
      <div>
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
      <DialogContentText id="alert-dialog-description">
      Let Google help apps determine location. This means sending anonymous location data to
      Google, even when no apps are running.
      </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleClose} color="primary">
      Disagree
      </Button>
      <Button onClick={handleClose} color="primary" autoFocus>
      Agree
      </Button>
      </DialogActions>
      </Dialog>
      </div>
      );
    }