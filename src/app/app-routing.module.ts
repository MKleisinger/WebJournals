import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalEntryComponent } from './journals/journal-entry/journal-entry.component';
import { JournalManagerComponent } from './journals/journal-manager/journal-manager.component';
import { JournalSettingsComponent } from './journals/journal-settings/journal-settings.component';
import { JournalComponent } from './journals/journal/journal.component';

const routes: Routes = [
  { path : "journals", component : JournalManagerComponent,
    children: [
      { path: "settings", component: JournalSettingsComponent },
      { path: "journal/:id", component: JournalComponent },
      { path: "journal/:id/entry", component: JournalEntryComponent, pathMatch: "full" }
    ]
  },
  { path: "", redirectTo: "/journals", pathMatch: "full" },
  { path: "**", redirectTo: "/journals", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
