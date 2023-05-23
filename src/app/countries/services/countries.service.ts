import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, of, tap, toArray } from 'rxjs';
import { PaisesContinente, paisDatos } from '../interfaces/paises.interface';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
private _regions:string[]=['Africa','Americas','Asia'];
  constructor(private http:HttpClient) { }

  get regions():string[]{

    return [...this._regions];
  }
   paisesRegion(region:string):Observable<paisDatos[]>{
    if(!region) return of([]);
    const url:string=`https://restcountries.com/v3.1/region/${region}`
    return this.http.get<PaisesContinente[]>(url)
                    .pipe(
                      map((data)=>data.map((valor)=>({
                        name:valor.name.common,
                        cca3:valor.cca3,
                        borders:valor.borders??[]

                        
                      }))),
                      
                      tap((valor)=>console.log(valor)
                      )
                      
                    )
                    
    
    

}
alphaCode(alphacode:string):Observable<paisDatos[]>{
  console.log({alphacode});
  
  const url=`https://restcountries.com/v3.1/alpha/${alphacode}`;
  
  return this.http.get<PaisesContinente[]>(url)
      .pipe(
        map(paises=>paises.map((pais)=>({
          name:pais.name.common,
          cca3:pais.cca3,
          borders:pais.borders ?? []
        })))

      )
      

}
getCountryBorder(borders:string[]){
  if(!borders) return of([]);
  const countryRequest:Observable<paisDatos[]>[]=[];
  borders.forEach(code=>{
    const request=this.alphaCode(code);//devuelve un observable [{}]
    countryRequest.push(request);//lo agrego al CountryRequest y ademas lo pasa como referencia
  })
  
  return combineLatest(countryRequest);
}

}
