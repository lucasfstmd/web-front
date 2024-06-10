import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

export enum SnackBarMessageType {
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
    SUCCESS = 'success'
}

export interface SnackBarState {
    readonly open: boolean
    readonly message: string
    readonly title: string
    readonly type: SnackBarMessageType
}

export interface IActionsOpenSnackBar {
    readonly type: SnackBarMessageType
    readonly title: string
    readonly message: string
}

const initialState: SnackBarState = {
    open: false,
    title: '',
    message: '',
    type: SnackBarMessageType.INFO
}

export const snackbarSlice = createSlice({
    name: '@snackbar',
    initialState,
    reducers: {
        openSnackBar: (state: Draft<SnackBarState>, action: PayloadAction<IActionsOpenSnackBar>) => {
            const { title, type, message } = action.payload
            state.open = true
            state.title = title
            state.type = type
            state.message = message
        },
        closeSnackBar: (state: Draft<SnackBarState>) => {
            state.open = initialState.open
            state.title = initialState.title
            state.message = initialState.message
            state.type = initialState.type
        }
    }
})

/**
 * <h5>Actions used to manipulate the application's layout.</h5>
 * @see {@link https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions}
 * @typedef SnackbarActions
 * @namespace SnackbarActions
 * @category React
 * @subcategory Redux / Actions
 *
 * @property {Function} open
 * @property {Function} close
 */
export const SnackbarActions = snackbarSlice.actions

export default snackbarSlice.reducer

