import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import Todo from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private restService: RestService) { }

  getListNames() {
    return this.restService.get('title');
  }

  createNewList(description: string) {
    return this.restService.post('title', { description });
  }

  getTodos(titleId: string) {
    return this.restService.get(`title/${titleId}/todos`);
  }

  createATodo(titleId: string, description: string) {
    return this.restService.post(`title/${titleId}/todos`, { description });
  }

  deleteATodo(titleId: string, todoId: string) {
    return this.restService.delete(`title/${titleId}/todos/${todoId}`);
  }

  deleteAList(titleId: string) {
    return this.restService.delete(`title/${titleId}`);
  }

  isComplete(titleId: string, todo: Todo) {
    return this.restService.patch(`title/${titleId}/todos/${todo._id}`, { completed: !todo.completed });
  }
}
