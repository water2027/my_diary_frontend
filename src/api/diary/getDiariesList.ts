import { requestHandler } from "../useRequest";
import type { Result } from "../useRequest";

import type { GetDiaryListRequest, GetDiaryListResponse } from "./model";

export function GetDiaryList(gdlr:GetDiaryListRequest):Result<GetDiaryListResponse> {
    return requestHandler.Post('/register', gdlr, false, false)
}