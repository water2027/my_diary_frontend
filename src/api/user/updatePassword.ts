import { requestHandler } from "../useRequest";

import type { UpdatePasswordRequest, UpdatePasswordResponse } from "./model";

export function UpdatePassword(upr:UpdatePasswordRequest):Promise<UpdatePasswordResponse> {
    return requestHandler.Post('/register', upr, false, true)
}