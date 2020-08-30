import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuestModel, startQuestUrl } from '../../app.config';
import { tap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PointStatus, QuestModel} from '../../app.config';


@Injectable({
  providedIn: 'root',
})
export class QuestDescriptionService {
  constructor(public httpClient: HttpClient) {
  }

startSession(questid:number)
  {
    console.log(startQuestUrl.toString()+questid+"/start");
      return this.httpClient.post<boolean>(startQuestUrl.toString()+questid+"/start",questid).pipe(
          tap(isSuccess => {
             alert('quest started');
          
          }));
  }

  public getQuest(id: number): Observable<QuestModel> {
    return of({
      id,
      title: 'Title',
      creator: 'John',
      gamesCount: 10,
      creatorId: 10,
      description: 'A great quest',
      points: [
        {
          pointId: 5,
          lati: 0,
          long: 0,
          title: 'Deep deep in the ocean',
          description: 'If you are here my friend, that means, that you are great',
          status: PointStatus.VISIBLE
        },
        {
          pointId: 10,
          lati: 11,
          long: 10,
          title: 'Brave new world',
          description: 'Actual happiness always looks pretty squalid in comparison with the overcompensations for misery',
          status: PointStatus.VISITED
        },
         {
          pointId: 10,
          lati: 13,
          long: 15,
          title: 'Brave new world',
          description: 'Actual happiness always looks pretty squalid in comparison with the overcompensations for misery',
          status: PointStatus.HIDDEN
        },

      ]
    });
  }
}
