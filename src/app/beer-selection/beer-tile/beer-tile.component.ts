import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileManagerService} from '../../services/file-manager.service';
import {Observable} from 'rxjs';
import {Beer} from '../../types/beer.interface';

@Component({
  selector: 'client-beer-tile',
  templateUrl: './beer-tile.component.html',
  styleUrls: ['./beer-tile.component.scss']
})
export class BeerTileComponent implements OnInit {

  @Input()
  public beer: Beer;

  @Output()
  public beerToggled = new EventEmitter<Beer>();
  public beerIconSrc: Observable<string>;

  public beerSelected = false;

  constructor(private fileManagerService: FileManagerService) {
  }

  ngOnInit(): void {
    this.beerIconSrc = this.fileManagerService.downLoadUrl(this.beer.beerIcon);
  }

  beerClicked(): void {
    this.beerToggled.emit(this.beer);
    this.beerSelected = !this.beerSelected;
  }
}
