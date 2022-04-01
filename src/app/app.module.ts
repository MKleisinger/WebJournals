import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JournalsModule } from './journals/journals.module';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    JournalsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
