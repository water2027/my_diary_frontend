import { requestHandler } from "../useRequest";

import type { RegisterRequest, RegisterResponse } from "./model";

export function UserRegister(rr:RegisterRequest):Promise<RegisterResponse> {
    return requestHandler.Post('/register', rr, false, true)
}