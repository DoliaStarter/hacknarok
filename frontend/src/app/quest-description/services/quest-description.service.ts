import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuestModel } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class QuestDescriptionService {
  constructor(public httpClient: HttpClient) {}

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
                  },
                  {
                    pointId: 10,
                    lati: 11,
                    long: 10,
                  },

                ]
            });
    }
}
