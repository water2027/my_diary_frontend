// 检查表单数据是否合法
export interface Examiner {
    Examine():boolean;
}

export function ExamineData(data:Examiner):boolean {
    return data.Examine();
}
