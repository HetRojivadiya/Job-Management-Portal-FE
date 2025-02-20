import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { HomeComponent } from './components/home/home.component';
import { SearchSectionComponent } from './components/search-section/search-section.component';
import { CandidateHeaderComponent } from './components/candidate-header/candidate-header.component';
import { SharedModule } from '../shared/shared.module';
import { RootComponent } from './components/root/root.component';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AboutusComponent,
    HerosectionComponent,
    HomeComponent,
    SearchSectionComponent,
    CandidateHeaderComponent,
    RootComponent,
    FilterSidebarComponent,
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
     SharedModule,
     FormsModule
  ]
})
export class CandidateModule { }
