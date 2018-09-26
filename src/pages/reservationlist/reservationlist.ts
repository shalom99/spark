import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-reservationlist',
  templateUrl: 'reservationlist.html',
})
export class ReservationlistPage {
  public userDetails: any;
  public responseData: any;
  public dataSet: any;
  public responsesData: any;
  userPostData = { "user_id": "", "token": "" };
  checkeditem = [];
  reservationPostData = { "user_id": "", "token": "", "id": [] };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public alertCtrl: AlertController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.reservationPostData.user_id = this.userDetails.user_id;
    this.reservationPostData.token  = this.userDetails.token;
    this.getReservations();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationlistPage');
  }

  buttonState() {
    if (this.checkeditem.length > 0) {
      return false;
    } else {
      return true;
    }
  }



  onReserve() {

    const alert = this.alertCtrl.create({
      title: 'Alert:',
      message: 'Are you sure you want to cancel your reservation?',
      buttons: [{
        text: 'Yes',
        handler: () => {
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

  onReserves() {
    this.authService.postData(this.reservationPostData, "reservationsCan").then((result) => {
      this.responsesData = result;

      if (this.responsesData.revCancelData) {

        console.log(this.responsesData.revCancelData);
        this.getReservations();
      } else {
        console.log("Cant get reservations");
      }

    }, (err) => {
      console.log("Reservation Cancellation failed!");
    });
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


  getReservations() {
    this.authService.postData(this.userPostData, "getReservations").then((result) => {
      this.responseData = result;

      if (this.responseData.ReservationData) {
        this.dataSet = this.responseData.ReservationData;
        console.log(this.dataSet);
      } else {
        console.log("No Reservations");
      }


    }, (err) => {
      console.log("Reservation Connection failed!");
    });
  }

}
