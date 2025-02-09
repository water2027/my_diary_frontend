import { requestHandler } from "../useRequest";

import type { DeleteDiaryRequest, DeleteDiaryResponse } from "./model";

export function DeleteDiary(ddr:DeleteDiaryRequest):Promise<DeleteDiaryResponse> {
    return requestHandler.Post('/register', ddr, false, true)
}