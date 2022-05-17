import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faArrowRight, faArrowLeft, IconDefinition, faBook } from '@fortawesome/free-solid-svg-icons'
import { Journal } from 'src/app/models/journal';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-journal-manager',
  templateUrl: './journal-manager.component.html',
  styleUrls: ['./journal-manager.component.css']
})
export class JournalManagerComponent implements OnInit {

  constructor(
    public journalService: JournalService,
    private router: Router
  ) { }

  drawerIcon!: IconDefinition;
  faPlus = faPlus;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  faBook = faBook;
  journals: Journal[] = [];

  ngOnInit() {
    this.drawerIcon = faArrowRight;
    this.journalService.journals$
      .subscribe(data => {
        this.journals = data;
      });
  }

  onDrawerHide() {
    this.drawerIcon = faArrowRight;
  }

  onDrawerShow() {
    this.drawerIcon = faArrowLeft;
  }

  onJournalClicked(journalId: string): void {
    console.log(`JournalID: ${journalId} clicked`);
    this.router.navigate([`journals/${journalId}`]);
  }
}
