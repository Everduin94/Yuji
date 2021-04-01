import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDatabaseService implements InMemoryDbService {

  createDb(): {} | Observable<{}> | Promise<{}> {
    /*console.log('creating DB', new Date());*/
    return {};
  }

}
