import { AsyncStateStatus } from '../root.types'

export enum Types {
    GET_DIRECTORY_REQUEST = '@directory/getDirectory',
    GET_DIRECTORY_SUCCESS = '@directory/getSuccess',
    GET_DIRECTORY_FAILIRE = '@directory/getFailure',
    SAVE_FOLDER_REQUEST = '@directory/saveRequest',
    SAVE_FOLDER_SUCCESS = '@directory/saveSuccess',
    SAVE_FOLDER_FAILURE = '@directory/saveFailure',
    UPLOAD_FILE_REQUEST = '@directory/uploadRequest',
    UPLOAD_FILE_SUCCESS = '@directory/uploadSuccess',
    UPLOAD_FILE_FAILURE = '@directory/uploadFailure',
}

export interface IAction {
    readonly currentDirectory?: string
    readonly nameNewDirectory?: string
    readonly files?: FormData
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

export interface IStateNewFolder {
    readonly status: AsyncStateStatus
}

export interface IStateUpload {
    readonly status: AsyncStateStatus
}

export interface DirectoryState {
    request: IStateRequest
    save: IStateNewFolder
    upload: IStateUpload
}
