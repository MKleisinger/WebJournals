import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Journal } from 'src/app/models/journal';
import { JournalEntry } from 'src/app/models/journal-entry';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.css']
})
export class JournalEntryComponent implements OnInit {

  constructor(
    private journalService: JournalService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  public journal!: Journal;
  public entryForm: JournalEntry = { 
    timestamp: Date.now(),
    tags: [],    
    entry: ""
  }

  private baseRoute: string = "./journals/journal";
  private journalRoute: string = this.baseRoute;

  ngOnInit(): void {
    // use the journal service to get the journal by id
    const journalID = this.route.snapshot.params['id'];       
    this.journalRoute += journalID;
    this.journal = this.journalService.getJournal(journalID);

    if(this.journal) {
      Object.assign(this.entryForm, this.journal.entries[0]);
    }
  }

  public onEntryComplete(): void {
    this.journalService.updateJournal(this.journal);
    this.router.navigate([this.journalRoute]);
  }

  public onEntryCanceled(): void {
    this.router.navigate([this.journalRoute]);
  }

}
