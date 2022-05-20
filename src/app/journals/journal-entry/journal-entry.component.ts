import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, map } from 'rxjs';
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
    private router: Router,
    private datePipe: DatePipe
  ) { }

  public journal!: Journal;
  public entryForm: JournalEntry = {
    id: "",
    journalId: "",
    timeStamp: new Date(),
    tags: [],
    entry: ""
  }

  private baseRoute: string = "./journals";
  private journalRoute: string = this.baseRoute;

  ngOnInit(): void {
    const journalID = this.route.snapshot.params['id'];
    this.journalRoute += `/${journalID}`;
    this.journalService.getJournal(journalID).subscribe(data => {
      this.journal = data;
    });
    this.entryForm.journalId = this.journal.id;

    this.route.queryParams.subscribe(params => {
      if(params['entryId']) {
        let entryId = params['entryId'];
        this.journalService.getJournalEntry(this.journal.id, entryId).subscribe(entry => {
          this.entryForm = entry;
        });
      }
    });

    if(this.entryForm.tags.length == 0) {
      this.journal.bullets?.forEach(bullet => {
        const tag: JournalTag = { bullet: bullet, tag: ""};
        this.entryForm.tags.push(tag);
      });
    }
  }

  public onEntryComplete(): void {
    this.journalService.addJournalEntry(this.entryForm);
    this.router.navigate([this.journalRoute]);
  }

  public onEntryCanceled(): void {
    this.router.navigate([this.journalRoute]);
  }
}
