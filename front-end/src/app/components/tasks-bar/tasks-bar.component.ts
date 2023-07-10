import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { PopupComponent } from '../popup/popup.component';
import { PostTaskDto } from 'DTO/postTaskDto.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks-bar',
  templateUrl: './tasks-bar.component.html',
  styleUrls: ['./tasks-bar.component.scss'],
})
export class TasksBarComponent implements OnInit  {
  keyWord: string = '';
  @Output() searchingClick = new EventEmitter<string>();

  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.todoService.searchingReset.subscribe((c) => {
      this.keyWord = c === false ? this.keyWord : '';
    });
    this.todoService.messageResponse.subscribe((response) => {
      console.log(response.message,response.status);
      if(response.status){
          this.toastr.success(response.message,'Notification');
      }
      else{
        this.toastr.warning(response.message,'Notification');
      }
    });
  }
  onSearchItem() {
    this.todoService.searchItem(this.keyWord);
  }

  onDeleteItem() {
    this.todoService.deleteItems();
 
  }
  onAddItem() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '40%',
      enterAnimationDuration: '500ms',
      data: { tittle: 'ADD NEW TASK', name: '', description: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.okClick) {
        var addedItems: PostTaskDto = {
          name: result.name,
          description: result.description,
        };
        this.todoService.addTask(addedItems);
      }
    });
  }
}
