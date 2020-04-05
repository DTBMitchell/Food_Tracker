import { DatePipe } from '@angular/common';

export class Weight{
    diary_id: number;
    weight: number;
    date: Date;

    constructor(
        weightID: number = null, 
        weight: number = null, 
        dateSet: Date = new Date(Date.now())
    ){
        this.diary_id = weightID;
        this.weight = weight;
        this.date = dateSet;
    }
}