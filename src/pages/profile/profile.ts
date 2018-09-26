import { TopupPage } from './../topup/topup';
import { NotificationPage } from './../notification/notification';
import { ViewprofilePage } from './../viewprofile/viewprofile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  viewProfile(){
    this.navCtrl.push(ViewprofilePage);
  }

  gotoTopUp(){
    this.navCtrl.push(TopupPage);
  }

}
