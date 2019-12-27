import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'title', pathMatch: 'full' },
  { path: 'title', component: TodoListComponent },
  { path: 'title/:titleId', component: TodoListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
