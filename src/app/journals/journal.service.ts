import { Injectable } from '@angular/core';
import { Journal } from '../models/journal';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor() { }

  public journals: Journal[] = [];

  public addJournal(journal: Journal) {
    this.journals.push(journal);
  }

  public getJournal(id: string): Journal {
    const journal = this.journals.find(j => j.name === id);
    if(journal) {
      return journal;
    }
    throw new Error(`JournalID: ${id} not found.`);
  }

  public updateJournal(journal: Journal): void {
    let copy = this.getJournal(journal.name);
    let index = this.journals.findIndex(j => j === copy);

    if(index >= 0) {
      Object.assign(copy, journal);
      this.journals[index] = copy;
    }
    else {
      throw new Error(`Failed to update journal. JournalID: ${journal.name} does not exist.`);
    }
  }
}
