import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Journal } from '../models/journal';
import { JournalEntry } from '../models/journal-entry';

@Injectable({
  providedIn: 'root'
})
export class JournalApiService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl: string = "http://localhost:5000/";
  private journalRoute: string = `${this.baseUrl}journals/`;
  private entriesRoute: string = `${this.baseUrl}entries/`;

  private get httpHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
  }

  private httpOptions(requestParameters: HttpParams): object {
    console.log(this.httpHeaders);
    return {
      headers: this.httpHeaders,
      responseType: 'json',
      params: requestParameters ?? null
    }
  }

  getAllJournals() : Observable<Journal[]> {
    return this.httpClient.get<Journal[]>(this.journalRoute, this.httpOptions(new HttpParams()))
      .pipe(
        catchError(this.handleError)
      );
  }

  getJournalByID(journalID: string) : Observable<Journal> {
    const httpParams = new HttpParams().set('id', journalID);
    return this.httpClient.get<Journal>(this.journalRoute, this.httpOptions(httpParams));
  }

  createJournal(journal: Journal) : Observable<Journal> {
    return this.httpClient.post<Journal>(this.journalRoute, journal, this.httpOptions(new HttpParams()));
  }

  updateJournal(journal: Journal) : Observable<Journal> {
    console.log("calling backend update");
    console.log(JSON.stringify(journal));
    return this.httpClient.put<Journal>(this.journalRoute, journal, this.httpOptions(new HttpParams()));
  }

  deleteJournal(journalID: string) : void {
    const httpParams = new HttpParams().set('id', journalID);
    this.httpClient.delete(this.journalRoute, this.httpOptions(httpParams));
  }

  getJournalEntries(journalId: string) : Observable<JournalEntry[]> {
    const httpParams = new HttpParams().set("journalId", journalId);
    return this.httpClient.get<JournalEntry[]>(this.entriesRoute, this.httpOptions(httpParams));
  }

  createJournalEntry(journalEntry: JournalEntry) : Observable<JournalEntry> {
    return this.httpClient.post<JournalEntry>(this.entriesRoute, journalEntry, this.httpOptions(new HttpParams()));
  }

  updateJournalEntry(journalEntry: JournalEntry) : Observable<JournalEntry> {
    return this.httpClient.put<JournalEntry>(this.entriesRoute, journalEntry, this.httpOptions(new HttpParams()));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "";
    if(errorResponse.error instanceof ErrorEvent) {
      errorMessage = `A client side error occurred: ${errorResponse.error.message}`;
    }
    else {
      errorMessage = `A server side error occurred. Status Code ${errorResponse.status} : ${errorResponse.message}`;
    }

    return throwError(() => errorMessage);
  }
}
