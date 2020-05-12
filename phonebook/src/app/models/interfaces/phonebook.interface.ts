import { Entry } from './entry.interface';

export interface Phonebook {
    id: number;
    name: string;
    entries: Entry[];
}
