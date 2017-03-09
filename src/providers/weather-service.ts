import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

/*
  Generated class for the WeatherService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WeatherService {
   private apikey:string = 'YOUR_API_KEY_FROM_UNWEATHER'; 
   

   private conditionsUrl:string = '';
   private searchUrl:string = '';


  constructor(public http: Http,private _platform:Platform) {
    if(this._platform.is('core') || this._platform.is('mobileweb')) {
       //No APP Mobile -- I used this for to avoid CORS issueds in local     
       this.conditionsUrl = 'http://localhost:8100/api/'+this.apikey+'/conditions/q'
       this.searchUrl = 'http://localhost:8100/search/aq?query='
    } else {
      //Is Mobile      
      this.conditionsUrl = 'http://api.wunderground.com/api/'+this.apikey+'/conditions/q'
      this.searchUrl = 'http://autocomplete.wunderground.com/aq?query='
    }
  }

  getWeather(zmw){
  	return this.http.get(this.conditionsUrl+'/zmw:'+zmw+'.json')
  				.map(res => res.json());

  }

   searchCities(searchStr){
    return this.http.get(this.searchUrl+searchStr)
          .map(res => res.json());

  }

}
