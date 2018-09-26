import { TabsPage } from './../tabs/tabs';
import { LoginPage } from './../login/login';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TenantWelcomePage } from '../tenant-welcome/tenant-welcome';


@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  userDetails: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    if(localStorage.getItem('userData')){
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;

      console.log(this.userDetails);
      if(this.userDetails.usertype == '1'){
        this.navCtrl.setRoot(TabsPage);
      }else if (this.userDetails.usertype == '2'){
        this.navCtrl.setRoot(TenantWelcomePage);
      }
      // this.navCtrl.setRoot(TabsPage);
    }else{
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  gotoSignup(){
    this.navCtrl.push(SignupPage);
  }

  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }  

}
