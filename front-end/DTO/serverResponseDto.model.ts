import { TodoItem } from "src/app/Models/TodoItem.model";

export interface ServerResponseDto{
    data:TodoItem[],
    success:boolean,
    message:string
}