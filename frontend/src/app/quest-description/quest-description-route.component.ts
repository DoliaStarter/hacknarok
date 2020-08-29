import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestModel } from '../app.config';
@Component({
  selector: 'app-quest-description-route',
  templateUrl: './quest-description-route.component.html',
  styleUrls: ['./quest-description-route.component.scss']
})
export class QuestDescriptionRouteComponent implements OnInit {
    public quest: QuestModel;

    constructor(protected route: ActivatedRoute) { }

    ngOnInit() {
        this.quest = this.route.snapshot.data.quest as QuestModel;
    }
}
