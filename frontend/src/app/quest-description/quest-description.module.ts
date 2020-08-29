import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.model';
import { QuestDescriptionComponent } from './components/quest-description.component';
import { QuestPointDescriptionComponent } from './components/quest-point-description.component';
import { QuestDescriptionRouteComponent } from './quest-description-route.component';
import { QuestDescriptionResolver } from './services/quest-description.resolver';
import { QuestDescriptionService } from './services/quest-description.service';

@NgModule({
  imports: [HttpClientModule, ComponentsModule],
  declarations: [QuestDescriptionRouteComponent, QuestDescriptionComponent, QuestPointDescriptionComponent],
  providers: [
      QuestDescriptionService,
      QuestDescriptionResolver
  ]
})
export class QuestDescriptionModule {}
