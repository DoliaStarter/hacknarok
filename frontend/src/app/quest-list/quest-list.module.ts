import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { QuestListComponent } from './list/components/quest-list.component';
import { QuestListService } from './list/services/quest-list.service';
import { QuestListRouteComponent } from './quest-list-route.component';

@NgModule({
  imports: [HttpClientModule, MatTableModule, MatPaginatorModule],
  declarations: [QuestListRouteComponent, QuestListComponent],
  providers: [QuestListService]
})
export class QuestListModule {}
