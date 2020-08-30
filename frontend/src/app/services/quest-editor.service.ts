import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { createQuestUrl, QuestModel } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class QuestEditorService {

  constructor(
    public httpClient: HttpClient, private router:Router,
    private snackbar: MatSnackBar
    ) { }



  public CreateQuest(
    quest:QuestModel,
     )
  {
    
    return this.httpClient.post<boolean>(createQuestUrl,<QuestModel> quest).pipe(
      tap(isSuccess => {
         this.snackbar.open('Quest successfully created !', ':)', {duration:4000});
         this.router.navigateByUrl('')
      })
    )
  }

}
