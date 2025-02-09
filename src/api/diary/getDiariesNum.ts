import { requestHandler } from "../useRequest";

import type { GetDiaryNumRequest, GetDiaryNumResponse } from "./model";

export function GetDiariesList(udr:GetDiaryNumRequest):Promise<GetDiaryNumResponse> {
    return requestHandler.Post('/register', udr, false, true)
}