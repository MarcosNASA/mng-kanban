import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mng-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css'],
})
export class ChipComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() description: string;
  @Output() descriptionChange: EventEmitter<string> = new EventEmitter<string>();

  @Output() onDeleteChip: EventEmitter<number> = new EventEmitter<number>();
  @Output() onUpdateState: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  deleteChip(): void {
    this.onDeleteChip.emit(this.id);
  }

  updateChipName(event) {
    const {
      target: { textContent: newName },
    } = event;

    if (newName === this.name) {
      return;
    }

    if (newName === '') {
      event.target.textContent = this.name;
      return;
    }

    this.name = newName;

    this.nameChange.emit(this.name);
    this.onUpdateState.emit();
  }

  updateChipDescription(event) {
    const {
      target: { textContent: newDescription },
    } = event;

    if (newDescription === this.description) {
      return;
    }

    if (newDescription === '') {
      event.target.textContent = this.description;
      return;
    }

    this.description = newDescription;

    this.descriptionChange.emit(this.description);
    this.onUpdateState.emit();
  }
}
