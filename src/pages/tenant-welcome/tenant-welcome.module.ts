import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TenantWelcomePage } from './tenant-welcome';

@NgModule({
  declarations: [
    TenantWelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(TenantWelcomePage),
  ],
})
export class TenantWelcomePageModule {}
