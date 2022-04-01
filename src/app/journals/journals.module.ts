import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JournalsRoutingModule } from './journals-routing.module';
import { JournalSettingsComponent } from './journal-settings/journal-settings.component';
import { JournalManagerComponent } from './journal-manager/journal-manager.component';
import { FormsModule } from '@angular/forms';
import { JournalComponent } from './journal/journal.component';


@NgModule({
  declarations: [
    JournalManagerComponent,
    JournalSettingsComponent,
    JournalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    JournalsRoutingModule
  ],
  exports: [
    
  ]
})
export class JournalsModule { }
