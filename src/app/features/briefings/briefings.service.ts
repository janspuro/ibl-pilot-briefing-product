import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ConfigService } from '../../core/config/config.service';
import { JsonRpcService } from '../../core/json-rpc/json-rpc.service';
import { BriefingParams } from './interfaces/birefing-params.interface';
import { Briefing } from './interfaces/birefing.interface';
import { BriefingReport } from './interfaces/briefing-report.interface';

@Injectable({
  providedIn: 'root'
})
export class BriefingsService {
  constructor(
    private configService: ConfigService,
    private jsonRpcService: JsonRpcService,
  ) {}

  public create(params: BriefingParams): Observable<Briefing> {
    const apiUrl = this.configService.apiUrl;

    return this.jsonRpcService.call<BriefingReport[], [BriefingParams]>(
      apiUrl + '/opmetquery', 
      'query',
      params,
    ).pipe(map(reports => ({ reports })));
  }
}
