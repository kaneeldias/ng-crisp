import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Conversation } from 'src/app/conversation/conversation';

@Component({
  selector: 'app-upload-conversations',
  templateUrl: './upload-conversations.component.html',
  styleUrls: ['./upload-conversations.component.css']
})


export class UploadConversationsComponent implements OnInit {

  selected: boolean = false;
  status: string = "Upload File";
  uploadCount: number = 0;
  successUploadCount: number = 0;
  records: number = 0;

  private data;
  private collection: AngularFirestoreCollection;
  private records_collection: AngularFirestoreCollection;


  constructor(private db: AngularFirestore) {
    this.collection = db.collection('conversations');
    this.records_collection = db.collection('main-records');
  }

  ngOnInit() {

  }

  onChange(event) {
    var self = this;
    this.selected = true;
    this.status = "reading..."
    var files = event.srcElement.files;
    // console.log(files)
    let fileReader = new FileReader();
    fileReader.readAsText(files[0]);
    fileReader.onload = function () {
      self.parse(fileReader.result);
    }
  }

  private parse(csv) {
    this.status = "parsing..."
    var papa = new Papa();
    papa.parse(csv, {
      complete: (result) => {
        this.data = result.data;
        this.upload();
      }
    });
  }

  private upload() {
    this.status = "validating..."
    if (!this.validate(this.data[0])) {
      this.status = "Invalid File"
    }
    else {
      this.uploadCount = 0;
      this.records = this.data.length - 1;
      this.status = "uploading..."
      this.store(1, function (self) {
        self.status = "Done!"
      });
      /*this.records = data.length - 1;
      this.uploadCount = 0;
      this.status = "uploading..."
      var collection = this.db.collection('messages');
      for(var i = 1; i < data.length; i++){
        var record = data[i];
        var doc = {
          conversation_id: record[1],
          user_id:record[2],
          timestamp:record[3]
        }
        collection.doc(record[0]).set(doc).;
        this.uploadCount++;
      }
      this.status = "Done!"*/
    };

  }

  private store(i, finishedCallback) {
    var self = this;
    if (i >= this.data.length) {
      finishedCallback(self);
      return;
    }

    var record = this.data[i];
    var conversation = new Conversation();

    try {
      conversation.$conversation_id = record[0];
      conversation.$operator_id = record[1];
      conversation.$created_at = record[2];

      let promise = conversation.save()
        .then(function () {
          self.successUploadCount++;
        })
        .catch(function (error) {
          console.log("Error inserting row #" + i + ": " + error);
        })
        .finally(function () {
          self.uploadCount++;
          self.store(i + 1, finishedCallback);
        })

    }
    catch (error) {
      console.log("Error inserting row #" + i + ": " + error);
    }


    /*try {
      var record = this.data[i];
      var doc = {
        operator_id: record[1],
        created_at: record[2]
      }
 
    
 
      this.collection.doc(record[0]).set(doc, {'merge':true})
        .then(function () {
          var created_at = doc.created_at;
          var d = new Date(created_at + ":00");
          var day = d.getDay(),
          diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
          var created_at_mon = new Date(d.setDate(diff)).toISOString().split("T")[0];    
 
          self.successUploadCount++;
          self.uploadCount++;
          self.store(i + 1, finishedCallback);
        })
        .catch(function () {
          throw "db_error";
        })
    }
    catch (e) {
      console.log("Error inserting row #" + i);
        self.uploadCount++;
        self.store(i + 1, finishedCallback)
    }*/
  }

  private validate(header): boolean {
    if (header.length != 3) return false;
    if (header[0] != "conversation_id") return false;
    if (header[1] != "operator_id") return false;
    if (header[2] != "created_at") return false;
    return true;
  }

}

