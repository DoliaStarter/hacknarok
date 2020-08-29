import { Component, OnInit } from '@angular/core';
import {  QuestListModel } from "../../app.config";
@Component({
  selector: 'app-quest-search',
  templateUrl: './quest-search.component.html',
  styleUrls: ['./quest-search.component.scss']
})
export class QuestSearchComponent implements OnInit {

  constructor() { }

  questList:QuestListModel= 
  {
    itemCount:2,
    quests:
    [
    {
      title: 'hello world',
      creator: 'Dushess',
      gamesCount: 2
    },
    {
      title: 'hello ',
      creator: 'suchara',
      gamesCount: 2
    }
    
  ]
  }

  ngOnInit(): void 
  {
    
  }

}
