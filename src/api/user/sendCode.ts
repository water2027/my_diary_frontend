import { requestHandler } from "../useRequest";

import type { SendCodeRequest, SendCodeResponse } from "./model";

export function SendCode(scr:SendCodeRequest):Promise<SendCodeResponse> {
    return requestHandler.Post('/send-code', scr, false, true)
}