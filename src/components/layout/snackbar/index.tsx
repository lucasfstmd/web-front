import React, { Component } from 'react'

import { WithTranslation, withTranslation } from 'react-i18next'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import { connect } from 'react-redux'
import { Alert as MuiAlert, AlertProps, Box, Snackbar, Theme, Typography } from '@mui/material'

import { ApplicationState } from '../../../store/root.types'
import { IActionsOpenSnackBar, SnackbarActions, SnackBarMessageType } from '../../../store/snackbar'

const Style = (theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing(3)
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        maxWidth: '250px'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '12px'
    },
    message: {
        fontSize: '12px'
    }
})

export const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

/**
 * @private
 * @property {boolean} open
 * @property {string} title
 * @property {string} message
 * @property {SnackBarMessageType} type
 * @property {function} close
 */
interface IProps extends WithStyles<typeof Style> {
    readonly open: boolean
    readonly title: string
    readonly message: string
    readonly type: SnackBarMessageType

    openSnackBar(data: IActionsOpenSnackBar): void

    closeSnackBar(): void
}

type Props = IProps & WithTranslation

/**
 * Component that renders a snackbar containing a title and a system alert message.
 * @component
 * @category Components
 * @subcategory layout
 * @property {boolean} open property that controls the visibility of the snackbar
 * @property {string} title Title that will appear in the snackbar
 * @property {string} message Message that will appear in snackbar
 * @property {SnackBarMessageType} type property that defines the type of snackbar
 * @property {function} close function that triggers the closing of the snackbar
 */
class SnackbarComponent extends Component<Props> {
    /**
     * Is invoked immediately after any update occurs. This method is not called by the initial render.
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidupdate}
     * @public
     * @param {Readonly<Props>} prevProps
     * @param {Readonly<{}>} prevState
     * @param {*} [snapshot]
     * @returns {void}
     */
    public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any) {
        const {
            open,
            message,
            type,
            title,
            openSnackBar,
            closeSnackBar
        } = this.props
        const {
            message: prevMessage,
            type: prevType,
            title: prevTitle
        } = prevProps
        const hasUpdate: boolean = Boolean(message && prevMessage && type && prevType && title && prevTitle)
        const hasDiff: boolean = (message !== prevMessage || type !== prevType || title !== prevTitle)
        if (open && hasUpdate && hasDiff) {
            closeSnackBar()
            window.setTimeout(() => {
                openSnackBar({ title, type, message })
            }, 0)
        }
    }

    /**
     * @public
     * @returns {React.ReactNode} Custom alert for system messages
     */
    public render() {
        const {
            closeSnackBar,
            open,
            message,
            title,
            type,
            classes,
            t
        } = this.props

        let horizontal: any = 'right'
        let vertical: any = 'top'

        if (window?.innerWidth <= 360) {
            horizontal = 'center'
            vertical = 'bottom'
        }

        return <Snackbar
            id="snackbar-component"
            open={open}
            autoHideDuration={3000}
            onClose={closeSnackBar}
            className={classes.root}
            anchorOrigin={{ vertical, horizontal }}>
            <MuiAlert id="alert-system" onClose={closeSnackBar} severity={type}>
                <Box className={classes.container}>
                    {
                        !!title && <Typography id="alert-title" className={classes.title}>{t(title)}</Typography>
                    }
                    {
                        !!message &&
                        <Typography id="alert-message" className={classes.message}>{t(message)}</Typography>
                    }
                </Box>
            </MuiAlert>
        </Snackbar>
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    open: state.snackbar.open,
    title: state.snackbar.title,
    message: state.snackbar.message,
    type: state.snackbar.type
})

const SnackBarWithTranslations: any = withTranslation()(SnackbarComponent)

const SnackBarWithStyle: any = withStyles<any>(Style)(SnackBarWithTranslations)

export default connect(mapStateToProps, SnackbarActions)(SnackBarWithStyle)


