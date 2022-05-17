import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { Journal } from 'src/app/models/journal';
import { JournalEntry } from 'src/app/models/journal-entry';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnDestroy {
  private navigationSubscription;

  constructor(
    private journalService: JournalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationEnd) {
        this.initialize();
      }
    });
  }

  public journal!: Journal;

  public entries: JournalEntry[] = [];

  initialize() {
    const journalID = this.route.snapshot.params['id'];
    this.journalService.getJournal(journalID).subscribe(data => {
      this.journal = data;
    });

    this.journalService.getJournalEntries(journalID).subscribe(data => {
      this.entries = data;
    });
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
