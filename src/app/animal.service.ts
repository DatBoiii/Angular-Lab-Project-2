import { Injectable } from '@angular/core';
import { Animal } from './animal';
import { Observable, of } from 'rxjs';
import { MessageService  } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private animalsUrl = 'api/animals';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.animalsUrl)
    .pipe(
      tap(_ => this.log('fetched animals')),
      catchError(this.handleError<Animal[]>('getAnimals',[]))
    );
  }

  getAnimal(id: number): Observable<Animal> {
    const url = `${this.animalsUrl}/${id}`;
    return this.http.get<Animal>(url).pipe(
      tap(_ => this.log(`fetched animal id=${id}`)),
      catchError(this.handleError<Animal>(`getAnimal id=${id}`))
    );
  }

  getAnimalNo404<Data>(id: number): Observable<Animal> {
    const url = `${this.animalsUrl}/?id=${id}`;
    return this.http.get<Animal[]>(url)
      .pipe(
        map(animals => animals[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} animal id=${id}`);
        }),
        catchError(this.handleError<Animal>(`getAnimal id=${id}`))
      );
  }

  updateAnimal(animal: Animal): Observable<any> {
    return this.http.put(this.animalsUrl, animal, this.httpOptions).pipe(
      tap(_ => this.log(`updated animal id=${animal.id}`)),
      catchError(this.handleError<any>('updateAnimal'))
    );
  }

  addAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.animalsUrl, animal, this.httpOptions).pipe(
      tap((newAnimal: Animal) => this.log(`added animal w/ id=${newAnimal.id}`)),
      catchError(this.handleError<Animal>('addAnimal'))
    );
  }


  deleteAnimal(id: number): Observable<Animal> {
  const url = `${this.animalsUrl}/${id}`;

  return this.http.delete<Animal>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted animal id=${id}`)),
    catchError(this.handleError<Animal>('deleteAnimal'))
    );
  }


  searchAnimals(term: string): Observable<Animal[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Animal[]>(`${this.animalsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found animals matching "${term}"`) :
        this.log(`no animals matching "${term}"`)),
      catchError(this.handleError<Animal[]>('searchAnimals', []))
    );
  }
  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`AnimalService: ${message}`);
  }
}
