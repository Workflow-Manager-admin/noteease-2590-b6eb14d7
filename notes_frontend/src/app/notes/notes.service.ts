import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Note model.
 */
export interface Note {
  id: number;
  title: string;
  content: string;
  created: Date;
  updated: Date;
}

// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root'
})
/**
 * Simple in-memory Note service.
 * Handles CRUD actions for notes.
 */
export class NotesService {
  private notes: Note[] = [];
  private notes$ = new BehaviorSubject<Note[]>([]);
  private nextId = 1;

  constructor() {
    // Optionally preload with a sample note
    this.createNote('Welcome', 'This is your first note!');
  }

  /**
   * Observable stream of notes.
   */
  // PUBLIC_INTERFACE
  getNotes(): Observable<Note[]> {
    return this.notes$.asObservable();
  }

  // PUBLIC_INTERFACE
  getNoteById(id: number): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  // PUBLIC_INTERFACE
  createNote(title: string, content: string): Note {
    const now = new Date();
    const newNote: Note = {
      id: this.nextId++,
      title: title || 'Untitled',
      content: content || '',
      created: now,
      updated: now
    };
    this.notes = [newNote, ...this.notes];
    this.notes$.next(this.notes);
    return newNote;
  }

  // PUBLIC_INTERFACE
  updateNote(id: number, title: string, content: string): Note | undefined {
    const note = this.getNoteById(id);
    if (note) {
      note.title = title;
      note.content = content;
      note.updated = new Date();
      this.notes$.next(this.notes);
      return note;
    }
    return undefined;
  }

  // PUBLIC_INTERFACE
  deleteNote(id: number): void {
    this.notes = this.notes.filter(n => n.id !== id);
    this.notes$.next(this.notes);
  }
}
