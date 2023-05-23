import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { CountriesService } from '../../services/countries.service';
import { Observable, filter, map, of, switchMap, tap } from 'rxjs';
import { PaisesContinente, paisDatos } from '../../interfaces/paises.interface';
@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {
  public myForm:FormGroup=this.fb.group({
    region:['',Validators.required],
    country:['',Validators.required],
    borders:['',Validators.required],

  });
  paises:paisDatos[]=[];
  fronteras:any[]=[];
  constructor(private fb:FormBuilder,private serviceCountry:CountriesService){
    
  }
  get regiones():string[]{
    return this.serviceCountry.regions;
  }
  ngOnInit(): void {
    this.RegionChanged();
    this.countryChanged();

  }
  RegionChanged():void{
    this.myForm.get('region')!.valueChanges
        .pipe(
          tap((valor)=>{
            this.myForm.get('country')?.setValue(''),
            this.myForm.get('borders')?.setValue('')
          }),
          switchMap(region=>(
            this.serviceCountry.paisesRegion(region)
          ))
        ).subscribe(countries=>{this.paises=countries})
    
       
        
        
        
      }
      countryChanged():void{
        this.myForm.get('country')!.valueChanges
            .pipe(//entran observable

              tap(()=>{this.myForm.get('borders')?.setValue('')}),
              filter((value:string)=>value.length>0),
            switchMap(paiscode=>this.serviceCountry.alphaCode(paiscode)),//devuelve un observable [{...borders}]
            switchMap((country)=>this.serviceCountry.getCountryBorder(country[0].borders))// devuelve un conjunto de observables [[ob],[obser],[obse]]
              
            )
            .subscribe((coun)=>{
             this.fronteras=coun;
             console.log(coun);
             
             
             
              
            }

            )
      }
     
      

  }
    
    
  


