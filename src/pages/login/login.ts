import { TenantWelcomePage } from './../tenant-welcome/tenant-welcome';
import { SignupPage } from './../signup/signup';
import { TabsPage } from './../tabs/tabs';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData: any;
  userData = {"username":"","password":""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, private toastCtrl: ToastController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSignin() {
    if(this.userData.username && this.userData.password){

      this.authService.postData(this.userData, "login").then((result) => {
        this.responseData = result;
        console.log(this.responseData);

        if(this.responseData.userData){
          localStorage.setItem('userData', JSON.stringify(this.responseData));
          if(this.responseData.userData.usertype == '1'){
            this.navCtrl.push(TabsPage);
          }else if(this.responseData.userData.usertype == '2'){
            this.navCtrl.setRoot(TenantWelcomePage);
            
          }
         
        }else{
          this.presentToast("Please give valid username and password!");
        }
      }, (err) => {
        console.log("Connection failed!");
      });

    }else{
      this.presentToast("Missing username or password!");
    }
    
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      position: "top",
      duration: 3000
    });
    toast.present();
  }

  gotoSignup(){
    this.navCtrl.push(SignupPage);
  }

}
