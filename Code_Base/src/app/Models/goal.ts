export class Goal{
    goal_weight: number;
    date_set: Date;

    constructor(goalWeight: number = null, dateSet: Date = null){
        this.goal_weight = goalWeight;
        this.date_set = dateSet;
    }
}