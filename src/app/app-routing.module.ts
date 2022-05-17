import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalEntryComponent } from './journals/journal-entry/journal-entry.component';
import { JournalManagerComponent } from './journals/journal-manager/journal-manager.component';
import { JournalSettingsComponent } from './journals/journal-settings/journal-settings.component';
import { JournalComponent } from './journals/journal/journal.component';

const routes: Routes = [
  { path : "journals", component : JournalManagerComponent, runGuardsAndResolvers: "always",
    children: [
      { path: "settings", component: JournalSettingsComponent },
      { path: ":id", component: JournalComponent },
      { path: ":id/entry", component: JournalEntryComponent, pathMatch: "full" }
    ]
  },
  { path: "", redirectTo: "/journals", pathMatch: "full" },
  { path: "**", redirectTo: "/journals", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
