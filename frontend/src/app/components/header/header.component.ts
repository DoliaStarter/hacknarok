import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { createQuestRoute } from '../../app.config';
import { LayoutEventType, LayoutService } from '../../services/layout.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class HeaderComponent implements OnInit {
  @Output()
  openMenuClick = new EventEmitter();

  viewActiveQuests: boolean;

  get viewActiveQuestsLabel() {
    return this.viewActiveQuests ? 'Show all quests' : 'View active quests';
  }
  
  constructor(
    public dialog: MatDialog,
    protected location: Location,
    protected router: Router,
    protected layoutService: LayoutService ) { }

  ngOnInit(): void {
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px'
    });
  }

  onViewActiveClick() {
    this.layoutService.events.next( this.viewActiveQuests ? LayoutEventType.ShowAllQuests : LayoutEventType.ShowActiveQuests );
    this.viewActiveQuests = !this.viewActiveQuests;
  }

  onCreateClick() {
    this.router.navigateByUrl(createQuestRoute);
  }

  onGoBackClick() {
    this.location.back();
  }

}
