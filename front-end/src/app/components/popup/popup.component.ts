import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoItem } from 'src/app/Models/TodoItem.model';
import { TodoService } from 'src/app/services/todo.service';
import { TasksBarComponent } from '../tasks-bar/tasks-bar.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  name: string = '';
  description: string = '';
  constructor(
    public dialogRef: MatDialogRef<TasksBarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
      this.name=this.data.name
      this.description=this.data.description;
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
}
