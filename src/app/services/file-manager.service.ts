import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private storage: AngularFireStorage) {
  }


  public uploadFile(file: File, folderName: string): AngularFireUploadTask {
    const savingPath = `${folderName}/${file.name}`;
    const task = this.storage.upload(savingPath, file);
    return task;
  }

  public uploadFiles(files: File[], folderName: string): AngularFireUploadTask[] {
    const tasks = files.map(file => this.storage.upload(`${folderName}/${file.name}`, file));
    return tasks;
  }

  public downLoadUrl(ref: string): Observable<string> {
    return this.storage.ref(ref).getDownloadURL();
  }
}
