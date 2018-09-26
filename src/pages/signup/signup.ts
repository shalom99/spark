import { TermsPage } from './../terms/terms';
import { TenantWelcomePage } from './../tenant-welcome/tenant-welcome';
import { TabsPage } from './../tabs/tabs';
import { LoginPage } from './../login/login';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  selectOption:any;
  validateForm: FormGroup;

  submitAttempt: boolean = false;

  responseData: any;
  userData = { "username": "", "usertype": "" ,"password": "", "email": "", "name": "", "phone_number": "", "plate_number": "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public formBuilder: FormBuilder) {
    this.validateForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
      name: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required])],
      phone_number: ['', Validators.compose([Validators.maxLength(12), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])], plate_number: ['', Validators.compose([Validators.maxLength(12), Validators.pattern('[a-zA-Z0-9]*')])],

      // ,
      // plate_number: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])]
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  login() {
    this.navCtrl.push(LoginPage);
  }


  onSignup() {

    if(this.selectOption == 'rentor'){
      this.userData.usertype = '1';
    }else if(this.selectOption == 'tenant'){
      this.userData.usertype = '2';
    }
    this.submitAttempt = true;
    console.log(this.userData);
    if (this.validateForm.valid) {
      this.authService.postData(this.userData, "signup").then((result) => {
        this.responseData = result;
        console.log(this.responseData);
         localStorage.setItem('userData', JSON.stringify(this.responseData));
        
       if(this.responseData.userData.usertype == '1'){
        this.navCtrl.push(TabsPage);
         }else if (this.responseData.userData.usertype == '2'){
          this.navCtrl.setRoot(TenantWelcomePage);
        }


        
      }, (err) => {
        console.log("Connection failed!");
      });
    } else {
      console.log("Error: Invalid Input");
    }


  }

  showTerms(){
    this.navCtrl.push(TermsPage);
  }
  




}
