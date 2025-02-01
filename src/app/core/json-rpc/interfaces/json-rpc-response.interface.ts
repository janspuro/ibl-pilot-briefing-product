import { JsonRpcError } from "./json-rpc-rerror.interface";

export interface JsonRpcResponse<Result> {
  id: string;
  error: JsonRpcError;
  result: Result;
}
