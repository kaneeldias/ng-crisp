import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface MainWeekDB{
    helpdesk_reads: number;
    new_conversations:number;
    conversations_assigned:number;
    mean_rating:number;
    people_created:number;
}

export class MainWeek{

    week_start: string;
    helpdesk_reads: number;
    new_conversations:number;
    conversations_assigned:number;
    mean_rating:number;
    people_created:number;

    public static getAllRecords(db:AngularFirestore, callback){
        var records: Observable<MainWeek[]> = db.collection('main-record', 
        )
            .snapshotChanges()
            .pipe(map(actions => {
                return actions.map(a => {
                    var record = new MainWeek();
                    const id = a.payload.doc.id;
                    const data = a.payload.doc.data() as MainWeekDB;
                    record.week_start = id;
                    record.helpdesk_reads = data.helpdesk_reads;
                    record.new_conversations = data.new_conversations;
                    record.conversations_assigned = data.conversations_assigned;
                    record.people_created = data.people_created;
                    record.mean_rating = data.mean_rating;
                    return record;
                })
            }));

            records.subscribe(records => {
                var result = records as MainWeek[];
                callback(result);
            })
    }

    public validate(){
        console.log(this)
        if(this.helpdesk_reads == undefined || this.helpdesk_reads < 0) return false;
        if(this.new_conversations == undefined || this.new_conversations < 0) return false;
        if(this.conversations_assigned == undefined || this.conversations_assigned < 0) return false;
        if(this.mean_rating == undefined || this.mean_rating < 0) return false;
        if(this.people_created == undefined || this.people_created < 0) return false;
        return true;
    }

}