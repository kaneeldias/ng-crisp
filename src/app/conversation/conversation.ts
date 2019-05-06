import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { db, firebase } from '../db';
import { firestore } from 'firebase';
interface conversationDB {
    created_at: string;
    operator_id: string;
}

export class Conversation {

    private conversation_id: string;
    private created_at: string;
    private operator_id: string;



    /**
     * Getter $conversation_id
     * @return {string}
     */
    public get $conversation_id(): string {
        return this.conversation_id;
    }

    /**
     * Getter $created_at
     * @return {string}
     */
    public get $created_at(): string {
        return this.created_at;
    }

    /**
     * Getter $operator_id
     * @return {string}
     */
    public get $operator_id(): string {
        return this.operator_id;
    }

    /**
     * Setter $conversation_id
     * @param {string} value
     */
    public set $conversation_id(value: string) {
        this.conversation_id = value;
    }

    /**
     * Setter $created_at
     * @param {string} value
     */
    public set $created_at(value: string) {
        this.created_at = value;
    }

    /**
     * Setter $operator_id
     * @param {string} value
     */
    public set $operator_id(value: string) {
        this.operator_id = value;
    }

    /*public save = new Promise(function (resolve, reject) {

        /*var conversations_collection = db.collection('conversations');
        var records_collection = db.collection('main-records');

        var db_obj = {
            created_at: this.created_at,
            operator_id: this.operator_id
        } as conversationDB

        var created_at = this.created_at;
        var d = new Date(created_at + ":00");
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        var week = new Date(d.setDate(diff)).toISOString().split("T")[0];

        db.runTransaction(function (transaction) {

            conversations_collection.doc(this.conversation_id).set(db_obj, { 'merge': true });
            records_collection.doc(week).set({ 'conversations_created': this.firebase.firestore.FieldValue.increment(1) }, { merge: true });

        })
            .then(
                resolve(),
                reject("Transaction error")
            )
            .catch(function(error){
                throw error;
            })
        })*/


    //conversations_collection.doc(this.conversation_id).set(db_obj, {'merge':true});

    public save(): Promise<void> {

        var self = this;

        return new Promise(function (resolve, reject) {
            var conversations_collection = db.collection('conversations');
            var records_collection = db.collection('main-record');

            var db_obj = {
                created_at: self.created_at,
                operator_id: self.operator_id
            } as conversationDB

            var created_at = self.created_at.split(" ")[0];
            var d = new Date(created_at);
            var day = d.getDay(),
                diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
            var week = new Date(d.setDate(diff)).toISOString().split("T")[0];
            //console.log(created_at + "   " + week);

            var conversationRef: DocumentReference = conversations_collection.doc(self.$conversation_id);

            let getConversationPromise = conversationRef.get();
            getConversationPromise
                .then(function (conversation) {
                    if (conversation.exists) {
                        reject("Conversation exists");
                    }
                    else {
                        var mainRef = records_collection.doc(week);
                        var batch = db.batch();
                        batch.set(conversationRef, db_obj, { merge: true });
                        batch.set(mainRef, { 'conversations_created': firebase.firestore.FieldValue.increment(1) }, { 'merge': true });
                        

                        let batchPromise = batch.commit();
                        batchPromise.then(function () {
                            resolve();
                        }).catch(function (error) {
                            throw error;
                        });
                    }
                })
                .catch(function (error) {
                    throw error;
                })



            /*conversationRef.get()
                .then(
                    function (conversation) {
                        if (!conversation.exists) {
                            var mainRef = records_collection.doc(week);
                            var batch = db.batch();
                            batch.set(conversationRef, db_obj, { merge: true });
                            batch.set(mainRef, { 'conversations_created': firebase.firestore.FieldValue.increment(1) }, { 'merge': true });
                            batch.commit()
                                .then(
                                    resolve(),
                                    function () { throw new Error("Batch Error") }
                                )
                                .catch(function (error) {
                                    throw error;
                                })
                        }
                        else {
                            reject("Conversation Exists");
                        }
                    },
                    function () { throw new Error("Transaction Error") }
                )
                .catch(function (error) {
                    throw error
                })*/



            /*db.runTransaction(function (transaction: firestore.Transaction) { 
                return transaction.get(conversationRef).then(function(conversation){
                    if(conversation.exists) throw "Conversations already exists";
                    else{
                        transaction = transaction.set(conversations_collection.doc(self.$conversation_id), db_obj, { 'merge': true });
                        transaction = transaction.set(records_collection.doc(week), { 'conversations_created': firebase.firestore.FieldValue.increment(1) }, { 'merge': true });        
                    }
                }).catch(function(error){
                    throw error;
                })
            })
                .then(
                    resolve(),
                    reject("Transaction error")
                )
                .catch(function (error) {
                    throw error;
                })*/
        })

        /*var conversations_collection = db.collection('conversations');
        var records_collection = db.collection('main-records');
    
        var db_obj = {
            created_at: this.created_at,
            operator_id: this.operator_id
        } as conversationDB
    
        conversations_collection.doc(this.conversation_id).set(db_obj, {'merge':true});*/


    }
}

