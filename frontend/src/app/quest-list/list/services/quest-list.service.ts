import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QuestListModel, questListServiceUrl } from '../../../app.config';
import { QuestFiltersModel } from '../models/quest-filters.model';

@Injectable({
  providedIn: 'root',
})
export class QuestListService {
  constructor(public httpClient: HttpClient) {}

  public getQuestList(filters: QuestFiltersModel): Observable<QuestListModel> {
    return this.httpClient.post<QuestListModel>(`${questListServiceUrl}/search`, filters).pipe(
      catchError(error => of({
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
        }
    ))
    );
  }
}
