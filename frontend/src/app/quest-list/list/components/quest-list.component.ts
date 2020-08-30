import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { questDetailsRoute, QuestModel } from '../../../app.config';
import { LayoutEventType, LayoutService } from '../../../services/layout.service';
import { QuestFiltersModel } from '../models/quest-filters.model';
import { QuestListService } from '../services/quest-list.service';

@Component({
  selector: 'app-quest-list',
  templateUrl: './quest-list.component.html',
  styleUrls: ['./quest-list.component.scss']
})
export class QuestListComponent implements OnInit, OnDestroy, AfterViewInit{
  questListServiceSubscription: Subscription;
  itemCount: number;
  columnsToDisplay: string[] = ['title', 'creator', 'gamesCount'];
  
  dataSource = new MatTableDataSource<QuestModel>();
  
  pageSizes = [5, 10, 20];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.layoutService.events.subscribe(event => {
      switch(event) {
        case LayoutEventType.ShowActiveQuests:
          this.showCurrentUserQuests();
          break;
        case LayoutEventType.ShowAllQuests: 
            this.showClosestQuests();
            break;
      }
    });
    this.showClosestQuests();
  }

  showCurrentUserQuests() {
    this.questListService.getCurrentUserQuestList().subscribe(
      result => {
        this.dataSource.data = result.quests;
        this.itemCount = result.itemCount;
      }
    );

  }

  showClosestQuests(filters?: QuestFiltersModel) {
    navigator.geolocation.getCurrentPosition(position => {
      const posAsFitlers: QuestFiltersModel  = { 
        lati: position.coords.latitude,
        long: position.coords.longitude,
        range: 5,
        ...filters,
       };
      this.questListServiceSubscription = this.questListService.getQuestList(posAsFitlers).subscribe(
        data => {
          this.dataSource.data = data.quests;
          this.itemCount = data.itemCount;
        }
      )  
    })
  }
  
  ngOnDestroy () {
    this.questListServiceSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onItemClicked(item:QuestModel) {
    this.router.navigateByUrl(`${questDetailsRoute}/${item.id}`);
  }
  
  constructor(
    protected questListService: QuestListService,
    protected router: Router,
    protected layoutService: LayoutService
  ) { }
}
