import { JournalTag } from "./journal-tag";

export interface JournalEntry {
    id: string;
    journalId: string;
    timeStamp: Date;
    tags: JournalTag[];
    entry: string;
}
