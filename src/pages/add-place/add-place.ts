import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { MapPage } from './../map/map';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';




@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  validateForm: FormGroup;
  responseData:any;
  latitude: any;
  longtitude:any;
  isClicked: boolean;
  values: any;
  userDetails:any;
  PostData =  {"user_id":"","token":"","name":"","address":"","price":"","slots":"","lat":"","long":""};
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private geolocation: Geolocation, public formBuilder: FormBuilder, public alertCtrl: AlertController, public authService: AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.PostData.user_id = this.userDetails.user_id;
    this.PostData.token = this.userDetails.token;
  }

  onSubmit(form: NgForm){

    this.values = form.value;

    const alert = this.alertCtrl.create({
      title: 'Alert:',
      message: 'Are you sure you want to add this place?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.PostData.name = this.values.title;
          this.PostData.address = this.values.address;
          this.PostData.price = this.values.price;
          this.PostData.slots = this.values.slots;
          this.onAddPlace();
          this.navCtrl.pop();
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




    console.log(this.PostData);
  }

  onOpenMap(){
    // const modal = this.modalCtrl.create(MapPage);
    // modal.present();
    this.navCtrl.push(MapPage);
  }

  onLocate(){
    this.isClicked = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.PostData.lat = resp.coords.latitude.toString();
      this.PostData.long = resp.coords.longitude.toString();
      

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
     
  }

  onAddPlace() {
    this.authService.postData(this.PostData, "addMarker").then((result) => {
      this.responseData = result;

      if (this.responseData.MarkerData) {

        console.log(this.responseData.MarkerData);
        
      } else {
        console.log("Error");
      }

    }, (err) => {
      console.log("Adding place failed!");
    });
        
    
      }

  


}
