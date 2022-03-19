import { Component, OnInit } from '@angular/core';
import { Animal } from '../animal'

import { AnimalService } from '../animal.service';
import { MessageService } from'../message.service';

@Component({
  selector: 'app-animal-lab',
  templateUrl: './animal-lab.component.html',
  styleUrls: ['./animal-lab.component.css']
})
export class AnimalLabComponent implements OnInit {

  animals: Animal[] = [];

  selectedAnimal?: Animal;

  constructor(private animalService: AnimalService, private messageService: MessageService) {

   }

  getAnimals(): void {
    this.animalService.getAnimals().subscribe(animals => this.animals = animals);
  }

  ngOnInit(): void {
    this.getAnimals();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.animalService.addAnimal({ name } as Animal)
      .subscribe(animal => {
        this.animals.push(animal);
      });
  }

  delete(animal: Animal): void {
    this.animals = this.animals.filter(h => h !== animal);
    this.animalService.deleteAnimal(animal.id).subscribe();
  }

  onSelect(animal: Animal): void {
    this.selectedAnimal = animal;
    this.messageService.add(`AnimalComponent: Selected animal id=${animal.id}`)
  }
}
