import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { TodoItem } from './Models/TodoItem.model';
import { TodoService } from './services/todo.service';
import { DataStorageService } from './services/data-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private dataStorageService: DataStorageService
  ) {}
  ngOnInit(): void {
    this.todoService.getAllTasks();
  }
}
