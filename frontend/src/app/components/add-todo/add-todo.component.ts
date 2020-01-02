import { Component, OnInit } from '@angular/core';
import Todo from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todos: Todo[] = [];
  titleId: string;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => this.titleId = params.titleId);
  }

  ngOnInit() {
  }

  addATodo(value: string) {
    this.todoService.createATodo(this.titleId, value)
      .subscribe((todo: Todo[]) => this.todos = todo);
  }

}
