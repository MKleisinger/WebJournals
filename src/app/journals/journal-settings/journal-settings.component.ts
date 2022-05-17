import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Journal } from 'src/app/models/journal';
import { JournalBullet } from 'src/app/models/journal-bullet';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-journal-settings',
  templateUrl: './journal-settings.component.html',
  styleUrls: ['./journal-settings.component.css']
})
export class JournalSettingsComponent implements OnInit {

  constructor(private journalService: JournalService, private router: Router) { }

  addIcon = faPlus;

  journal: Journal = {
    id: "",
    title: "",
    subject: "",
    bullets: []
  };

  ngOnInit(): void {
  }

  onBulletAdd(): void {
    const bullet: JournalBullet = { label: "New Bullet" };
    this.journal.bullets.push(bullet)
  }

  removeBullet(bullet: JournalBullet): void {
    const bulletIndex = this.journal.bullets.indexOf(bullet);
    this.journal.bullets.splice(bulletIndex, 1)
  }

  onSettingsComplete(): void {
    console.log("fired settings complete");
    this.journalService.addJournal(this.journal).subscribe(result => {
      this.router.navigate([`journals/${result.id}`]);
    });
  }
}
