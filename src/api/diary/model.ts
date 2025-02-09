
export interface Diary {
    diaryId: number;
    userId: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isPublic: boolean;
}

export interface CreateDiaryRequest {
    title: string;
    content: string;
    isPublic: boolean;
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

export interface UpdateDiaryRequest {
    diaryId: number;
    title: string;
    content: string;
    isPublic: boolean;
}

export type UpdateDiaryResponse = null;

export interface DeleteDiaryRequest {
    diaryId: number;
}

export type DeleteDiaryResponse = null;