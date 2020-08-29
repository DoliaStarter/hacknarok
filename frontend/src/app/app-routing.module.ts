import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { ExampleModule } from './example/example.module';
import { QuestListRouteComponent } from './quest-list/quest-list-route.component';
import { QuestListModule } from './quest-list/quest-list.module';

const routes: Routes = [
  {
    path: 'quest-list',
    component: QuestListRouteComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'quest-list',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [ExampleModule,
            QuestListModule,
            RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
