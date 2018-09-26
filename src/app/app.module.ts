import { AddPlacePage } from './../pages/add-place/add-place';
import { TenantWelcomePage } from './../pages/tenant-welcome/tenant-welcome';

import { TopupPage } from './../pages/topup/topup';
import { ReservationlistPage } from './../pages/reservationlist/reservationlist';
import { VoicePage } from './../pages/voice/voice';

import { ParkingSlotPage } from './../pages/parking-slot/parking-slot';
import { ParkingLotPage } from './../pages/parking-lot/parking-lot';
import { ViewprofilePage } from './../pages/viewprofile/viewprofile';
import { ReservationPage } from './../pages/reservation/reservation';
import { MapPage } from './../pages/map/map';
import { NotificationPage } from './../pages/notification/notification';
import { ProfilePage } from './../pages/profile/profile';
import { WelcomePage } from './../pages/welcome/welcome';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';


import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SplitpaneProvider } from '../providers/splitpane/splitpane';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { TermsPage } from '../pages/terms/terms';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    WelcomePage,
    ProfilePage,
    NotificationPage,
    MapPage,
    ReservationPage,
    ViewprofilePage,
    ParkingLotPage,
    ParkingSlotPage,
    VoicePage,
    ReservationlistPage,
    TopupPage,
    TenantWelcomePage,
    AddPlacePage,
    TermsPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    WelcomePage,
    ProfilePage,
    NotificationPage,
    MapPage,
    ReservationPage,
    ViewprofilePage,
    ParkingLotPage,
    ParkingSlotPage,
    VoicePage,
    ReservationlistPage,
    TopupPage,
    TenantWelcomePage,
    AddPlacePage,
    TermsPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    SpeechRecognition,
    TextToSpeech,
    SplitpaneProvider,
    Geolocation,
    GoogleMaps
  ]
})
export class AppModule {}
