import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { ReservationPage } from './../reservation/reservation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-parking-slot',
  templateUrl: 'parking-slot.html',
})
export class ParkingSlotPage {
  public userDetails: any;
  public responseData: any;
  public slotsSet: any;
  userPostData = {"user_id":"","token":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkingSlotPage');
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id  = this.userDetails.user_id;
    this.userPostData.token  = this.userDetails.token;
    this.getSlots();
  }

  gotoReservation(slot){
    this.navCtrl.push(ReservationPage,{slot});
  }

  getSlots(){
    this.authService.postData(this.userPostData, "parkingSlots").then((result) => {
      this.responseData = result;

      if(this.responseData.slotsData){
        this.slotsSet = this.responseData.slotsData;
        console.log(this.slotsSet);
      }else{
        console.log("No slots");
      }
    }, (err) => {
      console.log("Slot Connection failed!");
    });
  }



}
