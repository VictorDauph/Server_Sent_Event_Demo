import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoServerSentEventsModule } from './demo-server-sent-events/demo-server-sent-events.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DemoServerSentEventsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
