import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';


interface OperatorDB {
    name:string;
    sheet_name:string;
    entity:string;
}

const GST = ['Sanaa Saidi', 'Rim Allouche', 'khushali agarwal', 'Shyam Shah', 'Rahma Ouni '];

export class Operator {

    /**
     * Getter $operator_id
     * @return {string}
     */
    public get $operator_id(): string {
        return this.operator_id;
    }

    /**
     * Getter $name
     * @return {string}
     */
    public get $name(): string {
        return this.name;
    }

    /**
     * Getter $sheet_name
     * @return {string}
     */
    public get $sheet_name(): string {
        return this.sheet_name;
    }

    /**
     * Getter $type
     * @return {string}
     */
    public get $type(): string {
        return this.type;
    }

    /**
     * Setter $operator_id
     * @param {string} value
     */
    public set $operator_id(value: string) {
        this.operator_id = value;
    }

    /**
     * Setter $name
     * @param {string} value
     */
    public set $name(value: string) {
        this.name = value;
    }

    /**
     * Setter $sheet_name
     * @param {string} value
     */
    public set $sheet_name(value: string) {
        this.sheet_name = value;
    }

    /**
     * Setter $type
     * @param {string} value
     */
    public set $type(value: string) {
        this.type = value;
    }
    private operator_id: string;
    private name: string;
    private sheet_name: string;
    private type: string;

    public static getAllOperators(db: AngularFirestore, callback){
        var operators: Observable<Operator[]> = db.collection('operators', ref =>
            ref.limit(1)    
        )
            .snapshotChanges()
            .pipe(map(actions => {
                return actions.map(a => {
                    var operator = new Operator();
                    const id = a.payload.doc.id;
                    const data = a.payload.doc.data() as OperatorDB;
                    operator.$operator_id = id;
                    operator.$name = data.name;
                    operator.$sheet_name = data.sheet_name;
                    if(data.entity == "1") operator.$type = "Entity";
                    else if(GST.indexOf(data.sheet_name) != -1) operator.$type = "GST";
                    else operator.$type = "Other";
                    return operator;
                })
            }));

            operators.subscribe(countries => {
                var result = countries as Operator[];
                callback(result);
            })

    }

}