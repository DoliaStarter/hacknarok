import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { questListServiceUrl, QuestModel } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class QuestDescriptionService {
  constructor(public httpClient: HttpClient) {}

    public getQuest(id: number): Observable<QuestModel> {
        return this.httpClient.get<QuestModel>(`${questListServiceUrl}/${id}`);
        // of({
        //         id,
        //         title: 'Title',
        //         creator: 'John',
        //         gamesCount: 10,
        //         creatorId: 10,
        //         description: 'A great quest',
        //         points: [
        //           {
        //             pointId: 5,
        //             lati: 0,
        //             long: 0,
        //             title: 'Deep deep in the ocean',
        //             description: 'If you are here my friend, that means, that you are great'
        //           },
        //           {
        //             pointId: 10,
        //             lati: 11,
        //             long: 10,
        //             title: 'Brave new world',
        //             description: 'Actual happiness always looks pretty squalid in comparison with the overcompensations for misery'

        //           },

        //         ]
        //     });
    }
}
