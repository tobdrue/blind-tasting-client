import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UploadTask} from '@angular/fire/storage/interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireUploadTask} from '@angular/fire/storage';
import {storage} from 'firebase/app';
import {FileManagerService} from '../../services/file-manager.service';


export interface ImageUpload {
  task: UploadTask;
  uploadPercentage: Observable<number | undefined>;
  src: Promise<string>;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input()
  public maxImages: number;

  @Input()
  public folderName: string;

  @Output()
  public imageRefListChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output()
  public uploadFinished: EventEmitter<boolean> = new EventEmitter<boolean>();

  private uploadFinishedCount = 0;

  // tslint:disable-next-line:variable-name
  private _imageRefList: BehaviorSubject<string[]> = new BehaviorSubject([]);

  public set imageRefList(list: string[]) {
    this._imageRefList.next(list);
    this.imageRefListChange.emit(list);
  }

  public get imageRefList(): string[] {
    return this._imageRefList.getValue();
  }


  @ViewChild('file', {static: false})
  private file;

  public files: Set<ImageUpload> = new Set();

  public dropzoneActive = false;

  constructor(public fileManagerService: FileManagerService,
              private snackBar: MatSnackBar) {
  }

  onFilesAdded(): void {
    const files: FileList = this.file.nativeElement.files;
    this.uploadFiles(files);
  }

  addFiles(): void {
    this.file.nativeElement.click();
  }

  deleteFile(task: ImageUpload): void {
    if (task.task.snapshot.state !== 'success') {
      task.task.cancel();
    } else {
      task.task.snapshot.ref.delete().catch(e => console.log(e));
      this.uploadFinishedCount--;
    }
    this.files.delete(task);

    this.uploadFinished.emit(this.uploadFinishedCount === this.files.size);
    this.imageRefList = this.imageRefList.filter(savedSrc => task.task.snapshot.ref.fullPath !== savedSrc);
  }

  dropzoneState($event: boolean): void {
    this.dropzoneActive = $event;
  }

  uploadFiles(fileList: FileList): void {
    const newFiles = Array.from(fileList);

    if (this.files.size + newFiles.length > this.maxImages) {
      this.snackBar.open('You reached the max size');
    } else {
      const uploads = this.fileManagerService.uploadFiles(newFiles, this.folderName);
      uploads.forEach(upload => {
        this.storeUpload(upload);
      });
    }
  }

  private storeUpload(upload: AngularFireUploadTask): void {
    const imageUpload: ImageUpload = {
      task: upload.task,
      uploadPercentage: upload.percentageChanges(),
      src: upload.task.snapshot.ref.getDownloadURL()
    };
    this.files.add(imageUpload);

    this.uploadFinished.emit(this.uploadFinishedCount === this.files.size);
    imageUpload.task.on(storage.TaskEvent.STATE_CHANGED, null, null, () => {
      this.uploadFinishedCount++;
      this.uploadFinished.emit(this.uploadFinishedCount === this.files.size);
      this.imageRefList = [...this.imageRefList, imageUpload.task.snapshot.ref.fullPath];
    });
  }
}
