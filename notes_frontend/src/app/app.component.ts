import { Component, OnInit } from '@angular/core';
import { Note, NotesService } from './notes/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notes: Note[] = [];
  selectedNoteId: number | null = null;

  notesService = new NotesService();

  get selectedNote(): Note | null {
    return this.selectedNoteId !== null
      ? this.notes.find(n => n.id === this.selectedNoteId) ?? null
      : null;
  }

  ngOnInit(): void {
    this.notesService.getNotes().subscribe(ns => {
      this.notes = ns;
      if (
        (this.selectedNoteId == null || !ns.some(n => n.id === this.selectedNoteId)) &&
        ns.length > 0
      ) {
        this.selectedNoteId = ns[0].id;
      }
    });
  }

  onSelectNote(id: number) {
    this.selectedNoteId = id;
  }

  onAddNote() {
    const newNote = this.notesService.createNote('Untitled', '');
    this.selectedNoteId = newNote.id;
  }

  onUpdateNote(note: { id: number; title: string; content: string }) {
    this.notesService.updateNote(note.id, note.title, note.content);
  }

  onDeleteNote(id: number) {
    this.notesService.deleteNote(id);
    // Update selection after deletion
    if (this.selectedNoteId === id) {
      if (this.notes.length > 0) {
        this.selectedNoteId = this.notes[0]?.id ?? null;
      } else {
        this.selectedNoteId = null;
      }
    }
  }
}
