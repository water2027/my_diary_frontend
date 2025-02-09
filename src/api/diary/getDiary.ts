import { requestHandler } from "../useRequest";
import type { Result } from "../useRequest";

import type { GetDiaryRequest, GetDiaryResponse } from "./model";

export function GetDiary(gdr:GetDiaryRequest):Result<GetDiaryResponse> {
    return requestHandler.Post('/register', gdr, false, false)
}