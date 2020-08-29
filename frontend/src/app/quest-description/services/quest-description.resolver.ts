import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestModel } from '../../app.config';
import { QuestDescriptionService } from './quest-description.service';

@Injectable({ providedIn: 'root' })
export class QuestDescriptionResolver implements Resolve<QuestModel> {
  constructor(private service: QuestDescriptionService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<QuestModel>|Promise<QuestModel>|QuestModel {
    const id = parseInt(route.paramMap.get('id'), 10); 
    return this.service.getQuest(id);
  }
}