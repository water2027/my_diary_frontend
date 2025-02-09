import { requestHandler } from "../useRequest";

import type { CreateDiaryRequest, CreateDiaryResponse } from "./model";

export function CreateDiary(cdr:CreateDiaryRequest):Promise<CreateDiaryResponse> {
    return requestHandler.Post('/register', cdr, false, true)
}