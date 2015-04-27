import {computedFrom} from 'aurelia-framework';
import autobahn from 'autobahn';
import $ from 'jquery';

export class Simulator{
  heading = 'Wamp Device Simulator GUI';

  status =false;
  temperature = 0;
  connection;
  session;

  onChangeStatus(value) {
    console.log("Sending:" + value);
    this.status = value;
    this.session.call("com.example.setStatus",[value]);
  };

  standardEvent(e) {
    debugger;
  }

  welcome(){
    alert(`Welcome, ${this.fullName}!`);
  }

  gotTemp(args) {
    console.log("Event:", args);
    this.temperature = args;
  }

  activate() {
    console.log("Hello!");

    this.connection = new autobahn.Connection({url: "ws://127.0.0.1:7168/",realm: "realm1"});
    this.connection.onopen = session => {
      this.session = session;

      console.log("Connected");

      session.call('com.example.getStatus').then (res => {
        console.log("Get status:" + res);
        this.status = res;
      })

      session.subscribe("com.example.temperature", args => {
        this.gotTemp(args);
      });

      session.subscribe("com.example.changedStatus", args => {
        console.log("Received changed status notifcation",args);
        this.status = args[0];
      });

    }
    this.connection.open();
  }
}


