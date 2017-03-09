import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WeatherService } from '../../providers/weather-service';

import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {   
   weather:any; 
   searchStr: string;
   results:any;
   zmw:string;

  constructor(public navCtrl: NavController,private _weatherService: WeatherService,private _storage:Storage) {
    
  }

  ionViewDidLoad() {
  	this.getDefaultCity().then((result)=>{
      if(result){
        this.zmw = JSON.parse(result).zmw;
      }else {
        this.zmw ='00000.158.38618';
      }
      this.getWeather(this.zmw);
    });    					
  }

  getWeather(zmw):void{
    this._weatherService.getWeather(zmw)
      .subscribe(data => {      
      this.weather = data.current_observation;
      
    });
  }

  getQuery():void{
  	if(this.searchStr.trim() == ''){
      this.results = [];
       return;
    }
    
  	this._weatherService.searchCities(this.searchStr.trim())
  			.subscribe(city => {
  				this.results = city.RESULTS;
  				
  			});
  }

  chooseCity(city):void{
  	this._weatherService.getWeather(city.zmw)
    	.subscribe(data => {    	
    	this.weather = data.current_observation;
    	this.results = [];
    	this.searchStr = '';
    });
  }

  getDefaultCity():Promise<any>{
  	return this._storage.get('city');    
  }


  openSettings():void{  	
  	this.navCtrl.push(SettingsPage);
  }

  blurSearchStr():void{
    console.log('blur');
   // this.results = [];
  }





}
