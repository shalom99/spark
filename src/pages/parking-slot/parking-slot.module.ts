import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingSlotPage } from './parking-slot';

@NgModule({
  declarations: [
    ParkingSlotPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkingSlotPage),
  ],
})
export class ParkingSlotPageModule {}
