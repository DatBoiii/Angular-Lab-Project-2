import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { AnimalLabComponent } from './animal-lab/animal-lab.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component'
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnimalSearchComponent } from './animal-search/animal-search.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimalLabComponent,
    MessagesComponent,
    HomepageComponent,
    AnimalLabComponent,
    AnimalDetailComponent,
    DashboardComponent,
    AnimalSearchComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
