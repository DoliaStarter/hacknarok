import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasePointModel, pointsUrl, questListServiceUrl, QuestPointModel } from '../../app.config';

export interface QuestAnswerActionResult {
    isSuccess: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class QuestAnswerService {
    constructor(protected httpClient: HttpClient) {}

    checkAnswer(point: BasePointModel): Observable<QuestAnswerActionResult> {
        console.log(point);
        return this.httpClient.post<QuestAnswerActionResult>(`${pointsUrl}/${point.pointId}`, point);
        // return of({isSuccess: true});
    }


    getQuestPoints(questId): Observable<QuestPointModel[]> {
        return this.httpClient.get<QuestPointModel[]>(`${questListServiceUrl}/${questId}/points`)
        // return of([
        //     {
        //         pointId: 0,
        //         long: 0,
        //         lati: 0,
        //         status: PointStatus.VISIBLE
        //     },
        //     {
        //         pointId: 1,
        //         long: 5,
        //         lati: 5,
        //         status: PointStatus.VISITED
        //     }
        // ])
    }
}
