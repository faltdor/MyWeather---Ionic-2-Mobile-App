import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WeatherService } from '../../providers/weather-service';

import { HomePage } from '../home/home';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

	searchStr:string;
	defaultCity:string;
	results= [];


  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  			  private _weatherService:WeatherService,
  			  private _storage:Storage) {}

  ionViewDidLoad() {
    this.getDefultCity();
  }

  getDefultCity(){
  	this._storage.get('city').then((result)=>{
  		if(result){
  			this.defaultCity = JSON.parse(result).name;
  		}else {
  			this.defaultCity = '';
  		}
  	});
  }

  getQuery():void{
    if(this.searchStr.trim() == ''){
       this.results = [];
       return;
    }
    
  	this._weatherService.searchCities(this.searchStr.trim())
  						.subscribe(res => {
  							this.results = res.RESULTS;
  						})
  }

  setDefaultCity(city){
  	
  	this.results = [];

	this._storage.set('city', JSON.stringify(city))
	.then(data => {
		if(data){ 
			this.searchStr = '';
			this.defaultCity = JSON.parse(data).name;
			this.searchStr = this.defaultCity;

			console.log('City Saved Successly!');
		}
	})
	.catch( error => {
		console.log("Error Saving default city!");
		console.log(error);
	})	
	
	//this.searchStr = city.name;
	//this.getDefultCity();
  	
  }

  saveChanges():void{
  		this.navCtrl.setRoot(HomePage);
  }


}
