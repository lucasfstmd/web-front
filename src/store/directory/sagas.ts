import { PayloadAction } from '@reduxjs/toolkit'
import { IAction, IResponseDirectory, Types } from './types'
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
    const { saveSuccess, saveFailure } = DirectoryActions
    const { openSnackBar } = SnackbarActions
    try {
        const { nameNewDirectory, currentDirectory } = action.payload
        // @ts-ignore
        yield apply(directoryService, directoryService.saveNewFolder, [nameNewDirectory, currentDirectory])
        yield put(saveSuccess())
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
    const { uploadSuccess, uploadFailure } = DirectoryActions
    const { openSnackBar } = SnackbarActions
    try {
        const { files, currentDirectory } = action.payload
        // @ts-ignore
        yield apply(directoryService, directoryService.uploadFiles, [files, currentDirectory])
        yield put(uploadSuccess())
    } catch (err: any) {
        yield put(uploadFailure)
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
    ])
}

export default directorySaga
