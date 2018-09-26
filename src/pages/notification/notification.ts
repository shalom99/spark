import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  public userDetails: any;
  public responseData: any;
  public dataSet: any;
  userPostData = {"user_id":"","token":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id  = this.userDetails.user_id;
    this.userPostData.token  = this.userDetails.token;
    this.getNotification();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  getNotification(){
    this.authService.postData(this.userPostData, "notification").then((result) => {
      this.responseData = result;

      if(this.responseData.notificationData){
        this.dataSet = this.responseData.notificationData;
        console.log(this.dataSet);
      }else{
        console.log("No Notification");
      }
      
     
    }, (err) => {
      console.log("Notification Connection failed!");
    });
  }

}
