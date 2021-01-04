import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {Beer} from '../types/beer.interface';
import {User} from '../types/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'client-beer-selection',
  templateUrl: './beer-selection.component.html',
  styleUrls: ['./beer-selection.component.scss']
})
export class BeerSelectionComponent implements OnInit {

  public availableBeers: Observable<Beer[]>;

  public selectedBeers: Beer[] = [];

  private readonly LINK = 'https://blind-tasting.firebaseapp.com/beer';
  public links: { beerName: string, link: string }[] = [];

  constructor(private angularFirestore: AngularFirestore,
              private angularFireAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.angularFireAuth.authState.pipe(take(1)).subscribe(a => {
      console.log(a);
      this.availableBeers = this.angularFirestore.collection<Beer>('beers').valueChanges();
    });
  }

  createNewUser(): void {
    const beers = this.selectedBeers.map(beer => ({guessed: '', rating: 0, beer}));
    const newUser = {id: '', beers};
    this.angularFirestore.collection<User>('users').add(newUser)
      .then(document =>
        this.selectedBeers.forEach(beer => this.links.push({
          beerName: beer.brewery + ' - ' + beer.name,
          link: `${this.LINK}?userId=${document.id}&beerId=${beer.id}`
        })))
      .catch(err => console.error(err));
  }

  beerToggled(beer: Beer): void {
    const updatedSelectedBeers = this.selectedBeers.filter(selectedBeers => selectedBeers !== beer);
    if (this.selectedBeers.length === updatedSelectedBeers.length) {
      updatedSelectedBeers.push(beer);
    }
    this.selectedBeers = updatedSelectedBeers;
  }
}
