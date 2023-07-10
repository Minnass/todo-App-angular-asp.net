import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { TodoItem } from '../Models/TodoItem.model';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';
import { PostTaskDto } from 'DTO/postTaskDto.model';
import { UpdatetaskDto } from 'DTO/updateTaskDto.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  displayedChanged = new Subject<TodoItem[]>();
  searchingReset = new Subject<Boolean>();
  messageResponse = new Subject<{ message: string; status: boolean }>();
  apiData: TodoItem[] = [];
  currentDisplayedData: TodoItem[] = [];
  constructor(private dataStorageService: DataStorageService) {}
  ngOnDestroy(): void {
    this.displayedChanged.unsubscribe();
    this.searchingReset.unsubscribe();
  }
  getAllTasks() {
    this.dataStorageService.getTodoList().subscribe((results) => {
      this.currentDisplayedData = results.data.map((item) => {
        return { ...item, checked: false };
      });
      this.displayedChanged.next(this.currentDisplayedData);
    });
  }
  searchItem(keyWord: string) {
    if (!keyWord.trim()) {
      this.getAllTasks();
      return;
    }
    this.dataStorageService.searchItems(keyWord.trim()).subscribe((results) => {
      this.apiData = results.data.map((item) => {
        return { ...item, checked: false };
      });
      this.currentDisplayedData = this.apiData.map(
        (e) => (
          (e.checked =
            this.currentDisplayedData.find((a) => a.id === e.id)?.checked ||
            e.checked),
          e
        )
      );
      this.displayedChanged.next(this.currentDisplayedData);
    });
  }
  addTask(item: PostTaskDto) {
    var toastObject = { message: '', status: false };
    this.dataStorageService.addItem(item).subscribe((results) => {
      if(results.success){
        this.currentDisplayedData = results.data.map((item) => {
          return { ...item, checked: false };
        });
      }
      toastObject.message = results.message;
      toastObject.status = results.success;
      this.displayedChanged.next(this.currentDisplayedData);
      this.messageResponse.next(toastObject);
      this.searchingReset.next(true);
      
    });
  }
  deleteItems() {
    const temp = this.currentDisplayedData.filter(
      (item) => item.checked === true
    );
    console.log(temp);
    temp.forEach((item) => {
      this.dataStorageService.deleteItem(item.id).subscribe((c) => {});
    });
    this.currentDisplayedData = this.currentDisplayedData.filter(
      (item) => !(item.checked === true)
    );
    this.displayedChanged.next(this.currentDisplayedData);
  }
  editItem(item: UpdatetaskDto) {
    const toastObject = { message: '', status: false };
    this.dataStorageService.editItem(item).subscribe((e) => {
      if (e.success) {
        var changedItem = this.currentDisplayedData.find(
          (item) => item.id == item.id
        );
        var data = e.data as unknown as TodoItem;
        changedItem!.name = data.name;
        changedItem!.description = data.description;
        toastObject.status = true;
      }
      toastObject.message = e.message;
      this.messageResponse.next(toastObject);
    });
  }
}
