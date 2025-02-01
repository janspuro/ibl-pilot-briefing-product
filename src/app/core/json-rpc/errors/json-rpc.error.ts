import { JsonRpcRequest } from "../interfaces/json-rpc-request.interface";
import { JsonRpcError as JsonRpcErrorInterface } from "../interfaces/json-rpc-rerror.interface";

export class JsonRpcError extends Error {
  constructor(
    public readonly request: JsonRpcRequest<any>,
    public readonly error: JsonRpcErrorInterface,
  ) {
    super(error.message);
  }
}