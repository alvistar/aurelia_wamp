import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

@inject(Router)
export class App {
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Aurelia';
      config.map([
        { route: ['simulator'],  moduleId: './simulator', nav: true, title:'Simulator' },
        { route: ['','rpc'],  moduleId: './rpc', nav: true, title:'RPC' }
      ]);
    });
  }
}
