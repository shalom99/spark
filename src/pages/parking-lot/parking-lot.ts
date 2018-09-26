import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ParkingSlotPage } from './../parking-slot/parking-slot';

import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-parking-lot',
  templateUrl: 'parking-lot.html',
})
export class ParkingLotPage {
  text: string;
  public userDetails: any;
  matches: any[];
  isRecording = false;
  placeData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public speechRecognition: SpeechRecognition, public tts: TextToSpeech, public cd: ChangeDetectorRef, public platform: Platform) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.placeData = this.navParams.data;   
    console.log(this.placeData);
  }

  async sayText():Promise<any>{
    try{
      if(this.matches.indexOf("hi spark") > -1){
        await this.tts.speak("hello user " + this.userDetails.name);
      }
      else if(this.matches.indexOf("give me a list of pay parking lots") > -1){
        await this.tts.speak("Jadewell Pay Parking, Porta Vaga, SM and more");
      }
      else if(this.matches.indexOf("are there available reservations") > -1){
        await this.tts.speak("Yes, there is.");
      }
      else if(this.matches.indexOf("how much is the rate in jadewell" || "how much is the rate in jade well") > -1){
        await this.tts.speak("The rate is 35 pesos per hour.");
      }
      else if(this.matches.indexOf("show me the list of parking slots") > -1){
        this.navCtrl.push(ParkingSlotPage);
      }else if(parseInt(this.matches[0])){

      }
      else{
        await this.tts.speak("Sorry, didn't get that");
      }
      
    }catch(e){
      console.log(e);
    }
  }

  startListening(){
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening(options).subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
      this.sayText();
    });
    this.isRecording = true;
  }

  stopListening(){
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    })
  }

  getPermission(){
    this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      if(!hasPermission){
        this.speechRecognition.requestPermission();
      }
    })
  }

  isIos(){
    return this.platform.is('ios');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkingLotPage');
  }

  gotoReservation(){
    this.navCtrl.push(ParkingSlotPage);
  }

}
