import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { QuestListComponent } from './list/components/quest-list.component';
import { QuestListService } from './list/services/quest-list.service';
import { QuestListRouteComponent } from './quest-list-route.component';

@NgModule({
  imports: [HttpClientModule, CommonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatInputModule, FormsModule, MatIconModule],
  declarations: [QuestListRouteComponent, QuestListComponent],
  providers: [QuestListService]
})
export class QuestListModule {}
