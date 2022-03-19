import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalLabComponent } from './animal-lab.component';

describe('AnimalLabComponent', () => {
  let component: AnimalLabComponent;
  let fixture: ComponentFixture<AnimalLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
