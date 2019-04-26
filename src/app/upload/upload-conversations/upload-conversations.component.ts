import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-upload-conversations',
  templateUrl: './upload-conversations.component.html',
  styleUrls: ['./upload-conversations.component.css']
})

export class UploadConversationsComponent implements OnInit {

  selected: boolean = false;
  status: string = "Upload File";
  uploadCount: number;
  successUploadCount: number;
  records: number;

  private data;
  private collection: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.collection = db.collection('conversations');
  }

  ngOnInit() {

  }

  onChange(event) {
    this.selected = true;
    this.status = "reading..."
    var files = event.srcElement.files;
    // console.log(files)
    let fileReader = new FileReader();
    fileReader.readAsText(files[0]);
    fileReader.onload = (e) => {
      this.parse(fileReader.result);
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
    if (i >= this.data.length){
      finishedCallback(self);
      return;
    }
      
    try {
      var record = this.data[i];
      var doc = {
        operator_id: record[1],
        created_at: record[2]
      }

      this.collection.doc(record[0]).set(doc, {'merge':true})
        .then(function () {
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
    }
  }

  private validate(header): boolean {
    if (header.length != 3) return false;
    if (header[0] != "conversation_id") return false;
    if (header[1] != "operator_id") return false;
    if (header[2] != "created_at") return false;
    return true;
  }

}

