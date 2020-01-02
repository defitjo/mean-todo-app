import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import Title from 'src/app/models/title';
import Todo from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  titles: Title[] = [];
  titleId: string;
  faTrashAlt = faTrashAlt;
  faTimes = faTimes;
  faCheck = faCheck;
  faListAlt = faListAlt;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.todoService.getListNames()
      .subscribe((titles: Title[]) => this.titles = titles);

    this.route.params.subscribe((params: Params) => {
      this.titleId = params.titleId;
      if (!this.titleId) { return; }
      this.todoService.getTodos(this.titleId)
        .subscribe((todos: Todo[]) => this.todos = todos);
    });
  }

  deleteAList(title: Title) {
    this.todoService.deleteAList(title._id)
      .subscribe(() => this.titles = this.titles.filter(titleName => titleName._id !== title._id));
  }

  deleteATodo(todo: Todo) {
    this.todoService.deleteATodo(this.titleId, todo._id)
      .subscribe((aTodo: Todo) => this.todos = this.todos.filter(todoInfo => todoInfo._id !== aTodo._id));
  }

  onTodoClick(todo: Todo) {
    this.todoService.isComplete(this.titleId, todo)
      .subscribe(() => {
        todo.completed = !todo.completed;
      });
  }
}
