import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from './notes.service';
import { NgFor, NgIf, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  imports: [NgFor, NgIf, SlicePipe],
})
export class NotesListComponent {
  @Input() notes: Note[] = [];
  @Input() selectedNoteId?: number | null;
  @Output() selectNote = new EventEmitter<number>();
  @Output() addNote = new EventEmitter<void>();
  @Output() deleteNote = new EventEmitter<number>();

  onSelect(id: number) {
    this.selectNote.emit(id);
  }
  onAdd() {
    this.addNote.emit();
  }
  onDelete(id: number, e: MouseEvent) {
    e.stopPropagation();
    this.deleteNote.emit(id);
  }
}
