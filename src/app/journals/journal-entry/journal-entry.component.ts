import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Journal } from 'src/app/models/journal';
import { JournalEntry } from 'src/app/models/journal-entry';
import { JournalTag } from 'src/app/models/journal-tag';
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
    const journalID = this.route.snapshot.params['id'];
    this.journalRoute += `/${journalID}`;
    this.journal = this.journalService.getJournal(journalID);

    this.journal.bullets.forEach(bullet => {
      const tag: JournalTag = { bullet: bullet, tag: ""};
      this.entryForm.tags.push(tag);
    });
  }

  public onEntryComplete(): void {
    this.journal.entries.push(this.entryForm);
    this.journalService.updateJournal(this.journal);
    this.router.navigate([this.journalRoute]);
  }

  public onEntryCanceled(): void {
    this.router.navigate([this.journalRoute]);
  }
}
