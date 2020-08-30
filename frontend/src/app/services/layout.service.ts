import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum LayoutEventType {
    ShowActiveQuests = 'showActiveQuests',
    ShowAllQuests = 'showAllQuests'
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
    public events: Subject<LayoutEventType> = new Subject<LayoutEventType>();
}
