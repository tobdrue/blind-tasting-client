import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'client-upload-new-beer',
  templateUrl: './upload-new-beer.component.html',
  styleUrls: ['./upload-new-beer.component.scss']
})
export class UploadNewBeerComponent implements OnInit {

  public beerFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private fireStore: AngularFirestore,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.beerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      brewery: ['', Validators.required],
      alcohol: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      hints: ['', Validators.required],
      beerType: ['', Validators.required],
      originalWort: ['', Validators.required],
      slogan: ['', Validators.required],
      website: ['', Validators.required],
      breweryIcon: ['', Validators.required],
      beerIcon: ['', Validators.required]
    });
  }

  get brewery(): string {
    return this.beerFormGroup.get('brewery').value;
  }

  set breweryIcon(src: string[]) {
    if (src.length > 0) {
      this.beerFormGroup.get('breweryIcon').setValue(src[0]);
    }
  }

  set beerIcon(src: string[]) {
    if (src.length > 0) {
      this.beerFormGroup.get('beerIcon').setValue(src[0]);
    }
  }

  public createBeer(): void {
    const id = this.fireStore.createId();
    const beer = {
      id,
      brewery: this.brewery,
      name: this.beerFormGroup.get('name').value,
      alcohol: this.beerFormGroup.get('alcohol').value as number,
      description: this.beerFormGroup.get('description').value,
      ingredients: this.beerFormGroup.get('ingredients').value,
      hints: this.beerFormGroup.get('hints').value,
      beerType: this.beerFormGroup.get('beerType').value,
      originalWort: this.beerFormGroup.get('originalWort').value as number,
      slogan: this.beerFormGroup.get('slogan').value,
      website: this.beerFormGroup.get('website').value,
      breweryIcon: this.beerFormGroup.get('breweryIcon').value,
      beerIcon: this.beerFormGroup.get('beerIcon').value
    };
    this.fireStore.collection('beers').doc(id).set(beer)
      .then(_ => {
        this.matSnackBar.open('Beer CREATED');
        this.beerFormGroup.reset();
      })
      .catch(err => console.error(err));
  }

}
