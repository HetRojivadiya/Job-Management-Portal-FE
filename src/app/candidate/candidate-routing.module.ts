import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './components/root/root.component'; 
import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ROUTING } from './constants/routes';

const routes: Routes = [
  { 
    path: ROUTING.BASE, 
    component: RootComponent, 
    children: [
      { path: ROUTING.HOME, component: HomeComponent },
      { path: ROUTING.ABOUTUS, component: AboutusComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
