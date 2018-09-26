import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {
  text: string;
  matches: any[];
  isRecording = false;

  public restDetails: any;

  public slotDetails: any;
  
  public userDetails: any;
  public responseData: any;
  public responsesData: any;
  public resdataSet: any;
  public reservedataSet: any;
  itemyow: any;
  checkeditem = [];

  userPostData = {"user_id":"","token":"","columnId":"","rowId":""};
  reservationPostData = {"user_id":"","token":"","id":[]};
  voicePostData = {"user_id":"","token":""};
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public alertCtrl: AlertController, public platform: Platform, public tts: TextToSpeech, public speechRecognition: SpeechRecognition, public cd: ChangeDetectorRef) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData; 
    this.slotDetails = this.navParams.get('slot');
    this.userDetails = data.userData;
    this.userPostData.user_id  = this.userDetails.user_id;
    this.userPostData.token  = this.userDetails.token;
    this.userPostData.columnId = this.slotDetails.columnId;
    this.userPostData.rowId = this.slotDetails.rowId;
    this.reservationPostData.user_id = this.userDetails.user_id;
    this.reservationPostData.token  = this.userDetails.token;

    console.log(this.userPostData);
    this.getReservations();
    

  }

  buttonState() {
    if(this.checkeditem.length > 1){
      return false;
    }else{
      return true;
    }
  }


  onReserve(){

    const alert = this.alertCtrl.create({
      title: 'Alert:',
      subTitle: 'Are you sure you want to reserve?',
      message: 'P'+ this.checkeditem.length * 35 +' will be deducted from your account',
      buttons: [{
        text: 'Yes',
        handler: () =>{
          console.log(this.checkeditem);
          this.reservationPostData.id = this.checkeditem;
          console.log(this.reservationPostData);
          this.onReserves();
        }
      },
      {
        text: 'No, I changed my mind!',
        role: 'cancel',
        handler: () => {
          console.log('Cancelled!');
        }
      }
      ]
    });
    alert.present();

   
   
  }
  

  onChecked(id, e) {
    if (e.checked) {
      let i = this.checkeditem.indexOf(id);
      if (i > -1) {
        console.log("already checked!");
      } else {
        this.checkeditem.push(id);
        console.log(id + " checked");
      }

    } else {
      this.checkeditem.splice(this.checkeditem.indexOf(id), 1);
      console.log(id + " unchecked");
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

  getReservations(){
    this.authService.postData(this.userPostData, "reservations").then((result) => {
      this.responseData = result;

      if(this.responseData.reserveData){
        this.resdataSet = this.responseData.reserveData;
        console.log(this.resdataSet);
      }else{
        console.log("Cant get reservations");
      }
      
     
    }, (err) => {
      console.log("Reservation Connection failed!");
    });
  }

  onReserves(){
    this.authService.postData(this.reservationPostData, "reservationsUp").then((result) => {
      this.responsesData = result;
      
      if(this.responsesData.revUpdateData){
  
        console.log(this.responsesData.revUpdateData);
        this.getReservations();
      }else{
        console.log("Cant get reservations");
      }
      
    }, (err) => {
      console.log("Reservation Connection failed!");
    });
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




}
