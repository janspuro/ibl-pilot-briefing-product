import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor() { }

  get apiUrl(): string {
    return environment.apiUrl;
  }
}
