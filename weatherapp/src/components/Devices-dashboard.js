import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { withCookies, 
  Cookies 
} from 'react-cookie';
import { instanceOf } from 'prop-types';

class DeviceDashboard extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };


  constructor(props) {
    super(props);
    const { cookies } = props;
    console.log(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      token: cookies.get('token')

    };

  }

  componentDidMount() {
    fetch("http://localhost:4000/devices/alldevices", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.state.token, 
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((res) => {
        if(!res.ok) this.setState({isLoaded: true, error: "Unauthorized"});
        else return res.json();
    }).then((result) => {
         console.log(result)
          this.setState({
            isLoaded: true,
            items: result
          });
      }, (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
       
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>{error}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div class="row">       
          {items.map(item => (
          	<Card style={{ width: '18rem' }}>
  			
  			<Card.Body>
    		<Card.Title>WeatherLive Device</Card.Title>
    		<Card.Text>
      			This WeatherLive Device was last seen on {item.lastRequest.substring(0,10)}
    		</Card.Text>
  			</Card.Body>
  			<ListGroup className="list-group-flush">
    		<ListGroupItem>DeviceID: {item.deviceId}</ListGroupItem>
    		<ListGroupItem>Location: {item.location}</ListGroupItem>
    		<ListGroupItem>WeatherAlarm: {item.alarm ? "On" : "Off"}</ListGroupItem>
        <ListGroupItem>WeatherType: {item.weatheralarm ? item.weatheralarm : "None"}</ListGroupItem>
  			</ListGroup>
  			<Card.Body>
          <a href=  {`/configure/${item.deviceId}`} class="btn btn-primary">Configure</a>
  			</Card.Body>
			</Card>
       
          ))}
        
        </div>
      );
    }
  }
}

export default withCookies(DeviceDashboard);
