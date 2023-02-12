import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {
error:any;


constructor(private router:Router){
  const nagivation=this.router.getCurrentNavigation();
  this.error=nagivation && nagivation.extras && nagivation.extras.state && nagivation.extras.state.error;
}

ngOnInit()  {
  
}
}
