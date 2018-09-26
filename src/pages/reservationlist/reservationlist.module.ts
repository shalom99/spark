import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationlistPage } from './reservationlist';

@NgModule({
  declarations: [
    ReservationlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationlistPage),
  ],
})
export class ReservationlistPageModule {}
