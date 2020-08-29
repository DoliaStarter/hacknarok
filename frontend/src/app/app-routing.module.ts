import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { questDetailsRoute } from './app.config';
import { ExampleModule } from './example/example.module';
import { QuestDescriptionRouteComponent } from './quest-description/quest-description-route.component';
import { QuestDescriptionModule } from './quest-description/quest-description.module';
import { QuestDescriptionResolver } from './quest-description/services/quest-description.resolver';
import { QuestListRouteComponent } from './quest-list/quest-list-route.component';
import { QuestListModule } from './quest-list/quest-list.module';
const routes: Routes = [
  {
    path: 'quest-list',
    component: QuestListRouteComponent
  },
  {
    path: `${questDetailsRoute}/:id`,
    component: QuestDescriptionRouteComponent,
    resolve: {
      quest: QuestDescriptionResolver
    }
  },
  {
    path: '',
    redirectTo: 'quest-list',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [ExampleModule,
            QuestDescriptionModule,
            QuestListModule,
            RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
