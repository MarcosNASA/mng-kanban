import { Component, OnInit } from '@angular/core';

import { Kanban } from './core/models/Kanban';
import { Column } from './core/models/Column';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  defaultKanbanData: Column[] = [
    {
      id: 0,
      name: 'TODO',
      chips: [
        {
          id: 0,
          name: 'Find a job',
          description: '90K a year at least',
        },
      ],
    },
    {
      id: 1,
      name: 'DOING',
      chips: [
        {
          id: 1,
          name: 'TFG',
          description: 'As soon as possible',
        },
        {
          id: 2,
          name: 'Kanban project',
          description: 'So I can explain Angular concepts to the members of the tribunal 🤓',
        },
      ],
    },
    {
      id: 2,
      name: 'DONE',
      chips: [
        {
          id: 3,
          name: 'Procastinating',
          description: 'Even thoug I was not',
        },
        {
          id: 4,
          name: 'JS Scope Visualizer',
          description: 'https://js-scope-visualizer.firebaseapp.com/',
        },
        {
          id: 5,
          name: 'Portfolio',
          description: 'https://pages.github.com/marcos-nasa-g',
        },
      ],
    },
  ];
  kanbanData: Column[];

  ngOnInit(): void {
    if (!localStorage.getItem('mng-kanban')) {
      this.saveColumns(this.defaultKanbanData);
    }

    this.kanbanData =
      (JSON.parse(localStorage.getItem('mng-kanban')) as Column[]) ||
      this.defaultKanbanData;
  }

  updateState(): void {
    this.saveColumns(this.kanbanData);
  }

  saveColumns(kanbanData: Column[]): void {
    localStorage.setItem('mng-kanban', JSON.stringify(kanbanData));
  }
}
