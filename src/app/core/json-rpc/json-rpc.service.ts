import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { map, Observable } from 'rxjs';

import { JsonRpcRequest } from './interfaces/json-rpc-request.interface';
import { JsonRpcResponse } from './interfaces/json-rpc-response.interface';
import { JsonRpcError } from './errors/json-rpc.error';

@Injectable({
  providedIn: 'root'
})
export class JsonRpcService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  public call<Result, Params extends Array<any>>(
    apiUrl: string,
    method: string,
    ...params: Params
  ): Observable<Result> {
    const request: JsonRpcRequest<Params> = { 
      id: uuidv4(), 
      method,
      params,
    };

   return this.httpClient.post<JsonRpcResponse<Result>>(
      apiUrl, 
      request,
    ).pipe(map(response => {
      if (response.error)
        throw new JsonRpcError(request, response.error);
      
      return response.result;
    }));
  }
}
