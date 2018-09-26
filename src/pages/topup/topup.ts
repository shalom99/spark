import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the TopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html',
})
export class TopupPage {
  topupPostData = { "user_id": "", "token": "", "code":"" };
  topupDataSet: any;
  userDetails:any;
  responseData:any;
  responsesData:any;
  isClicked: boolean;
  code:any;
  userPostData = {"user_id":"","token":""};
  balanceDataSet:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public toastCtrl: ToastController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.topupPostData.user_id  = this.userDetails.user_id;
    this.topupPostData.token  = this.userDetails.token;
    this.userPostData.user_id  = this.userDetails.user_id;
    this.userPostData.token  = this.userDetails.token;
    this.isClicked = false;
    this.getBalance();
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopupPage');
  }

  topup(){
    this.isClicked = true;
    this.authService.postData(this.topupPostData, "topup").then((result) => {
      this.responseData = result;

      if(this.responseData.TopupData){
        this.topupDataSet = this.responseData.TopupData;
        console.log(this.topupDataSet);
        
        this.isClicked = true;
        this.getBalance();
      }else{
        console.log("Topup error");
      }
      
     
    }, (err) => {
      console.log("Topup Connection failed!");
    });
  }

  onSubmit(){
    this.topupPostData.code = this.code;
    console.log(this.topupPostData);
    this.topup();
    this.presentToast(this.topupDataSet);
    
   
  }


  getBalance(){
    this.authService.postData(this.userPostData, "getBalance").then((result) => {
      this.responsesData = result;

      if(this.responsesData.balanceData){
        this.balanceDataSet = this.responsesData.balanceData;
        JSON.stringify(this.balanceDataSet);
        console.log(this.balanceDataSet);
      }else{
        console.log("No Balance");
      }
    }, (err) => {
      console.log("Notification Connection failed!");
    });
  }



  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      position: "top",
      duration: 1000
    });
    toast.present();
  }

}
