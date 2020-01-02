import { Component, OnInit } from '@angular/core';
import Title from 'src/app/models/title';
import { TodoService } from 'src/app/services/todo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {

  constructor(
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createAList(value: string) {
    this.todoService.createNewList(value)
      .subscribe((title: Title) => this.router.navigate(['/title', title._id]));
  }

}
