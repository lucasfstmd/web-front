import { DirectoryState } from './types'
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { AsyncStateStatus } from '../root.types'

const initialState: DirectoryState = {
    request: {
        status: AsyncStateStatus.INITIAL,
        currentDirectory: '666863849c214cfe65dd210d',
        directory: {
            folders: [],
            files: []
        }
    },
    save: {
        status: AsyncStateStatus.INITIAL,
    },
    upload: {
        status: AsyncStateStatus.INITIAL,
    },
    delete: {
        status: AsyncStateStatus.INITIAL
    }
}

export const directorySlice = createSlice({
    name: '@directory',
    initialState,
    reducers: {
        getDirectory: (state: Draft<DirectoryState>) => {
            state.request.status = AsyncStateStatus.LOADING
        },
        getSuccess: (state: Draft<DirectoryState>, action: PayloadAction<{ data: any }>) => {
            state.request.status = AsyncStateStatus.SUCCESS
            state.request.currentDirectory = action.payload.data.currentDirectory
            state.request.directory = action.payload.data.directory
        },
        getFailure: (state: Draft<DirectoryState>) => {
            state.request.status = AsyncStateStatus.FAILURE
        },
        saveRequest: (state: Draft<DirectoryState>) => {
            state.save.status = AsyncStateStatus.LOADING
        },
        saveSuccess: (state: Draft<DirectoryState>) => {
            state.save.status = AsyncStateStatus.SUCCESS
        },
        saveFailure: (state: Draft<DirectoryState>) => {
            state.save.status = AsyncStateStatus.FAILURE
        },
        uploadRequest: (state: Draft<DirectoryState>) => {
            state.upload.status = AsyncStateStatus.LOADING
        },
        uploadSuccess: (state: Draft<DirectoryState>) => {
            state.upload.status = AsyncStateStatus.SUCCESS
        },
        uploadFailure: (state: Draft<DirectoryState>) => {
            state.upload.status = AsyncStateStatus.FAILURE
        },
        deleteRequest: (state: Draft<DirectoryState>) => {
            state.delete.status = AsyncStateStatus.LOADING
        },
        deleteSuccess: (state: Draft<DirectoryState>) => {
            state.delete.status = AsyncStateStatus.SUCCESS
        },
        deleteFailure: (state: Draft<DirectoryState>) => {
            state.delete.status = AsyncStateStatus.FAILURE
        },
    }
})

export const DirectoryActions = directorySlice.actions

export default directorySlice.reducer
