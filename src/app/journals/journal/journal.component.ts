import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Journal } from 'src/app/models/journal';
import { JournalEntry } from 'src/app/models/journal-entry';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  constructor(
    private journalService: JournalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public journal!: Journal;
  public entries: JournalEntry[] = [];

  ngOnInit(): void {
    // use the journal service to get the journal by id
    const journalID = this.route.snapshot.params['id'];
    this.journal = this.journalService.getJournal(journalID);
  }
}
