import { AddPlacePage } from './../add-place/add-place';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-tenant-welcome',
  templateUrl: 'tenant-welcome.html',
})
export class TenantWelcomePage {
  addPlacePage = AddPlacePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TenantWelcomePage');
  }

}
