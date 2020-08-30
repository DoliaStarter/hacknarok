import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ComponentsModule } from '../components/components.model';
import { PointDescriptionComponent } from './components/point-description.component';
import { QuestDescriptionComponent } from './components/quest-description.component';
import { QuestPointDescriptionComponent } from './components/quest-point-description.component';
import { QuestDescriptionRouteComponent } from './quest-description-route.component';
import { QuestAnswerService } from './services/quest-answer.service';
import { QuestDescriptionResolver } from './services/quest-description.resolver';
import { QuestDescriptionService } from './services/quest-description.service';

@NgModule({
  imports: [HttpClientModule, ComponentsModule, MatDialogModule, MatButtonModule, MatSnackBarModule ],
  declarations: [QuestDescriptionRouteComponent, QuestDescriptionComponent, QuestPointDescriptionComponent, PointDescriptionComponent],
  providers: [
      QuestDescriptionService,
      QuestDescriptionResolver,
      QuestAnswerService,
  ]
})
export class QuestDescriptionModule {}
