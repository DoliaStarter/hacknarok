import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './example/components/example.component';
import { ExampleModule } from './example/example.module';
import { LoginComponent } from "./components/login/login.component";
const routes: Routes = [
  {
    path: '',
    component: ExampleComponent,

  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [ExampleModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
