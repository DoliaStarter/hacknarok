const host = 'http://localhost:8000';
export const exampleServiceUrl = `${host}/api/example`;
export const loginUrl = `${host}/api//users/login`;
export const registerUrl = `${host}/api/users/register`;
export const createQuestUrl=  `${host}/api/quests`;
export const mapApiToken = 'pk.eyJ1IjoiZHVzaGVzcyIsImEiOiJja2VmcWpneHcwc201MnluNzl3ZDRjNDl1In0.sV8IejZBXjXoUbHgRGeN6w';
export const questListServiceUrl = `${host}/api/quests`;
export const startQuestUrl =  `${host}/api/quests/`;
// router 
export const questDetailsRoute = 'quest-details';
export const createQuestRoute = 'create-quest';

// models
// list
// endpoint GET api/quests
export interface QuestListModel {
    quests: QuestModel[];
    itemCount: number;
}

// endpoint GET api/quests/{id}
// endpoint POST api/quests
export interface QuestModel {
    id?: number; // in list
    title: string; // in list
    creator: string; // in list
    gamesCount: number; // in list
    creatorId?: number; // in list
    description?: string; 
    points?: QuestPointModel[];
}


export interface QuestPointModel extends BasePointModel {
    status?: PointStatus;
    description?: string;
    title?: string;
    canOpenPoints?: QuestPointModel[];
}

export enum PointStatus {
    HIDDEN = 'hidden',
    VISIBLE = 'visible',
    VISITED = 'visited',
}


// endpoint POST api/quests/{id}/answers <- changed to api/quests/answers/{pointId}
// when user in point and want to submit answer
// we send BasePointModel -> answer:
// SUCCESS -> new QuestModel
// Failure -> Failure
export interface BasePointModel {
    pointId?: number;
    long: number;
    lati: number;
}


// endpoint POST api/quests/{id}/start
// when user want to start quest
// -> OK


// endpoint GET api/users/{id}/active_quests
// QuestListModel


// endpoint POST api/users/register
// endpoint POST api/users/login
export interface UserModel {
    login: string;
    password: string;
}
// -> Succes V Failure



