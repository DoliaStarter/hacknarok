const host = 'http://localhost:8000';
export const exampleServiceUrl = `${host}/api/example`;
export const loginUrl = `${host}/api/login`;


// models
// list
// endpoint GET api/quests
interface QuestListModel {
    quests: QuestModel[];
    itemCount: number;
}

// endpoint GET api/quests/{id}
// endpoint POST api/quests
interface QuestModel {
    id?: number; // in list
    title: string; // in list
    creatorId: number; // in list
    creator: string; // in list
    gamesCount: string; // in list
    description: string;
    points: QuestPointModel[];
}


interface QuestPointModel extends BasePointModel {
    status: PointStatus;
    description: string;
    title: string;
    canOpenPoints: QuestPointModel[];
}

enum PointStatus {
    HIDDEN = 'hidden',
    VISIBLE = 'visible',
    VISITED = 'visited',
}


// endpoint POST api/quests/{id}/answers
// when user in point and want to submit answer
// we send BasePointModel -> answer:
// SUCCESS -> new QuestModel
// Failure -> Failure
interface BasePointModel {
    pointId: number;
    lang: number;
    long: number;
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



