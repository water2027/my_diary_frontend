import type { Examiner } from "../model";
export interface Diary {
    diaryId: number;
    userId: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isPublic: boolean;
}

export class CreateDiaryRequest implements Examiner {
    title: string;
    content: string;
    isPublic: boolean;
    constructor(title: string, content: string, isPublic: boolean) {
        this.title = title;
        this.content = content;
        this.isPublic = isPublic;
    }
    Examine(): boolean {
        const newTitle = this.title.replace(/\s+/g, "");
        const newContent = this.content.replace(/\s+/g, "");
        return newTitle !== "" && newContent !== "";
    }
}

export type CreateDiaryResponse = null;

export interface GetDiaryRequest {
    diaryId: number;
}

export interface GetDiaryResponse {
    author: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetDiaryNumRequest {
    isPublicSearch: boolean;
}

export interface GetDiaryNumResponse {
    count: number;
}

export interface GetDiaryListRequest {
    isPublicSearch: boolean;
    offset: number;
    limit: number;
}

export interface GetDiaryListResponse {
    diaries: Diary[];
}

export class UpdateDiaryRequest implements Examiner {
    diaryId: number;
    title: string;
    content: string;
    isPublic: boolean;
    constructor(diaryId: number, title: string, content: string, isPublic: boolean) {
        this.diaryId = diaryId;
        this.title = title;
        this.content = content;
        this.isPublic = isPublic;
    }
    Examine(): boolean {
        const newTitle = this.title.replace(/\s+/g, "");
        const newContent = this.content.replace(/\s+/g, "");
        return newTitle !== "" && newContent !== "";
    }
}

export type UpdateDiaryResponse = null;

export interface DeleteDiaryRequest {
    diaryId: number;
}

export type DeleteDiaryResponse = null;