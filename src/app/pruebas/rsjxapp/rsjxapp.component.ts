import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-rsjxapp',
  templateUrl: './rsjxapp.component.html',
  styleUrls: ['./rsjxapp.component.css']
})
export class RsjxappComponent {
  m:number=0;
 
  observable(){
    const a=of(1,2,3,4);
    a.subscribe({
      next:value=>{
        this.m=value;
        console.log(value)}
      
      
    })
  }

 
  
}
