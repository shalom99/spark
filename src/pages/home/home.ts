import { ParkingSlotPage } from './../parking-slot/parking-slot';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import { VoicePage } from './../voice/voice';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ParkingLotPage } from './../parking-lot/parking-lot';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component, ViewChild, ElementRef,ChangeDetectorRef  } from '@angular/core';
import { NavController, App, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('mapContainer') mapContainer: ElementRef;
  map: any;
  infoWindows: any;
  text: string;
  public userDetails: any;
  matches: any[];
  isRecording = false;
  markerPostData = {"user_id":"","token":""};
  markerData:any;
  responseData:any;
  constructor(public navCtrl: NavController, public app: App, public authService: AuthServiceProvider, public http: Http, public platform: Platform, public speechRecognition: SpeechRecognition, private cd: ChangeDetectorRef, public tts: TextToSpeech) { 
  const data = JSON.parse(localStorage.getItem('userData'));
  this.infoWindows = [];
  this.userDetails = data.userData; 
  this.markerPostData.user_id = this.userDetails.user_id;
  this.markerPostData.token = this.userDetails.token;
  console.log(this.userDetails); 
  
  
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

  ionViewWillEnter() {
    this.displayGoogleMap();
    this.getMarkers();
  }

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(16.41255645, 120.59491254);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }
  

  getMarkers() {
    this.authService.postData(this.markerPostData, "getMarkers").then((result) => {
      this.responseData = result;

      if (this.responseData.markersData) {
        console.log(this.responseData.markersData);
        this.markerData = this.responseData.markersData;
       
        this.addMarkersToMap(this.markerData);
      } else {
        console.log("Error");
      }

    }, (err) => {
      console.log("Cant get markers !");
    });
    // this.http.get('assets/data/markers.json')
    // .map((res) => res.json())
    // .subscribe(data => {
    //   this.addMarkersToMap(data);
    // });
  }

  addMarkersToMap(markers) {
    for(let marker of markers) {
      
      var position = new google.maps.LatLng(marker.lat, marker.lng);
      var dogwalkMarker = new google.maps.Marker({
        position: position,
        title: markers.name,
        icon: 'assets/images/spacemarker.png'});
      dogwalkMarker.setMap(this.map);
      this.addInfoWindowToMarker(dogwalkMarker,marker);
    }
  }

  addInfoWindowToMarker(dogMarker,markers) {
    var infoWindowContent = '<center><div id="content" ><h5>' + markers.name+ ' -  ₱'+ markers.price+ '/hr</h5><p>'+ markers.address +'</p> <a href="#" id="parking_lot">Check Parking Lot? </a></div>';
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    dogMarker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, dogMarker);
    });
    this.infoWindows.push(infoWindow);
  
    google.maps.event.addListener(infoWindow, 'domready', () => {
    //now my elements are ready for dom manipulation
    var clickableItem = document.getElementById('parking_lot');
    clickableItem.addEventListener('click', () => {
      this.navCtrl.push(ParkingLotPage);
    });
  });
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  gotoVoice(){
    this.navCtrl.push(VoicePage);
  }

  gotoSlot(){
    this.navCtrl.push(ParkingLotPage);
  }




}
