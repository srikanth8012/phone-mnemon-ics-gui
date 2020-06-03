import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PhoneMnemonicsComponent } from './phone-mnemonics/phone-mnemonics.component';

const appRoutes: Routes = [
  { path: 'mnemonics', component: PhoneMnemonicsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
