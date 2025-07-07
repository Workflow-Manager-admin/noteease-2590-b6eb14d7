import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Note } from './notes.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
  imports: [FormsModule, DatePipe]
})
export class NoteDetailComponent implements OnChanges {
  @Input() note!: Note;
  @Output() update = new EventEmitter<{ id: number; title: string; content: string }>();

  title: string = '';
  content: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['note']) {
      this.title = this.note?.title ?? '';
      this.content = this.note?.content ?? '';
    }
  }

  onSave() {
    this.update.emit({ id: this.note.id, title: this.title, content: this.content });
  }
}
