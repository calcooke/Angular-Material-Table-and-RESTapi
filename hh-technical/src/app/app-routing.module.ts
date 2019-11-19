import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JobListingComponent} from './job-listing/job-listing.component';

const routes: Routes = [{path: '', component: JobListingComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
