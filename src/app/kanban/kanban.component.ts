import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

import { Column } from '../core/models/Column';
import { Chip } from '../core/models/Chip';

@Component({
  selector: 'mng-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent implements OnInit {
  @Input() name: string;
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() columns: Column[];
  @Output() columnsChange: EventEmitter<Column[]> = new EventEmitter<
    Column[]
  >();
  @Output() onUpdateState: EventEmitter<Column[]> = new EventEmitter<
    Column[]
  >();

  constructor() {}

  ngOnInit(): void {}

  newColumn(): void {
    const newColumns: Column[] = [...this.columns];

    const newColumn = {
      id:
        !newColumns[newColumns.length - 1] ||
        (newColumns[newColumns.length - 1] &&
          newColumns[newColumns.length - 1].id === 0)
          ? ++newColumns[newColumns.length - 1].id
          : 0,
      name: 'New column',
      chips: [],
    };

    newColumns.push(newColumn);

    this.columns = newColumns;

    this.columnsChange.emit(this.columns);
    this.updateState();
  }

  deleteColumn(columnId: number): void {
    const newColumns: Column[] = [...this.columns];

    const columnIndex = newColumns.findIndex(function matchId(column) {
      return column.id === columnId;
    });

    newColumns.splice(columnIndex, 1);

    this.columns = newColumns;

    this.columnsChange.emit(this.columns);
    this.updateState();
  }

  handleChipDrop(event): void {
    const {
      currentIndex,
      previousIndex,
      container: { data: currentContainerData },
      previousContainer: { data: previousContainerData },
    } = event;

    if (currentContainerData.id === previousContainerData.id) {
      if (currentIndex === previousIndex) {
        return;
      }

      this.reorderChips(event);
      return;
    }

    this.moveChip(event);
  }

  reorderChips({
    currentIndex,
    previousIndex,
    container: { data: currentContainerData },
  }) {
    const newColumns = [...this.columns];

    const column = newColumns.find(matchId);
    const columnIndex = newColumns.findIndex(matchId);

    if (!column) {
      return;
    }

    newColumns.splice(
      columnIndex,
      1,
      getReorderedColumn(column, currentIndex, previousIndex)
    );

    this.columns = newColumns;

    this.columnsChange.emit(this.columns);
    this.updateState();

    /* Helpers */

    function matchId(column) {
      return column.id == currentContainerData.id;
    }

    function getReorderedColumn(
      column: Column,
      currentIndex: number,
      previousIndex: number
    ): Column {
      const newColumn = Object.assign({}, column);
      const { chips } = newColumn;
      const newChips = [...chips];

      const [chip] = newChips.splice(previousIndex, 1);
      newChips.splice(currentIndex, 0, chip);

      newColumn.chips = newChips;

      return newColumn;
    }
  }

  moveChip({
    currentIndex,
    previousIndex,
    container: { data: currentContainerData },
    previousContainer: { data: previousContainerData },
  }): void {
    const newColumns = [...this.columns];

    const currentColumn = newColumns.find(matchCurrentId);
    const newCurrentColumn = Object.assign({}, currentColumn);
    const previousColumn = newColumns.find(matchPreviousId);
    const newPreviousColumn = Object.assign({}, previousColumn);

    if (!currentColumn || !previousColumn) {
      return;
    }

    const currentColumnIndex = this.columns.findIndex(matchCurrentId);
    const previousColumnIndex = this.columns.findIndex(matchPreviousId);

    const { chips: currentChips } = currentColumn;
    const newCurrentChips = [...currentChips];
    const { chips: previousChips } = previousColumn;
    const newPreviousChips = [...previousChips];

    const [chip] = newPreviousChips.splice(previousIndex, 1);
    newCurrentChips.splice(currentIndex, 0, chip);

    newCurrentColumn.chips = newCurrentChips;
    newPreviousColumn.chips = newPreviousChips;

    newColumns.splice(currentColumnIndex, 1, newCurrentColumn);
    newColumns.splice(previousColumnIndex, 1, newPreviousColumn);

    this.columns = newColumns;

    this.columnsChange.emit(this.columns);
    this.updateState();

    /* Helpers */

    function matchCurrentId(column) {
      return column.id == currentContainerData.id;
    }

    function matchPreviousId(column) {
      return column.id == previousContainerData.id;
    }
  }

  updateState(): void {
    this.onUpdateState.emit();
  }
}
