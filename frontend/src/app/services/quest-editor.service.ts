import { Injectable } from '@angular/core';
import { QuestModel, createQuestUrl } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestEditorService {

  constructor(public httpClient: HttpClient, private router:Router) { }



  public CreateQuest(quest:QuestModel )
  {
    
    return this.httpClient.post<boolean>(createQuestUrl,<QuestModel> quest).pipe(
      tap(isSuccess => {
         alert('quest created');
         this.router.navigate(['quests'])
      })
    )
  }

}
