import { requestHandler } from "../useRequest";

import type { LoginRequest, LoginResponse } from "./model";

export function UserLogin(lr:LoginRequest):Promise<LoginResponse> {
    return requestHandler.Post('/login', lr, false, true)
}