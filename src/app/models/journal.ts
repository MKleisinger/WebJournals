import { JournalBullet } from "./journal-bullet";
import { JournalEntry } from "./journal-entry";

export interface Journal {
    name: string;
    subject: string;
    bullets: JournalBullet[];    
    entries: JournalEntry[];
}
