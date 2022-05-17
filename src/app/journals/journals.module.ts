import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JournalsRoutingModule } from './journals-routing.module';
import { JournalSettingsComponent } from './journal-settings/journal-settings.component';
import { JournalManagerComponent } from './journal-manager/journal-manager.component';
import { FormsModule } from '@angular/forms';
import { JournalComponent } from './journal/journal.component';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    JournalManagerComponent,
    JournalSettingsComponent,
    JournalComponent,
    JournalEntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    JournalsRoutingModule,
  ],
  providers: [
    DatePipe
  ],
  exports: [

  ]
})
export class JournalsModule { }
