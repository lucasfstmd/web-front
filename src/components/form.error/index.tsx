import React, { Component } from 'react'
import { ErrorMessage } from 'formik'
import { withTranslation, WithTranslation } from 'react-i18next'

import { Theme, Typography } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'

const Style = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        textAlign: 'center',
        color: theme.palette.error.main,
        padding: theme.spacing(1)
    }
})

/**
 * @private
 * @property {string} name
 */
interface IProps extends WithStyles<typeof Style> {
    readonly name: string
}

type Props = IProps & WithTranslation

/**
 * Component that renders the error in input fields.
 * @alias FormErrorMessage
 * @component
 * @category Components
 * @subcategory Error
 * @property {string} name Name field
 */
class FormErrorMessageComponent extends Component<Props> {

    /**
     * @public
     * @param {string} name Name field
     * @returns {*} Error
     */
    public response(name: string): any {
        return <ErrorMessage name={name} component="span"/>
    }

    /**
     * @public
     * @returns {React.ReactNode} Element text error
     */
    public render() {
        const { name, classes, t } = this.props
        return <div className={classes.root} id={`div_error_${name}`} style={{ padding: 0 }}>
            &ensp;<ErrorMessage
            name={name}
            render={
                (msg: string) => <Typography id={`message_error_${name}`} variant="caption">
                    {t(`${msg}`)}
                </Typography>
            }/>
        </div>
    }
}

const FormErrorMessageWithTranslation = withTranslation()(FormErrorMessageComponent)

const FormErrorMessage = withStyles<any>(Style)(FormErrorMessageWithTranslation)

export default FormErrorMessage
