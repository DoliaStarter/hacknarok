import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuestListModel } from '../../../app.config';
@Injectable({
  providedIn: 'root',
})
export class QuestListService {
  constructor(public httpClient: HttpClient) {}

  public getQuestList(): Observable<QuestListModel> {
    // return this.httpClient.get<QuestListModel>(questListModel);
    return of(
        {
          quests: [
            {
            id: 1,
            title: 'cool',
            creator: 'anddsrew',
            gamesCount: 10,
          },
          {
            id: 2,
            title: 'coo',
            creator: 'andrew',
            gamesCount: 10,
          },
          {
            id: 3,
            title: 'cool',
            creator: 'anddsrew',
            gamesCount: 10,
          },
          {
            id: 4,
            title: 'coo',
            creator: 'andrew',
            gamesCount: 10,
          },
        ],
          itemCount: 10
        });
}
}
