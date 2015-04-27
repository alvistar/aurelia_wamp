import autobahn from 'autobahn';

export class Rpc {
  firstValue = 0;
  secondValue = 0;
  result = 0;
  session;

  calc() {
    this.session.call("com.example.sub",[Number(this.firstValue), Number(this.secondValue)]).then(
      res=> {
        console.log ("RPC success: ", res);
        this.result = res;
      },
      error => {
        console.log ("RPC error:", error);
        this.result = error.error;
      }
    )
  }

  activate() {
    this.connection = new autobahn.Connection({url: "ws://127.0.0.1:7168/",realm: "realm1"});

    this.connection.onopen = session => {
      console.log ("Session estabilished");
      this.session = session;
    }

    this.connection.open();
  }
}
