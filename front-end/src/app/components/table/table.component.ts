import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { TodoItem } from 'src/app/Models/TodoItem.model';
import { TodoService } from 'src/app/services/todo.service';
import { PopupComponent } from '../popup/popup.component';
import { UpdatetaskDto } from 'DTO/updateTaskDto.model';
import { ToastrService } from 'ngx-toastr';



/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.todoService.displayedChanged.subscribe((result) => {
      this.dataSource = result;
    });
    this.todoService.messageResponse.subscribe((response) => {
      console.log(response.message);
      if (response.status) {
      
        this.toastr.success(response.message, 'Notification');
      } else {
        this.toastr.warning(response.message, 'Notification');
      }
    });
  }
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource!: TodoItem[];
  onMasterCheckboxChange(event: MatCheckboxChange) {
    this.dataSource.forEach((item) => {
      item.checked = event.source.checked;
    });
  }
  isAllCheckboxChecked() {
    const tmp = this.dataSource.every((item) => {
      return item.checked === true;
    });
    return tmp;
  }
  editItem(row: any) {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '40%',
      enterAnimationDuration: '500ms',
      data: {
        tittle: 'EDIT TASK',
        name: row.name,
        description: row.description,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.okClick) {
        const tmp: UpdatetaskDto = {
          id: row.id,
          name: result.name,
          description: result.description,
        };
        this.todoService.editItem(tmp);
      }
    });
  }
}
