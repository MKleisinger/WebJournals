import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalSettingsComponent } from './journal-settings/journal-settings.component';

const routes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalsRoutingModule { }
