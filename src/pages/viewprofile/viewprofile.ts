import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-viewprofile',
  templateUrl: 'viewprofile.html',
})
export class ViewprofilePage {
  public userDetails: any;
  public responseData: any;
  public dataSet: any;
  public balanceDataSet: any;
  public balance:any;
  userPostData = {"user_id":"","token":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
    
    const data = JSON.parse(localStorage.getItem('userData'));
    
    this.userDetails = data.userData;
    this.userPostData.user_id  = this.userDetails.user_id;
    this.userPostData.token  = this.userDetails.token;
    this.getBalance();
 
    
    
  
    
    console.log(this.userDetails);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewprofilePage');
  }


  getBalance(){
    this.authService.postData(this.userPostData, "getBalance").then((result) => {
      this.responseData = result;

      if(this.responseData.balanceData){
        this.balanceDataSet = this.responseData.balanceData;
        console.log(this.balanceDataSet);
      }else{
        console.log("No Balance");
      }
      
     
    }, (err) => {
      console.log("Notification Connection failed!");
    });
  }

}
