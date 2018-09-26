webpackJsonp([16],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPlacePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map_map__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_alert_alert_controller__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let AddPlacePage = class AddPlacePage {
    constructor(navCtrl, navParams, modalCtrl, geolocation, formBuilder, alertCtrl, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.geolocation = geolocation;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.PostData = { "user_id": "", "token": "", "name": "", "address": "", "price": "", "slots": "", "lat": "", "long": "" };
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.PostData.user_id = this.userDetails.user_id;
        this.PostData.token = this.userDetails.token;
    }
    onSubmit(form) {
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
    onOpenMap() {
        // const modal = this.modalCtrl.create(MapPage);
        // modal.present();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__map_map__["a" /* MapPage */]);
    }
    onLocate() {
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
            }
            else {
                console.log("Error");
            }
        }, (err) => {
            console.log("Adding place failed!");
        });
    }
};
AddPlacePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: 'page-add-place',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\add-place\add-place.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Add Place</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form #f="ngForm" (ngSubmit)="onSubmit(f)" >\n    <ion-list>\n      <ion-item>\n        <ion-label fixed>Title</ion-label>\n        <ion-input type="text" name="title" ngModel required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Address</ion-label>\n        <ion-textarea name="address" ngModel required></ion-textarea>\n      </ion-item>\n\n    </ion-list>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <button ion-button block outline type="button" icon-left (click)="onLocate()">\n            <ion-icon name="locate"></ion-icon>\n            Locate me\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button block outline type="button" icon-left (click)="onOpenMap()">\n            <ion-icon name="map"> </ion-icon>\n            Select on Map\n          </button>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="isClicked">\n        <ion-col>\n          <p>Your coordinates</p>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="isClicked">\n        <ion-col>\n          <p>Lat:{{ this.PostData.lat }}</p>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="isClicked">\n        <ion-col>\n          <p>Long: {{ this.PostData.long }}</p>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-item>\n            <ion-label >Price hourly 	₱:</ion-label>\n                <ion-input name="price" ngModel type="number" placeholder="" ></ion-input>\n              </ion-item>\n        </ion-row>\n        <ion-row>\n            <ion-item>\n                <ion-label >Number of slots:</ion-label>\n                    <ion-input name="slots" ngModel type="number" placeholder=""></ion-input>\n            </ion-item>\n        </ion-row>\n        \n        \n      \n      \n      \n\n      \n\n      <!-- <ion-row>\n          <ion-col text-center>\n            <h5>Take a Photo!</h5>\n          </ion-col>\n        </ion-row> -->\n      <!-- <ion-row>\n          <ion-col>\n            <button ion-button icon-left block outline type="button" (click)="onTakePhoto()">\n              <ion-icon name="camera"></ion-icon>\n              Open Camera\n            </button>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <img [src]="">\n          </ion-col>\n        </ion-row> -->\n      <ion-row>\n        <ion-col>\n          <button ion-button color="secondary" block type="submit" [disabled]="!f.valid"> Add this Place</button>\n\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\add-place\add-place.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
], AddPlacePage);

//# sourceMappingURL=add-place.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(215);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let MapPage = class MapPage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadMap();
    }
    loadMap() {
        let mapOptions = {
            camera: {
                target: {
                    lat: 16.41255645,
                    lng: 120.59491254
                },
                zoom: 18,
                tilt: 30
            }
        };
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', mapOptions);
        // Wait the MAP_READY before using any methods.
        this.map.one(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY)
            .then(() => {
            console.log('Map is ready!');
            // Now you can use all methods safely.
            this.map.addMarker({
                title: 'Ionic',
                icon: 'blue',
                animation: 'DROP',
                position: {
                    lat: 43.0741904,
                    lng: -89.3809802
                }
            })
                .then(marker => {
                marker.on(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MARKER_CLICK)
                    .subscribe(() => {
                    alert('clicked');
                });
            });
        });
    }
};
MapPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-map',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\map\map.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Choose Location</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n    <div style="height: 100%;" id="map_canvas"></div> \n    \n  \n \n</ion-content>'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\map\map.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], MapPage);

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let TermsPage = class TermsPage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad TermsPage');
    }
};
TermsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-terms',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\terms\terms.html"*/'<!--\n  Generated template for the TermsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Terms and Conditions</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  \n  \n<p>\n    Thank you for visiting SPARK. Your use of the information, materials, text, images and other content on the site or in the application is subject to the terms and conditions below, which we may revise from time to time without notice. Please read these terms and conditions carefully. BY ACCESSING THE SITE OR THE APP, YOU ACKNOWLEDGE AND AGREE THAT YOU HAVE READ, UNDERSTAND AND AGREE TO BE BOUND BY THESE GENERAL TERMS AND CONDITIONS.\n    Services: Unless expressly stated otherwise, the services provided by SPARK are limited to informing users of the nearest parking space nearby and the availability of certain parking slots and facilitating Reservations (as defined below) by displaying Parking Spots, processing Reservations and tapping out fees on behalf of Licensors (as defined below). Any fees and/or consideration paid to SPARK is paid to SPARK in connection with these Marketing Services unless otherwise indicated. To be clear, SPARK does not: (i) negotiate terms of licenses or settle disputes between users of the app; (ii) provide a parking service; (iii) operate a parking lot or other parking facility; (iv) otherwise accept custody of motor vehicles; or (v) provide services other than the Marketing Services (collectively, "Excluded Services"). The Excluded Services are provided by Licensors who are neither our agents nor acting in our behalf and we have no responsibility whatsoever regarding the safety of persons or property in the Parking Spots or any facility where the Parking Spots are located found through use of the App. We are not responsible for any consequences arising from the Excluded Services, including, without limitation, consequences arising from not being able to park or delays associated with parking, road closures or changing traffic conditions. Although we do not guarantee the availability of a specific Parking Spot, if a booked Parking Spot is unavailable at your time of reservation, we will attempt to locate an alternative Parking Slot and will surely resolve any issues or disputes.\n    Licensors: SPARK does not establish the prices for Parking Spots, operate Parking Spots, or determine parking availability provided by Licensors. \n    User Accounts:  In order to access certain areas of the app, you are required to create a user account and login. You agree that all information which you provide through the app in connection with creating your User Account or otherwise is current, accurate and complete. You are solely responsible for all activity that occurs with respect to your User Account. You are solely responsible for maintaining the confidentiality of your User Account and keeping the username and password to your User Account secure. You agree to notify us immediately of any security breach or unauthorized use of your User Account. We will not be liable for any costs, losses, claims or damages that you or any third party incur which are directly or indirectly caused by any unauthorized use of your User Account. And most importantly, you agree to never use another party\'s User Account without such party\'s express written authorization.\n    Personal Information: SPARK may collect and store personal information from you, including, but not limited to, the following information (collectively, together with any other information SPARK may collect in relation to your use of the Site, "Personal Information"):\n    ﹅	email address, phone number and physical contact information;\n    ﹅	vehicle information such as license plate information, model of your vehicle and the like;\n    ﹅	depending on the service used, sometimes tapped out card information, such as card number;\n    ﹅	Information you submit when creating or using your User Account, including user login and password information;\n    ﹅	the location and IP address from which you access the Site;\n    ﹅	the type of device, browser and operating system used to access the Site;\n    ﹅	the date and time you access the Site, duration and stop time of such access;\n    ﹅	the information about any person or entity from whom you were referred;\n    ﹅	the pages, files, documents and links that you visit; and\n    ﹅	any other information about your visit to the Site, Reservations you make or use of the Marketing Services generally.\n    \n    Use of Content: The text, images, data, illustrations, files, audio and video clips, designs, documents and other materials and content (collectively, the "Content") on the app is our property and may be protected by copyright and other restrictions. You may not copy, modify, distribute or otherwise use any of the Content, except for your personal and non-commercial use. \n    Fees and Payments: You are responsible for all charges, fees, duties, taxes, and assessments arising out of any Reservation, the use of a Parking Spot, the Marketing Services or the use of the app. You agree to pay to SPARK all fees for (including any overage fees) for SPARK’s provision of the Marketing Services, in accordance with the pricing and payment terms presented to you for such Marketing Services. Where applicable, you will be billed using the billing method of SPARK. Except as provided in these Terms and Conditions or when required by law, all fees paid by you are non-refundable SPARK may change the fees for any Marketing Services, including any Marketing Services billed pursuant to a Subscription (as defined below), at any time.\n    Cancellations and Refunds: You can cancel a Reservation for any reason before that time unless noted otherwise. Within 24 hours of the start of the Reservation, all Reservations are non-refundable, regardless of your use or non-use of the Reservation and regardless of any circumstance surrounding the use or non-use of a Reservation (i.e., traffic or weather delays, cancellation of a related event).\n    Contact Information: If you wish to contact us regarding (i) information on our products and services, (ii) permission to reproduce or use any Content on the Site, (iii) any other reason, please contact: (074) 244 8179 or email us at: spark@gmail.com\n    Entire Agreement: You agree that these Terms and Conditions constitute the entire agreement between you and us with respect to your use of the app.\n    \n  </p>\n  <button ion-button navPop> Go back?</button>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\terms\terms.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], TermsPage);

//# sourceMappingURL=terms.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewprofilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ViewprofilePage = class ViewprofilePage {
    constructor(navCtrl, navParams, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.userPostData = { "user_id": "", "token": "" };
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.userPostData.user_id = this.userDetails.user_id;
        this.userPostData.token = this.userDetails.token;
        this.getBalance();
        console.log(this.userDetails);
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ViewprofilePage');
    }
    getBalance() {
        this.authService.postData(this.userPostData, "getBalance").then((result) => {
            this.responseData = result;
            if (this.responseData.balanceData) {
                this.balanceDataSet = this.responseData.balanceData;
                console.log(this.balanceDataSet);
            }
            else {
                console.log("No Balance");
            }
        }, (err) => {
            console.log("Notification Connection failed!");
        });
    }
};
ViewprofilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-viewprofile',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\viewprofile\viewprofile.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    \n    <ion-title> Profile</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-list no-lines>\n    <ion-item >\n      Username: {{ userDetails.username}}\n    </ion-item>\n    <ion-item>\n        Email: {{userDetails.email}}\n    </ion-item>\n    <ion-item>\n        Name: {{userDetails.name}}\n    </ion-item>\n    <ion-item>\n        Phone: {{userDetails.phone_number}}\n \n    </ion-item>\n    <ion-item>\n        Plate Number: {{userDetails.plate_number}} \n       \n    </ion-item>\n\n    <ion-item *ngFor="let balance of balanceDataSet">\n     Balance: 	₱{{ balance.balance  }}\n     \n  </ion-item>\n  </ion-list>\n  \n\n</ion-content>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\viewprofile\viewprofile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
], ViewprofilePage);

//# sourceMappingURL=viewprofile.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReservationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_speech_recognition__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_text_to_speech__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





let ReservationPage = class ReservationPage {
    constructor(navCtrl, navParams, authService, alertCtrl, platform, tts, speechRecognition, cd) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.tts = tts;
        this.speechRecognition = speechRecognition;
        this.cd = cd;
        this.isRecording = false;
        this.checkeditem = [];
        this.userPostData = { "user_id": "", "token": "", "columnId": "", "rowId": "" };
        this.reservationPostData = { "user_id": "", "token": "", "id": [] };
        this.voicePostData = { "user_id": "", "token": "" };
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.slotDetails = this.navParams.get('slot');
        this.userDetails = data.userData;
        this.userPostData.user_id = this.userDetails.user_id;
        this.userPostData.token = this.userDetails.token;
        this.userPostData.columnId = this.slotDetails.columnId;
        this.userPostData.rowId = this.slotDetails.rowId;
        this.reservationPostData.user_id = this.userDetails.user_id;
        this.reservationPostData.token = this.userDetails.token;
        console.log(this.userPostData);
        this.getReservations();
    }
    buttonState() {
        if (this.checkeditem.length > 1) {
            return false;
        }
        else {
            return true;
        }
    }
    onReserve() {
        const alert = this.alertCtrl.create({
            title: 'Alert:',
            subTitle: 'Are you sure you want to reserve?',
            message: 'P' + this.checkeditem.length * 35 + ' will be deducted from your account',
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
    onChecked(id, e) {
        if (e.checked) {
            let i = this.checkeditem.indexOf(id);
            if (i > -1) {
                console.log("already checked!");
            }
            else {
                this.checkeditem.push(id);
                console.log(id + " checked");
            }
        }
        else {
            this.checkeditem.splice(this.checkeditem.indexOf(id), 1);
            console.log(id + " unchecked");
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ReservationPage');
    }
    getReservations() {
        this.authService.postData(this.userPostData, "reservations").then((result) => {
            this.responseData = result;
            if (this.responseData.reserveData) {
                this.resdataSet = this.responseData.reserveData;
                console.log(this.resdataSet);
            }
            else {
                console.log("Cant get reservations");
            }
        }, (err) => {
            console.log("Reservation Connection failed!");
        });
    }
    onReserves() {
        this.authService.postData(this.reservationPostData, "reservationsUp").then((result) => {
            this.responsesData = result;
            if (this.responsesData.revUpdateData) {
                console.log(this.responsesData.revUpdateData);
                this.getReservations();
            }
            else {
                console.log("Cant get reservations");
            }
        }, (err) => {
            console.log("Reservation Connection failed!");
        });
    }
    sayText() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.matches.indexOf("hi spark") > -1) {
                    yield this.tts.speak("hello user " + this.userDetails.name);
                }
                else if (this.matches.indexOf("give me a list of pay parking lots") > -1) {
                    yield this.tts.speak("Jadewell Pay Parking, Porta Vaga, SM and more");
                }
                else if (this.matches.indexOf("are there available reservations") > -1) {
                    yield this.tts.speak("Yes, there is.");
                }
                else if (this.matches.indexOf("how much is the rate in jadewell" || "how much is the rate in jade well") > -1) {
                }
                else {
                    yield this.tts.speak("Sorry, didn't get that");
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    startListening() {
        let options = {
            language: 'en-US'
        };
        this.speechRecognition.startListening(options).subscribe(matches => {
            this.matches = matches;
            this.cd.detectChanges();
            this.sayText();
        });
        this.isRecording = true;
    }
    stopListening() {
        this.speechRecognition.stopListening().then(() => {
            this.isRecording = false;
        });
    }
    getPermission() {
        this.speechRecognition.hasPermission().then((hasPermission) => {
            if (!hasPermission) {
                this.speechRecognition.requestPermission();
            }
        });
    }
    isIos() {
        return this.platform.is('ios');
    }
};
ReservationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: 'page-reservation',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\reservation\reservation.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title >Reservation - {{userPostData.columnId}}{{userPostData.rowId}} </ion-title>\n    <ion-buttons end>\n      \n              <button ion-button icon-only (click)="startListening()">\n                  <ion-icon name="mic" ></ion-icon>\n                </button>\n          </ion-buttons>\n          \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n \n  <ion-list *ngFor="let item of resdataSet; let i = index">\n    \n    <ion-item *ngIf="item.user_id_fk > 0; else banana" color="danger">\n      <ion-label > {{ item.Start}} - {{item.End}} Status: Not Available</ion-label>\n      <ion-checkbox color="green" disabled="true"></ion-checkbox>\n    </ion-item>\n    <ng-template #banana>\n      <ion-item color="secondary">\n      <ion-label > {{ item.Start}} - {{item.End}} Status: {{item.user_id_fk}}</ion-label>\n      <ion-checkbox color="green" checked="false" class="banana" (ionChange)="onChecked(item.id, $event)"></ion-checkbox>\n    </ion-item>\n    </ng-template>\n    \n  </ion-list>\n\n  <button [disabled]="buttonState()" ion-button block (click)="onReserve()"> Reserve!</button>\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\reservation\reservation.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_text_to_speech__["a" /* TextToSpeech */], __WEBPACK_IMPORTED_MODULE_0__ionic_native_speech_recognition__["a" /* SpeechRecognition */], __WEBPACK_IMPORTED_MODULE_3__angular_core__["k" /* ChangeDetectorRef */]])
], ReservationPage);

//# sourceMappingURL=reservation.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VoicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parking_slot_parking_slot__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_speech_recognition__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_text_to_speech__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





let VoicePage = class VoicePage {
    constructor(navCtrl, navParams, speechRecognition, cd, platform, tts) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.speechRecognition = speechRecognition;
        this.cd = cd;
        this.platform = platform;
        this.tts = tts;
        this.isRecording = false;
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
    }
    sayText() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.matches.indexOf("hi spark") > -1) {
                    yield this.tts.speak("hello user " + this.userDetails.name);
                }
                else if (this.matches.indexOf("give me a list of pay parking lots") > -1) {
                    yield this.tts.speak("Jadewell Pay Parking, Porta Vaga, SM and more");
                }
                else if (this.matches.indexOf("are there available reservations") > -1) {
                    yield this.tts.speak("Yes, there is.");
                }
                else if (this.matches.indexOf("how much is the rate in jadewell" || "how much is the rate in jade well") > -1) {
                    yield this.tts.speak("The rate is 35 pesos per hour.");
                }
                else if (this.matches.indexOf("show me the list of parking slots") > -1) {
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__parking_slot_parking_slot__["a" /* ParkingSlotPage */]);
                }
                else if (parseInt(this.matches[0])) {
                }
                else {
                    yield this.tts.speak("Sorry, didn't get that");
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad VoicePage');
    }
    startListening() {
        let options = {
            language: 'en-US'
        };
        this.speechRecognition.startListening(options).subscribe(matches => {
            this.matches = matches;
            this.cd.detectChanges();
            this.sayText();
        });
        this.isRecording = true;
    }
    stopListening() {
        this.speechRecognition.stopListening().then(() => {
            this.isRecording = false;
        });
    }
    getPermission() {
        this.speechRecognition.hasPermission().then((hasPermission) => {
            if (!hasPermission) {
                this.speechRecognition.requestPermission();
            }
        });
    }
    isIos() {
        return this.platform.is('ios');
    }
};
VoicePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: 'page-voice',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\voice\voice.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>voice</ion-title>\n    <ion-buttons end>\n      \n              <button ion-button icon-only (click)="getPermission()">\n                  <ion-icon name="mic" ></ion-icon>\n                </button>\n                <button ion-button (click)="startListening()"> Listen</button>\n                <button ion-button (click)="stopListening()" *ngIf="isIos()" >Stop</button>\n                \n          </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-card>\n  <ion-card-header> This is what i understood...</ion-card-header>\n  <ion-card-content>\n    <ion-list>\n      <ion-item *ngFor="let match of matches">\n        {{match}}\n      </ion-item>\n    </ion-list>\n  </ion-card-content>\n</ion-card>\n<ion-item>\n  <ion-label stacked> Text</ion-label>\n  <ion-textarea rows="5" [(ngModel)]="text"></ion-textarea>\n</ion-item>\n<button clear ion-button (click)="sayText()">Text to Speech</button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\voice\voice.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_speech_recognition__["a" /* SpeechRecognition */], __WEBPACK_IMPORTED_MODULE_2__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_text_to_speech__["a" /* TextToSpeech */]])
], VoicePage);

//# sourceMappingURL=voice.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParkingLotPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_text_to_speech__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_speech_recognition__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parking_slot_parking_slot__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





let ParkingLotPage = class ParkingLotPage {
    constructor(navCtrl, navParams, speechRecognition, tts, cd, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.speechRecognition = speechRecognition;
        this.tts = tts;
        this.cd = cd;
        this.platform = platform;
        this.isRecording = false;
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.placeData = this.navParams.data;
        console.log(this.placeData);
    }
    sayText() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.matches.indexOf("hi spark") > -1) {
                    yield this.tts.speak("hello user " + this.userDetails.name);
                }
                else if (this.matches.indexOf("give me a list of pay parking lots") > -1) {
                    yield this.tts.speak("Jadewell Pay Parking, Porta Vaga, SM and more");
                }
                else if (this.matches.indexOf("are there available reservations") > -1) {
                    yield this.tts.speak("Yes, there is.");
                }
                else if (this.matches.indexOf("how much is the rate in jadewell" || "how much is the rate in jade well") > -1) {
                    yield this.tts.speak("The rate is 35 pesos per hour.");
                }
                else if (this.matches.indexOf("show me the list of parking slots") > -1) {
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__parking_slot_parking_slot__["a" /* ParkingSlotPage */]);
                }
                else if (parseInt(this.matches[0])) {
                }
                else {
                    yield this.tts.speak("Sorry, didn't get that");
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    startListening() {
        let options = {
            language: 'en-US'
        };
        this.speechRecognition.startListening(options).subscribe(matches => {
            this.matches = matches;
            this.cd.detectChanges();
            this.sayText();
        });
        this.isRecording = true;
    }
    stopListening() {
        this.speechRecognition.stopListening().then(() => {
            this.isRecording = false;
        });
    }
    getPermission() {
        this.speechRecognition.hasPermission().then((hasPermission) => {
            if (!hasPermission) {
                this.speechRecognition.requestPermission();
            }
        });
    }
    isIos() {
        return this.platform.is('ios');
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ParkingLotPage');
    }
    gotoReservation() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__parking_slot_parking_slot__["a" /* ParkingSlotPage */]);
    }
};
ParkingLotPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: 'page-parking-lot',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\parking-lot\parking-lot.html"*/'<ion-header >\n  <ion-navbar color="primary">\n    <ion-title >Jadewell Pay Parking</ion-title>\n    <ion-buttons end>\n      \n              <button ion-button icon-only (click)="startListening()">\n                  <ion-icon name="mic" ></ion-icon>\n                </button>\n          </ion-buttons>\n          \n  </ion-navbar>\n</ion-header>\n\n<ion-content class="parkinglot" fullscreen>\n    <ion-slides zoom="true" class="slides">\n        <ion-slide>\n          <div class="swiper-zoom-container">\n            <img src="assets/images/jadewell6.png">\n          </div>\n          <!-- <ion-label>Woof</ion-label> -->\n        </ion-slide>\n        <ion-slide>\n          <div class="swiper-zoom-container">\n            <img src="assets/images/jadewell2.png">\n          </div>\n       \n        </ion-slide>\n        <ion-slide>\n          <div class="swiper-zoom-container">\n            <img src="assets/images/jadewell3.png">\n          </div>\n          <!-- <ion-label>Just keep swimming</ion-label> -->\n        </ion-slide>\n        <ion-slide>\n          <div class="swiper-zoom-container">\n            <img src="assets/images/jadewell4.png">\n          </div>\n          <!-- <ion-label>Just keep swimming</ion-label> -->\n        </ion-slide>\n        <ion-slide>\n          <div class="swiper-zoom-container">\n            <img src="assets/images/jadewell5.png">\n          </div>\n          <!-- <ion-label>Just keep swimming</ion-label> -->\n        </ion-slide>\n        <ion-slide>\n          <div class="swiper-zoom-container">\n            <img src="assets/images/jadewell1.png">\n          </div>\n          <!-- <ion-label>Just keep swimming</ion-label> -->\n        </ion-slide>\n        <ion-slide>\n          <div class="swiper-zoom-container">\n            <img src="assets/images/jadewell7.png">\n          </div>\n          <!-- <ion-label>Just keep swimming</ion-label> -->\n        </ion-slide>\n      </ion-slides>\n      <ion-grid class="details">\n        <ion-row>\n          <ion-col>Capacity: 50 </ion-col>\n          <ion-col>Price: ₱35/hr</ion-col>\n        </ion-row>\n      </ion-grid>\n     <button ion-button block round outline (click)="gotoReservation()"> Reservation</button> \n\n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\parking-lot\parking-lot.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_speech_recognition__["a" /* SpeechRecognition */], __WEBPACK_IMPORTED_MODULE_0__ionic_native_text_to_speech__["a" /* TextToSpeech */], __WEBPACK_IMPORTED_MODULE_3__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* Platform */]])
], ParkingLotPage);

//# sourceMappingURL=parking-lot.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let NotificationPage = class NotificationPage {
    constructor(navCtrl, navParams, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.userPostData = { "user_id": "", "token": "" };
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.userPostData.user_id = this.userDetails.user_id;
        this.userPostData.token = this.userDetails.token;
        this.getNotification();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad NotificationPage');
    }
    getNotification() {
        this.authService.postData(this.userPostData, "notification").then((result) => {
            this.responseData = result;
            if (this.responseData.notificationData) {
                this.dataSet = this.responseData.notificationData;
                console.log(this.dataSet);
            }
            else {
                console.log("No Notification");
            }
        }, (err) => {
            console.log("Notification Connection failed!");
        });
    }
};
NotificationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-notification',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\notification\notification.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Notifications</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card *ngFor="let item of dataSet">\n        <ion-card-content>\n       <p> {{item.feed_id}}.  {{ item.feed }}</p>\n        <span>{{item.created }}</span>\n        </ion-card-content>\n     </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\notification\notification.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
], NotificationPage);

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReservationlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ReservationlistPage = class ReservationlistPage {
    constructor(navCtrl, navParams, authService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.userPostData = { "user_id": "", "token": "" };
        this.checkeditem = [];
        this.reservationPostData = { "user_id": "", "token": "", "id": [] };
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.userPostData.user_id = this.userDetails.user_id;
        this.userPostData.token = this.userDetails.token;
        this.reservationPostData.user_id = this.userDetails.user_id;
        this.reservationPostData.token = this.userDetails.token;
        this.getReservations();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ReservationlistPage');
    }
    buttonState() {
        if (this.checkeditem.length > 0) {
            return false;
        }
        else {
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
            }
            else {
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
            }
            else {
                this.checkeditem.push(id);
                console.log(id + " checked");
            }
        }
        else {
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
            }
            else {
                console.log("No Reservations");
            }
        }, (err) => {
            console.log("Reservation Connection failed!");
        });
    }
};
ReservationlistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-reservationlist',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\reservationlist\reservationlist.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Reservations</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n <ion-content padding>\n\n <ion-list>\n    <ion-item  *ngFor="let item of dataSet">\n        <ion-label >{{item.columnId_fk}}{{ item.rowId_fk }} : {{ item.Start}} - {{item.End}} </ion-label>\n        <ion-checkbox checked="false"  (ionChange)="onChecked(item.id, $event)"></ion-checkbox>\n    </ion-item>\n\n    <button [disabled]="buttonState()" color="danger" ion-button block (click)="onReserve()"> Cancel Reservation</button>\n\n </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\reservationlist\reservationlist.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], ReservationlistPage);

//# sourceMappingURL=reservationlist.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs_tabs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tenant_welcome_tenant_welcome__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let WelcomePage = class WelcomePage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        if (localStorage.getItem('userData')) {
            const data = JSON.parse(localStorage.getItem('userData'));
            this.userDetails = data.userData;
            console.log(this.userDetails);
            if (this.userDetails.usertype == '1') {
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__tabs_tabs__["a" /* TabsPage */]);
            }
            else if (this.userDetails.usertype == '2') {
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tenant_welcome_tenant_welcome__["a" /* TenantWelcomePage */]);
            }
            // this.navCtrl.setRoot(TabsPage);
        }
        else {
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad WelcomePage');
    }
    gotoSignup() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
    }
    gotoLogin() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__login_login__["a" /* LoginPage */]);
    }
};
WelcomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: 'page-welcome',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\welcome\welcome.html"*/'<ion-content padding text-center id="welcome">\n  <div id="background">\n\n  </div>\n\n  <ion-list>\n      <h1> PARKING SPACE LOCATOR AND RESERVATION SYSTEM WITH VOICE RECOGNITION</h1>\n      <button ion-button block (click)="gotoSignup()" round outline>SignUp </button>\n      <button ion-button block  (click)="gotoLogin()" round outline>Login </button>\n      \n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\welcome\welcome.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */]])
], WelcomePage);

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 130:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 130;

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let apiUrl = "http://ionicspark0123.000webhostapp.com/restapi/api/";
let AuthServiceProvider = class AuthServiceProvider {
    constructor(http) {
        this.http = http;
        console.log('Hello AuthServiceProvider Provider');
    }
    postData(credentials, type) {
        return new Promise((resolve, reject) => {
            let headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            this.http.post(apiUrl + type, JSON.stringify(credentials), { headers: headers }).subscribe(res => {
                resolve(res.json());
            }, (err) => {
                reject(err);
            });
        });
    }
};
AuthServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], AuthServiceProvider);

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-place/add-place.module": [
		287,
		15
	],
	"../pages/login/login.module": [
		288,
		14
	],
	"../pages/map/map.module": [
		292,
		13
	],
	"../pages/notification/notification.module": [
		289,
		12
	],
	"../pages/parking-lot/parking-lot.module": [
		290,
		11
	],
	"../pages/parking-slot/parking-slot.module": [
		294,
		10
	],
	"../pages/profile/profile.module": [
		291,
		9
	],
	"../pages/reservation/reservation.module": [
		297,
		8
	],
	"../pages/reservationlist/reservationlist.module": [
		293,
		7
	],
	"../pages/signup/signup.module": [
		298,
		6
	],
	"../pages/tenant-welcome/tenant-welcome.module": [
		295,
		5
	],
	"../pages/terms/terms.module": [
		296,
		4
	],
	"../pages/topup/topup.module": [
		302,
		3
	],
	"../pages/viewprofile/viewprofile.module": [
		299,
		2
	],
	"../pages/voice/voice.module": [
		300,
		1
	],
	"../pages/welcome/welcome.module": [
		301,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 172;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parking_slot_parking_slot__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_text_to_speech__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__voice_voice__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_speech_recognition__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parking_lot_parking_lot__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










let HomePage = class HomePage {
    constructor(navCtrl, app, authService, http, platform, speechRecognition, cd, tts) {
        this.navCtrl = navCtrl;
        this.app = app;
        this.authService = authService;
        this.http = http;
        this.platform = platform;
        this.speechRecognition = speechRecognition;
        this.cd = cd;
        this.tts = tts;
        this.isRecording = false;
        this.markerPostData = { "user_id": "", "token": "" };
        const data = JSON.parse(localStorage.getItem('userData'));
        this.infoWindows = [];
        this.userDetails = data.userData;
        this.markerPostData.user_id = this.userDetails.user_id;
        this.markerPostData.token = this.userDetails.token;
        console.log(this.userDetails);
    }
    sayText() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.matches.indexOf("hi spark") > -1) {
                    yield this.tts.speak("hello user " + this.userDetails.name);
                }
                else if (this.matches.indexOf("give me a list of pay parking lots") > -1) {
                    yield this.tts.speak("Jadewell Pay Parking, Porta Vaga, SM and more");
                }
                else if (this.matches.indexOf("are there available reservations") > -1) {
                    yield this.tts.speak("Yes, there is.");
                }
                else if (this.matches.indexOf("how much is the rate in jadewell" || "how much is the rate in jade well") > -1) {
                    yield this.tts.speak("The rate is 35 pesos per hour.");
                }
                else if (this.matches.indexOf("show me the list of parking slots") > -1) {
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__parking_slot_parking_slot__["a" /* ParkingSlotPage */]);
                }
                else if (parseInt(this.matches[0])) {
                }
                else {
                    yield this.tts.speak("Sorry, didn't get that");
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    startListening() {
        let options = {
            language: 'en-US'
        };
        this.speechRecognition.startListening(options).subscribe(matches => {
            this.matches = matches;
            this.cd.detectChanges();
            this.sayText();
        });
        this.isRecording = true;
    }
    stopListening() {
        this.speechRecognition.stopListening().then(() => {
            this.isRecording = false;
        });
    }
    getPermission() {
        this.speechRecognition.hasPermission().then((hasPermission) => {
            if (!hasPermission) {
                this.speechRecognition.requestPermission();
            }
        });
    }
    isIos() {
        return this.platform.is('ios');
    }
    ionViewWillEnter() {
        this.displayGoogleMap();
        this.getMarkers();
    }
    displayGoogleMap() {
        let latLng = new google.maps.LatLng(16.41255645, 120.59491254);
        let mapOptions = {
            center: latLng,
            disableDefaultUI: true,
            zoom: 19,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    }
    getMarkers() {
        this.authService.postData(this.markerPostData, "getMarkers").then((result) => {
            this.responseData = result;
            if (this.responseData.markersData) {
                console.log(this.responseData.markersData);
                this.markerData = this.responseData.markersData;
                this.addMarkersToMap(this.markerData);
            }
            else {
                console.log("Error");
            }
        }, (err) => {
            console.log("Cant get markers !");
        });
        // this.http.get('assets/data/markers.json')
        // .map((res) => res.json())
        // .subscribe(data => {
        //   this.addMarkersToMap(data);
        // });
    }
    addMarkersToMap(markers) {
        for (let marker of markers) {
            var position = new google.maps.LatLng(marker.lat, marker.lng);
            var dogwalkMarker = new google.maps.Marker({
                position: position,
                title: markers.name,
                icon: 'assets/images/spacemarker.png'
            });
            dogwalkMarker.setMap(this.map);
            this.addInfoWindowToMarker(dogwalkMarker, marker);
        }
    }
    addInfoWindowToMarker(dogMarker, markers) {
        var infoWindowContent = '<center><div id="content" ><h5>' + markers.name + ' -  ₱' + markers.price + '/hr</h5><p>' + markers.address + '</p> <a href="#" id="parking_lot">Check Parking Lot? </a></div>';
        var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });
        dogMarker.addListener('click', () => {
            this.closeAllInfoWindows();
            infoWindow.open(this.map, dogMarker);
        });
        this.infoWindows.push(infoWindow);
        google.maps.event.addListener(infoWindow, 'domready', () => {
            //now my elements are ready for dom manipulation
            var clickableItem = document.getElementById('parking_lot');
            clickableItem.addEventListener('click', () => {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__parking_lot_parking_lot__["a" /* ParkingLotPage */]);
            });
        });
    }
    closeAllInfoWindows() {
        for (let window of this.infoWindows) {
            window.close();
        }
    }
    gotoVoice() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__voice_voice__["a" /* VoicePage */]);
    }
    gotoSlot() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__parking_lot_parking_lot__["a" /* ParkingLotPage */]);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["_14" /* ViewChild */])('mapContainer'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6__angular_core__["u" /* ElementRef */])
], HomePage.prototype, "mapContainer", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar [color]="isRecording ? \'danger\' : \'primary\'">\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>Home</ion-title>\n    <ion-buttons end>\n\n        <button ion-button icon-only (click)="startListening()">\n            <ion-icon name="mic" ></ion-icon>\n          </button>\n          <!-- <button ion-button (click)="gotoVoice()"> V.Test</button> -->\n          <!-- <button ion-button (click)="gotoSlot()"> Reserve</button> -->\n          <!-- <button ion-button (click)="stopListening()" *ngIf="isIos()" >Stop</button> -->\n    </ion-buttons>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n   \n    <div #mapContainer id="map"></div>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_speech_recognition__["a" /* SpeechRecognition */], __WEBPACK_IMPORTED_MODULE_6__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_text_to_speech__["a" /* TextToSpeech */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplitpaneProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let SplitpaneProvider = class SplitpaneProvider {
    constructor(platform) {
        this.platform = platform;
        console.log('Hello SplitpaneProvider Provider');
        this.splitPaneState = false;
    }
    getSplitPane() {
        if (localStorage.getItem('userData')) {
            if (this.platform.width() > 850) {
                this.splitPaneState = true;
            }
            else {
                this.splitPaneState = false;
            }
        }
        else {
            this.splitPaneState = false;
        }
        return this.splitPaneState;
    }
};
SplitpaneProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
], SplitpaneProvider);

//# sourceMappingURL=splitpane.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(239);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_add_place_add_place__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_tenant_welcome_tenant_welcome__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_topup_topup__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_reservationlist_reservationlist__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_voice_voice__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_parking_slot_parking_slot__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_parking_lot_parking_lot__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_viewprofile_viewprofile__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_reservation_reservation__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_map_map__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_notification_notification__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_welcome_welcome__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_signup_signup__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_login_login__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__app_component__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_home_home__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_tabs_tabs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_splash_screen__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_auth_service_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_splitpane_splitpane__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_speech_recognition__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_text_to_speech__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_geolocation__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_google_maps__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_terms_terms__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};































let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_15__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_18__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_notification_notification__["a" /* NotificationPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_reservation_reservation__["a" /* ReservationPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_viewprofile_viewprofile__["a" /* ViewprofilePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_parking_lot_parking_lot__["a" /* ParkingLotPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_parking_slot_parking_slot__["a" /* ParkingSlotPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_voice_voice__["a" /* VoicePage */],
            __WEBPACK_IMPORTED_MODULE_3__pages_reservationlist_reservationlist__["a" /* ReservationlistPage */],
            __WEBPACK_IMPORTED_MODULE_2__pages_topup_topup__["a" /* TopupPage */],
            __WEBPACK_IMPORTED_MODULE_1__pages_tenant_welcome_tenant_welcome__["a" /* TenantWelcomePage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_add_place_add_place__["a" /* AddPlacePage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_terms_terms__["a" /* TermsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_19__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_18__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/add-place/add-place.module#AddPlacePageModule', name: 'AddPlacePage', segment: 'add-place', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/notification/notification.module#NotificationPageModule', name: 'NotificationPage', segment: 'notification', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/parking-lot/parking-lot.module#ParkingLotPageModule', name: 'ParkingLotPage', segment: 'parking-lot', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/map/map.module#MapPageModule', name: 'MapPage', segment: 'map', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/reservationlist/reservationlist.module#ReservationlistPageModule', name: 'ReservationlistPage', segment: 'reservationlist', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/parking-slot/parking-slot.module#ParkingSlotPageModule', name: 'ParkingSlotPage', segment: 'parking-slot', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/tenant-welcome/tenant-welcome.module#TenantWelcomePageModule', name: 'TenantWelcomePage', segment: 'tenant-welcome', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/terms/terms.module#TermsPageModule', name: 'TermsPage', segment: 'terms', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/reservation/reservation.module#ReservationPageModule', name: 'ReservationPage', segment: 'reservation', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/viewprofile/viewprofile.module#ViewprofilePageModule', name: 'ViewprofilePage', segment: 'viewprofile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/voice/voice.module#VoicePageModule', name: 'VoicePage', segment: 'voice', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/topup/topup.module#TopupPageModule', name: 'TopupPage', segment: 'topup', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_17_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_18__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_notification_notification__["a" /* NotificationPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_reservation_reservation__["a" /* ReservationPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_viewprofile_viewprofile__["a" /* ViewprofilePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_parking_lot_parking_lot__["a" /* ParkingLotPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_parking_slot_parking_slot__["a" /* ParkingSlotPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_voice_voice__["a" /* VoicePage */],
            __WEBPACK_IMPORTED_MODULE_3__pages_reservationlist_reservationlist__["a" /* ReservationlistPage */],
            __WEBPACK_IMPORTED_MODULE_2__pages_topup_topup__["a" /* TopupPage */],
            __WEBPACK_IMPORTED_MODULE_1__pages_tenant_welcome_tenant_welcome__["a" /* TenantWelcomePage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_add_place_add_place__["a" /* AddPlacePage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_terms_terms__["a" /* TermsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_15__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_24__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_26__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
            __WEBPACK_IMPORTED_MODULE_27__ionic_native_text_to_speech__["a" /* TextToSpeech */],
            __WEBPACK_IMPORTED_MODULE_25__providers_splitpane_splitpane__["a" /* SplitpaneProvider */],
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_google_maps__["a" /* GoogleMaps */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_topup_topup__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_reservationlist_reservationlist__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_notification_notification__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_profile_profile__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_splitpane_splitpane__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(219);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










let MyApp = class MyApp {
    constructor(platform, statusBar, splashScreen, splitPane, app, menuCtrl, alertCtrl) {
        this.splitPane = splitPane;
        this.app = app;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */];
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (localStorage.getItem('userData')) {
                const data = JSON.parse(localStorage.getItem('userData'));
                this.userDetails = data.userData;
                this.usertype = this.userDetails.usertype;
            }
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    backToWelcome() {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */]);
        this.nav.popToRoot();
    }
    onLoadProfile() {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__pages_profile_profile__["a" /* ProfilePage */]);
        this.menuCtrl.close();
    }
    onLoadNotifications() {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__pages_notification_notification__["a" /* NotificationPage */]);
        this.menuCtrl.close();
    }
    onLoadReservations() {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_1__pages_reservationlist_reservationlist__["a" /* ReservationlistPage */]);
        this.menuCtrl.close();
    }
    onLoadTopUp() {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_0__pages_topup_topup__["a" /* TopupPage */]);
        this.menuCtrl.close();
    }
    onSignout() {
        const alert = this.alertCtrl.create({
            title: 'Alert:',
            message: 'Are you sure you want to sign out?',
            buttons: [{
                    text: 'Yes',
                    handler: () => {
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
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["_14" /* ViewChild */])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["i" /* NavController */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\app\app.html"*/'<!-- <ion-nav [root]="rootPage"></ion-nav> -->\n\n<ion-split-pane [when]="splitPane.getSplitPane()">\n    <ion-menu [content]="content">\n        <ion-header>\n            <ion-toolbar class="menuheader" color="primary">\n                <ion-title class="headertitle">DASHBOARD</ion-title>\n            </ion-toolbar>\n        </ion-header>\n        <ion-content>\n            <ion-list no-lines>\n                <ion-item  (click)="onLoadProfile()">\n                    <ion-icon name="person" item-left icon-only></ion-icon>\n                    Profile\n                </ion-item>\n                <ion-item (click)="onLoadReservations()">\n                    <ion-icon name="book" item-left icon-only></ion-icon>\n                    Reservations\n                </ion-item>\n                <ion-item (click)="onLoadNotifications()">\n                    <ion-icon name="mail" item-left icon-only></ion-icon>\n                    Notifications\n                </ion-item>\n                <ion-item  (click)="onLoadTopUp()">\n                    <ion-icon name="card" item-left icon-only></ion-icon>\n                    Top Up\n                </ion-item>\n                <ion-item (click)="onSignout()">\n                    <ion-icon name="log-out" item-left icon-only></ion-icon>\n                    Sign-out\n                </ion-item>\n            </ion-list>\n        </ion-content>\n    </ion-menu>\n\n\n    <ion-nav [root]="rootPage" main #content></ion-nav>\n</ion-split-pane>'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__providers_splitpane_splitpane__["a" /* SplitpaneProvider */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["a" /* AlertController */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TenantWelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add_place_add_place__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let TenantWelcomePage = class TenantWelcomePage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.addPlacePage = __WEBPACK_IMPORTED_MODULE_0__add_place_add_place__["a" /* AddPlacePage */];
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad TenantWelcomePage');
    }
};
TenantWelcomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-tenant-welcome',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\tenant-welcome\tenant-welcome.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-buttons end>\n        <button ion-button icon-only [navPush]="addPlacePage">\n          <ion-icon name="add"></ion-icon>\n        </button>\n      </ion-buttons>\n    <ion-title>Tenant</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\tenant-welcome\tenant-welcome.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */]])
], TenantWelcomePage);

//# sourceMappingURL=tenant-welcome.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParkingSlotPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reservation_reservation__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let ParkingSlotPage = class ParkingSlotPage {
    constructor(navCtrl, navParams, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.userPostData = { "user_id": "", "token": "" };
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ParkingSlotPage');
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.userPostData.user_id = this.userDetails.user_id;
        this.userPostData.token = this.userDetails.token;
        this.getSlots();
    }
    gotoReservation(slot) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__reservation_reservation__["a" /* ReservationPage */], { slot });
    }
    getSlots() {
        this.authService.postData(this.userPostData, "parkingSlots").then((result) => {
            this.responseData = result;
            if (this.responseData.slotsData) {
                this.slotsSet = this.responseData.slotsData;
                console.log(this.slotsSet);
            }
            else {
                console.log("No slots");
            }
        }, (err) => {
            console.log("Slot Connection failed!");
        });
    }
};
ParkingSlotPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: 'page-parking-slot',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\parking-slot\parking-slot.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Parking Slots</ion-title>\n    <ion-buttons end>\n      \n              <button ion-button icon-only (click)="startListening()">\n                  <ion-icon name="mic" ></ion-icon>\n                </button>\n          </ion-buttons>\n          \n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  \n  <ion-grid > \n    <div *ngIf="slotsSet">\n    <ion-row *ngFor="let slot of slotsSet">\n      <ion-col>\n          <button ion-button block outline *ngIf="slot.columnId == \'A\'" class="rowz" (click)="gotoReservation(slot)">{{slot.columnId}}{{slot.rowId}} </button>\n      </ion-col>\n       <ion-col >\n          <button ion-button block outline *ngIf="slot.columnId == \'B\'" class="row2" (click)="gotoReservation(slot)">{{slot.columnId}}{{slot.rowId}}  </button>\n      </ion-col>\n      <ion-col  >\n          <button ion-button block outline *ngIf="slot.columnId == \'C\'" class="row3" (click)="gotoReservation(slot)">{{slot.columnId}}{{slot.rowId}}</button>\n      </ion-col>\n      <ion-col >\n          <button ion-button  block  outline *ngIf="slot.columnId == \'D\'" class="row4" (click)="gotoReservation(slot)">{{slot.columnId}}{{slot.rowId}} </button>\n      </ion-col> \n    </ion-row>\n  </div>\n  </ion-grid>\n  <ion-list>\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\parking-slot\parking-slot.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
], ParkingSlotPage);

//# sourceMappingURL=parking-slot.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_profile__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { AboutPage } from '../about/about';

let TabsPage = class TabsPage {
    constructor() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        // tab2Root = AboutPage;
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_0__profile_profile__["a" /* ProfilePage */];
    }
};
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  \n  <ion-tab [root]="tab3Root"  tabIcon="person" tabTitle="Account"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tenant_welcome_tenant_welcome__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__signup_signup__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let LoginPage = class LoginPage {
    constructor(navCtrl, authService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.toastCtrl = toastCtrl;
        this.userData = { "username": "", "password": "" };
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }
    onSignin() {
        if (this.userData.username && this.userData.password) {
            this.authService.postData(this.userData, "login").then((result) => {
                this.responseData = result;
                console.log(this.responseData);
                if (this.responseData.userData) {
                    localStorage.setItem('userData', JSON.stringify(this.responseData));
                    if (this.responseData.userData.usertype == '1') {
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
                    }
                    else if (this.responseData.userData.usertype == '2') {
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__tenant_welcome_tenant_welcome__["a" /* TenantWelcomePage */]);
                    }
                }
                else {
                    this.presentToast("Please give valid username and password!");
                }
            }, (err) => {
                console.log("Connection failed!");
            });
        }
        else {
            this.presentToast("Missing username or password!");
        }
    }
    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 3000
        });
        toast.present();
    }
    gotoSignup() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__signup_signup__["a" /* SignupPage */]);
    }
};
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\login\login.html"*/'\n\n<ion-content padding>\n    <ion-list class="list">\n      <h1 text-center>Login</h1>\n        <ion-item>\n          <ion-label floating>Username</ion-label>\n          <ion-input type="text" value="" [(ngModel)]="userData.username"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Password</ion-label>\n          <ion-input type="password" [(ngModel)]="userData.password"></ion-input>\n        </ion-item>\n        <button ion-button block round outline (click)="onSignin()">Sign-in</button>\n        <button ion-button block round outline (click)="gotoSignup()">Sign-up</button>\n      </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* ToastController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__terms_terms__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tenant_welcome_tenant_welcome__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let SignupPage = class SignupPage {
    constructor(navCtrl, navParams, authService, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.submitAttempt = false;
        this.userData = { "username": "", "usertype": "", "password": "", "email": "", "name": "", "phone_number": "", "plate_number": "" };
        this.validateForm = formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]*'), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]*'), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].required])],
            name: ['', __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].required])],
            email: ['', __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]+@[a-z0-9.-]+\.[a-z]{2,3}$'), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].required])],
            phone_number: ['', __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].maxLength(12), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]*'), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].required])], plate_number: ['', __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].maxLength(12), __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]*')])],
        });
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }
    login() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    }
    onSignup() {
        if (this.selectOption == 'rentor') {
            this.userData.usertype = '1';
        }
        else if (this.selectOption == 'tenant') {
            this.userData.usertype = '2';
        }
        this.submitAttempt = true;
        console.log(this.userData);
        if (this.validateForm.valid) {
            this.authService.postData(this.userData, "signup").then((result) => {
                this.responseData = result;
                console.log(this.responseData);
                localStorage.setItem('userData', JSON.stringify(this.responseData));
                if (this.responseData.userData.usertype == '1') {
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
                }
                else if (this.responseData.userData.usertype == '2') {
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__tenant_welcome_tenant_welcome__["a" /* TenantWelcomePage */]);
                }
            }, (err) => {
                console.log("Connection failed!");
            });
        }
        else {
            console.log("Error: Invalid Input");
        }
    }
    showTerms() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__terms_terms__["a" /* TermsPage */]);
    }
};
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["n" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\signup\signup.html"*/'<ion-content padding id="signup" text-center>\n  <h2>Sign Up</h2>\n  <ion-item>\n    <ion-label>Account Type</ion-label>\n    <ion-select [(ngModel)]="selectOption">\n      <ion-option value="rentor">Rentor</ion-option>\n      <ion-option value="tenant">Tenant</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <div *ngIf="selectOption == \'rentor\'">\n\n    <p *ngIf="submitAttempt">Please fill out all details accurately.</p>\n    <form (ngSubmit)="onSignup()" [formGroup]="validateForm">\n\n      <ion-list>\n        <ion-item>\n          <ion-label floating>Name</ion-label>\n          <ion-input type="text" formControlName="name" [(ngModel)]="userData.name"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!validateForm.controls.name.valid  && (validateForm.controls.name.dirty || submitAttempt)">\n          <p>Please enter a valid name.</p>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Email</ion-label>\n          <ion-input type="text" formControlName="email" [(ngModel)]="userData.email"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!validateForm.controls.email.valid  && (validateForm.controls.email.dirty || submitAttempt)">\n          <p>Please enter a valid email.</p>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Username</ion-label>\n          <ion-input type="text" formControlName="username" [(ngModel)]="userData.username"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!validateForm.controls.username.valid  && (validateForm.controls.username.dirty || submitAttempt)">\n          <p>Please enter a valid username.</p>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Password</ion-label>\n          <ion-input type="password" formControlName="password" [(ngModel)]="userData.password"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!validateForm.controls.password.valid  && (validateForm.controls.password.dirty || submitAttempt)">\n          <p>Please enter a valid password.</p>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Phone</ion-label>\n          <ion-input type="text" formControlName="phone_number" [(ngModel)]="userData.phone_number"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!validateForm.controls.phone_number.valid  && (validateForm.controls.phone_number.dirty || submitAttempt)">\n          <p>Please enter a valid phone number.</p>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Plate Number</ion-label>\n          <ion-input type="text" formControlName="plate_number" [(ngModel)]="userData.plate_number"></ion-input>\n        </ion-item>\n        <!-- <ion-item *ngIf="!validateForm.controls.plate_number.valid  && (validateForm.controls.plate_number.dirty || submitAttempt)">\n      <p>Please enter a valid plate number.</p>\n  </ion-item> -->\n        <ion-item text-center>\n          <h5 color="primary" (click)="showTerms()"> Terms and Conditions</h5>\n\n        </ion-item>\n        <ion-item>\n          <ion-label> I agree</ion-label>\n          <ion-checkbox color="blue" checked="false"></ion-checkbox>\n        </ion-item>\n        <button ion-button block round outline color="primary" type="submit">Signup </button>\n        <button ion-button block (click)="login()" round outline>Login </button>\n      </ion-list>\n\n    </form>\n\n  </div>\n  <div *ngIf="selectOption == \'tenant\'">\n\n\n    <p *ngIf="submitAttempt">Please fill out all details accurately.</p>\n    <form (ngSubmit)="onSignup()" [formGroup]="validateForm">\n\n      <ion-list>\n        <ion-item>\n          <ion-label floating>Name</ion-label>\n          <ion-input type="text" formControlName="name" [(ngModel)]="userData.name"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!validateForm.controls.name.valid  && (validateForm.controls.name.dirty || submitAttempt)">\n          <p>Please enter a valid name.</p>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Email</ion-label>\n          <ion-input type="text" formControlName="email" [(ngModel)]="userData.email"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!validateForm.controls.email.valid  && (validateForm.controls.email.dirty || submitAttempt)">\n          <p>Please enter a valid email.</p>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Username</ion-label>\n          <ion-input type="text" formControlName="username" [(ngModel)]="userData.username"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!validateForm.controls.username.valid  && (validateForm.controls.username.dirty || submitAttempt)">\n          <p>Please enter a valid username.</p>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Password</ion-label>\n          <ion-input type="password" formControlName="password" [(ngModel)]="userData.password"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!validateForm.controls.password.valid  && (validateForm.controls.password.dirty || submitAttempt)">\n          <p>Please enter a valid password.</p>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Phone</ion-label>\n          <ion-input type="text" formControlName="phone_number" [(ngModel)]="userData.phone_number"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!validateForm.controls.phone_number.valid  && (validateForm.controls.phone_number.dirty || submitAttempt)">\n          <p>Please enter a valid phone number.</p>\n        </ion-item>\n        <ion-item text-center>\n          <h5 color="primary" (click)="showTerms()"> Terms and Conditions</h5>\n\n        </ion-item>\n        <ion-item>\n          <ion-label> I agree</ion-label>\n          <ion-checkbox color="blue" checked="false"></ion-checkbox>\n        </ion-item>\n        <button ion-button block round outline color="primary" type="submit">Signup </button>\n        <button ion-button block (click)="login()" round outline>Login </button>\n      </ion-list>\n\n    </form>\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\signup\signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormBuilder */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__topup_topup__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__viewprofile_viewprofile__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let ProfilePage = class ProfilePage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePage');
    }
    viewProfile() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__viewprofile_viewprofile__["a" /* ViewprofilePage */]);
    }
    gotoTopUp() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__topup_topup__["a" /* TopupPage */]);
    }
};
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: 'page-profile',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\profile\profile.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>Account</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  \n  <ion-list>\n    <button ion-item (click)="viewProfile()">View Profile Information </button>\n    <button ion-item (click)="gotoTopUp()"> Top Up</button>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\profile\profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the TopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let TopupPage = class TopupPage {
    constructor(navCtrl, navParams, authService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.toastCtrl = toastCtrl;
        this.topupPostData = { "user_id": "", "token": "", "code": "" };
        this.userPostData = { "user_id": "", "token": "" };
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.topupPostData.user_id = this.userDetails.user_id;
        this.topupPostData.token = this.userDetails.token;
        this.userPostData.user_id = this.userDetails.user_id;
        this.userPostData.token = this.userDetails.token;
        this.isClicked = false;
        this.getBalance();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad TopupPage');
    }
    topup() {
        this.isClicked = true;
        this.authService.postData(this.topupPostData, "topup").then((result) => {
            this.responseData = result;
            if (this.responseData.TopupData) {
                this.topupDataSet = this.responseData.TopupData;
                console.log(this.topupDataSet);
                this.isClicked = true;
                this.getBalance();
            }
            else {
                console.log("Topup error");
            }
        }, (err) => {
            console.log("Topup Connection failed!");
        });
    }
    onSubmit() {
        this.topupPostData.code = this.code;
        console.log(this.topupPostData);
        this.topup();
        this.presentToast(this.topupDataSet);
    }
    getBalance() {
        this.authService.postData(this.userPostData, "getBalance").then((result) => {
            this.responsesData = result;
            if (this.responsesData.balanceData) {
                this.balanceDataSet = this.responsesData.balanceData;
                JSON.stringify(this.balanceDataSet);
                console.log(this.balanceDataSet);
            }
            else {
                console.log("No Balance");
            }
        }, (err) => {
            console.log("Notification Connection failed!");
        });
    }
    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 1000
        });
        toast.present();
    }
};
TopupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-topup',template:/*ion-inline-start:"C:\Users\user\Desktop\School\spark\spark\src\pages\topup\topup.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title >Top Up</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list class="list">\n      <ion-item *ngFor="let balance of balanceDataSet">\n        \n        <p>Your Balance: ₱ {{ balance.balance }}</p>\n      </ion-item>  \n\n          <ion-item>\n            <ion-label floating>Code</ion-label>\n            <ion-input type="text" value="" [(ngModel)]="code"></ion-input>\n          </ion-item>\n        \n          <button ion-button block   (click)="onSubmit()">Submit</button>\n          <ion-item color="seconday" *ngIf="isClicked">\n            <p> You have successfully topped up!</p>\n            \n          </ion-item>\n        </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\user\Desktop\School\spark\spark\src\pages\topup\topup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */]])
], TopupPage);

//# sourceMappingURL=topup.js.map

/***/ })

},[220]);
//# sourceMappingURL=main.js.map