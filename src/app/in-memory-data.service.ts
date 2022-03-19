import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Animal } from './animal';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const animals = [
      { id: 1, name: 'Cat', type: 'Mammal', habitat: 'House', numLegs: 4, canFly: false },
      { id: 2, name: 'Dog', type: 'Mammal', habitat: 'House', numLegs: 4, canFly: false },
      { id: 3, name: 'Parrot', type: 'Mammal', habitat: 'House', numLegs: 2, canFly: true },
      { id: 4, name: 'Monkey', type: 'Ape', habitat: 'Jungle', numLegs: 2, canFly: false },
      { id: 5, name: 'Stork', type: 'Bird', habitat: 'Lake', numLegs: 2, canFly: true },
      { id: 6, name: 'Bear', type: 'Mammal', habitat: 'Forest', numLegs: 4, canFly: false },
    ];
    return {animals};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(animals: Animal[]): number {
    return animals.length > 0 ? Math.max(...animals.map(animal => animal.id)) + 1 : 11;
  }
}