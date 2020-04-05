export class Goal{
    goal_id: number;
    goal_weight: number;
    date_set: Date;

    constructor(
        goalID: number = null, 
        goalWeight: number = null, 
        dateSet: Date = null
    ){
        this.goal_id = goalID;
        this.goal_weight = goalWeight;
        this.date_set = dateSet;
    }
}