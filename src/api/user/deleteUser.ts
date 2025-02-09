import { requestHandler } from "../useRequest";

import type { DeleteRequest, DeleteResponse } from "./model";

export function UserDelete(dr:DeleteRequest):Promise<DeleteResponse> {
    return requestHandler.Post('/register', dr, false, true)
}