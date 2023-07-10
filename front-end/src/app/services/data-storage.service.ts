import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ROOT_URL } from 'utils/root-path.model';

import { Observable } from 'rxjs';
import { TodoItem } from '../Models/TodoItem.model';
import { TodoService } from './todo.service';
import { ServerResponseDto } from 'DTO/serverResponseDto.model';
import { PostTaskDto } from 'DTO/postTaskDto.model';
import { UpdatetaskDto } from 'DTO/updateTaskDto.model';


@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  public getTodoList(): Observable<ServerResponseDto> {
    return this.http.get<ServerResponseDto>(`${ROOT_URL}/getAll`);
  }
  public searchItems(keyword: string): Observable<ServerResponseDto> {
    return this.http.get<ServerResponseDto>(`${ROOT_URL}/${keyword}`);
  }
  public addItem(item: PostTaskDto): Observable<ServerResponseDto> {
    return this.http.post<ServerResponseDto>(`${ROOT_URL}/`, item);
  }

  public deleteItem(id: number):Observable<ServerResponseDto> {
    return this.http.delete<ServerResponseDto>(`${ROOT_URL}/${id}`);
  }
  public editItem(item:UpdatetaskDto):Observable<ServerResponseDto>{
    return this.http.put<ServerResponseDto>(`${ROOT_URL}/`,item);
  }
}
