import React, { Component  } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// npm install @react-native-async-storage/async-storage
// npm install react_native_mqtt --save
// https://github.com/Introvertuous-Fun/react-native-mqtt
// https://react-native-async-storage.github.io/async-storage/docs/install

import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync : {}
});

var x="";
function onConnect() {
  console.log("Connected");
  client.subscribe('Vantho15/Led');
  client.subscribe('Vantho15/Quat');
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// function onMessageArrived(message) {
//   let x = "\nTopic : "+message.topic+"\nMessage : "+message.payloadString;
//   console.log(x);
// }

 // const client = new Paho.MQTT.Client('broker.hivemq.com', 8000, 'uname');
 const client = new Paho.MQTT.Client('ngoinhaiot.com', 2222, 'uname1');
//  client.onMessageArrived = onMessageArrived;
 client.onConnectionLost = onConnectionLost;
 client.connect({ onSuccess:onConnect, useSSL: false, userName: "Vantho15", password:"3759DFCEFE834F17" });

 

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:"Không có gì"
    }
  }
  componentDidMount() {
    client.onMessageArrived=(message)=>this.onMessageArrived(message);
  }
  onMessageArrived  = (message) => 
  {
    let x = "\nTopic : "+message.topic+"\nMessage : "+message.payloadString;
    console.log(x);
    this.setState({data:x});
  }
  
  
  click  = () => 
  {
    console.log("click");
    client.publish("Vantho15/Led","Led On");
  }
  
  render() {
   
    return (
     
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
          <View>
            <Text> {this.state.data} </Text>
          </View>
          <TouchableOpacity onPress={()=>this.click()}>
            <Text  style={{padding:15, backgroundColor:"aqua",borderRadius:10, color:"orange"}}>Public</Text>
          </TouchableOpacity>
         
      </View>
    );
  }
}

export default App;

