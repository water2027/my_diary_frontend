import { requestHandler } from "../useRequest";

import type { UpdateDiaryRequest, UpdateDiaryResponse } from "./model";

export function UpdateDiary(udr:UpdateDiaryRequest):Promise<UpdateDiaryResponse> {
    return requestHandler.Post('/register', udr, false, true)
}