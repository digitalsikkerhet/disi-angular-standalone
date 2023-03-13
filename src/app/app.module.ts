import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DemoStandaloneComponent } from "../standalone/components/demo-standalone-component/demo-standalone-component";
import {
    ImageUtilityService,
    TextToImageProperties,
  } from '../standalone/services/image-utility.service';
  

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [ ImageUtilityService ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        DemoStandaloneComponent
    ]
})
export class AppModule { }
