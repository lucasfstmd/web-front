import { AsyncStateStatus } from '../root.types'

export enum Types {
    GET_DIRECTORY_REQUEST = '@directory/getDirectory',
    SAVE_FOLDER_REQUEST = '@directory/saveRequest',
    UPLOAD_FILE_REQUEST = '@directory/uploadRequest',
    DELETE_REQUEST = '@directory/deleteRequest',
}

export interface IAction {
    readonly currentDirectory?: string
    readonly nameNewDirectory?: string
    readonly files?: FormData
    readonly id?: string
    readonly deleteType: DeleteType
}

export enum DeleteType {
    FOLDER = 'folder',
    FILE = 'file',
}

export interface IResponseDirectory {
    readonly folders: Array<any>
    readonly files: Array<any>
}

export interface IStateRequest {
    readonly status: AsyncStateStatus
    readonly currentDirectory: string
    readonly directory: IResponseDirectory
}

export interface IState {
    readonly status: AsyncStateStatus
}

export interface DirectoryState {
    request: IStateRequest
    save: IState
    upload: IState
    delete: IState
}
