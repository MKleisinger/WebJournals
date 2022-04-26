import { JournalTag } from "./journal-tag";

export interface JournalEntry {
    timestamp: number;
    tags: JournalTag[];
    entry: string;
}
