import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
  isPositionFilterActive: boolean = false;
  questListServiceSubscription: Subscription;
  itemCount: number;
  filters: QuestFiltersModel = {range: 50} as QuestFiltersModel;
  
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
            this.refresh(this.filters);
            break;
      }
    });
    this.refresh(this.filters);
  }

  setPositionFilter($event) {
    this.isPositionFilterActive = $event;
    this.refresh(this.filters);
  }

  showCurrentUserQuests() {
    this.questListService.getCurrentUserQuestList().subscribe(
      result => {
        this.dataSource.data = result.quests;
        this.itemCount = result.itemCount;
      }
    );}

  showClosestQuests(filters: QuestFiltersModel) {
    navigator.geolocation.getCurrentPosition(position => {
      const posAsFitlers: QuestFiltersModel  = { 
        lati: position.coords.latitude,
        long: position.coords.longitude,
        range: filters.range,
        ...filters,
      };
      this.updateList(posAsFitlers);
    })
  }

  


  
  public refresh(filters: QuestFiltersModel) {
    if (this.isPositionFilterActive) {
      this.showClosestQuests(filters);
    } else {
      this.updateList(filters);
    }
  }


  updateList(filters: QuestFiltersModel) {
    if (this.questListServiceSubscription) {
      this.questListServiceSubscription.unsubscribe();
    }
    this.questListServiceSubscription = this.questListService.getQuestList(filters).pipe(
      debounceTime(900),
      distinctUntilChanged()
    ).subscribe(
      data => {
        this.dataSource.data = data.quests;
        this.itemCount = data.itemCount;
      }
    );
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
