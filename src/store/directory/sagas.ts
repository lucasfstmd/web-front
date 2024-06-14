import { PayloadAction } from '@reduxjs/toolkit'
import { DeleteType, IAction, IResponseDirectory, Types } from './types'
import { DirectoryActions } from './index'
import { SnackbarActions, SnackBarMessageType } from '../snackbar'
import { all, apply, put, takeLatest } from 'redux-saga/effects'
import directoryService from '../../services/directorys'

export function* directoryRequest(action: PayloadAction<IAction>) {
    const { getSuccess, getFailure } = DirectoryActions
    const { openSnackBar } = SnackbarActions
    try {
        const { currentDirectory } = action.payload
        // @ts-ignore
        const directory: IResponseDirectory = yield apply(directoryService, directoryService.getDirectory, [currentDirectory])
        yield put(getSuccess({
            data: {
                currentDirectory,
                directory
            }
        }))
    } catch (err: any) {
        yield put(getFailure())
        yield put(openSnackBar({
            title: 'Erro Interno.',
            type: SnackBarMessageType.ERROR,
            message: `Erro interno no servidor`
        }))
    }
}

export function* newFolder(action: PayloadAction<IAction>) {
    const { saveSuccess, saveFailure, getDirectory } = DirectoryActions
    const { openSnackBar } = SnackbarActions
    try {
        const { nameNewDirectory, currentDirectory } = action.payload
        // @ts-ignore
        yield apply(directoryService, directoryService.saveNewFolder, [nameNewDirectory, currentDirectory])
        yield put(saveSuccess())
        // @ts-ignore
        yield put(getDirectory({ currentDirectory }))
    } catch (err: any) {
        yield put(saveFailure)
        yield put(openSnackBar({
            title: 'Erro Interno.',
            type: SnackBarMessageType.ERROR,
            message: `Erro interno no servidor`
        }))
    }
}

export function* upload(action: PayloadAction<IAction>) {
    const { uploadSuccess, uploadFailure, getDirectory } = DirectoryActions
    const { openSnackBar } = SnackbarActions
    try {
        const { files, currentDirectory } = action.payload
        // @ts-ignore
        yield apply(directoryService, directoryService.uploadFiles, [files, currentDirectory])
        yield put(uploadSuccess())
        // @ts-ignore
        yield put(getDirectory({ currentDirectory }))
    } catch (err: any) {
        yield put(uploadFailure)
        yield put(openSnackBar({
            title: 'Erro Interno.',
            type: SnackBarMessageType.ERROR,
            message: `Erro interno no servidor`
        }))
    }
}

export function* deleteRequest(action: PayloadAction<IAction>) {
    const { deleteFailure, deleteSuccess, getDirectory } = DirectoryActions
    const { openSnackBar } = SnackbarActions
    try {
        const { id, currentDirectory, deleteType } = action.payload
        if (deleteType === DeleteType.FOLDER) {
            // @ts-ignore
            yield apply(directoryService, directoryService.deleteFoder, [id])
            // @ts-ignore
            yield put(getDirectory({ currentDirectory }))
            yield put(deleteSuccess())
        }
        if (deleteType === DeleteType.FILE) {
            // @ts-ignore
            yield apply(directoryService, directoryService.deleteFile, [id])
            // @ts-ignore
            yield put(getDirectory({ currentDirectory }))
            yield put(deleteSuccess())
        }
    } catch (err: any) {
        yield put(deleteFailure())
        yield put(openSnackBar({
            title: 'Erro Interno.',
            type: SnackBarMessageType.ERROR,
            message: `Erro interno no servidor`
        }))
    }
}

const directorySaga = function* () {
    yield all([
        takeLatest(Types.GET_DIRECTORY_REQUEST, directoryRequest),
        takeLatest(Types.SAVE_FOLDER_REQUEST, newFolder),
        takeLatest(Types.UPLOAD_FILE_REQUEST, upload),
        takeLatest(Types.DELETE_REQUEST, deleteRequest),
    ])
}

export default directorySaga
