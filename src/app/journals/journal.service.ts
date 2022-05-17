import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable, throwError, finalize, of, from, EMPTY, BehaviorSubject } from 'rxjs';
import { catchError, map, mergeMap, retry, shareReplay, take, tap } from 'rxjs/operators';
import { Journal } from '../models/journal';
import { JournalApiService } from '../api/journal-api.service';
import { Statement } from '@angular/compiler';
import { JournalEntry } from '../models/journal-entry';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private journalApi: JournalApiService) {

  }

  private journalsRefresh = new BehaviorSubject<void>(undefined);
  public journals$: Observable<Journal[]> = this.journalsRefresh
    .pipe(
      mergeMap(() => this.journalApi.getAllJournals()),
      shareReplay(1)
    );

  public addJournal(journal: Journal): Observable<Journal> {
    return this.journalApi.createJournal(journal)
      .pipe(
        tap(() => this.journalsRefresh.next())
      );
  }

  public getJournal(journalID: string) : Observable<Journal> {
    return this.journals$
      .pipe(
        map(journals => journals.find(j => j.id === journalID) as Journal),
        tap(results => console.log(results))
      )
  }

  public updateJournal(journal: Journal) : void {
    this.journalApi.updateJournal(journal).subscribe({
      next: () => this.journalsRefresh.next(),
      error: (err) => console.log(err),
      complete: () => console.log("completed")
    });
  }

  private journalEntriesRefresh = new BehaviorSubject<void>(undefined);
  public getJournalEntries(journalId: string) : Observable<JournalEntry[]> {
    let entries$ = this.journalEntriesRefresh
      .pipe(
        mergeMap(() => this.journalApi.getJournalEntries(journalId)),
        shareReplay(1)
      );

    return entries$;
  }

  public addJournalEntry(journalEntry: JournalEntry) : void {
    if(!journalEntry.id) {
      this.journalApi.createJournalEntry(journalEntry).subscribe({
        next: () => this.journalEntriesRefresh.next(),
        error: (err) => console.log(err),
        complete: () => console.log("completed")
      });
    }
    else {
      this.journalApi.updateJournalEntry(journalEntry).subscribe({
        next: () => this.journalEntriesRefresh.next(),
        error: (err) => console.log(err),
        complete: () => console.log("completed")
      });
    }
  }
}
