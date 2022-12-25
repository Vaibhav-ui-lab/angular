import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CamComponent } from './cam/cam.component';
import { DemoComponent } from './demo/demo.component';
import { BbcComponent } from './bbc/bbc.component';

@NgModule({
  declarations: [
    AppComponent,
    CamComponent,
    DemoComponent,
    BbcComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
