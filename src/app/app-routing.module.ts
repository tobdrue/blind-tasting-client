import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BeerSelectionComponent} from './beer-selection/beer-selection.component';
import {UploadNewBeerComponent} from './upload-new-beer/upload-new-beer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'beer-selection', component: BeerSelectionComponent},
  {path: 'new-beer', component: UploadNewBeerComponent},
  {path: '*', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
