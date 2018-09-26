import { TopupPage } from './../pages/topup/topup';
import { ReservationlistPage } from './../pages/reservationlist/reservationlist';
import { NotificationPage } from './../pages/notification/notification';
import { ProfilePage } from './../pages/profile/profile';

import { SplitpaneProvider } from './../providers/splitpane/splitpane';
import { WelcomePage } from './../pages/welcome/welcome';
import { Component, ViewChild } from '@angular/core';
import { Platform, App, MenuController, NavController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = WelcomePage;
  @ViewChild('content') nav: NavController;
  userDetails:any;
  usertype:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public splitPane: SplitpaneProvider, public app: App, public menuCtrl: MenuController, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(localStorage.getItem('userData')){
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.usertype = this.userDetails.usertype;
      }
    
      statusBar.styleDefault();
      splashScreen.hide();
      
    });
  
  }

  backToWelcome(){
    this.nav.setRoot(WelcomePage);
    this.nav.popToRoot();
  }

  onLoadProfile(){
    this.nav.push(ProfilePage);
    this.menuCtrl.close();
  }
  onLoadNotifications(){
    this.nav.push(NotificationPage);
    this.menuCtrl.close();
  }

  onLoadReservations(){
    this.nav.push(ReservationlistPage);
    this.menuCtrl.close();
  }
  onLoadTopUp(){
    this.nav.push(TopupPage);
    this.menuCtrl.close();
  }
  

  onSignout(){

    const alert = this.alertCtrl.create({
      title: 'Alert:',
      message: 'Are you sure you want to sign out?',
      buttons: [{
        text: 'Yes',
        handler: () =>{
          localStorage.clear();
          this.menuCtrl.close();
          setTimeout(() => this.backToWelcome(), 1000);
          console.log("You have logged out");
        }
      },
      {
        text: 'No, go back!',
        role: 'cancel',
        handler: () => {
          console.log('Cancelled!');
        }
      }
      ]
    });
    alert.present();


    
  }

}
