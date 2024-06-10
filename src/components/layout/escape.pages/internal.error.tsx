import React, { Component, lazy } from 'react'

import { WithTranslation, withTranslation } from 'react-i18next'
import { SvgIcon } from '@mui/material'
import { RoomPreferences } from '@mui/icons-material'

const EscapePage = lazy(() => import('./escape.component'))

/**
 * Page that renders internal server error escape page.
 * @alias InternalError
 * @component
 * @category Components
 * @subcategory Escape Pages
 */
class InternalErrorComponent extends Component<WithTranslation> {

    /**
     * @public
     * @returns {React.ReactNode} Render the escape page.
     */
    public render() {
        const { t } = this.props

        return <EscapePage
            image={
                <SvgIcon
                    titleAccess={t('ESCAPE_PAGE.INTERNAL_ERROR.TITLE')}
                    component={RoomPreferences}
                    color="primary"
                    sx={{ width: 150, height: 150 }}/>
            }
            title={t('ESCAPE_PAGE.INTERNAL_ERROR.TITLE')}
            helmet={t('ESCAPE_PAGE.INTERNAL_ERROR.HELMET')}
            description={t('ESCAPE_PAGE.INTERNAL_ERROR.DESCRIPTION')}/>
    }
}

const InternalError: any = withTranslation()(InternalErrorComponent)

export default InternalError
