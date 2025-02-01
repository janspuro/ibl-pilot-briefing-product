export interface JsonRpcRequest<Params extends Array<any>> {
  id: string;
  method: string;
  params: Params;
}
