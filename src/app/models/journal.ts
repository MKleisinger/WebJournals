import { JournalBullet } from "./journal-bullet";
import { JournalEntry } from "./journal-entry";

export interface Journal {
    id: string;
    title: string;
    subject: string;
    bullets: JournalBullet[];
}
