import React, { Component, lazy } from 'react'

import { WithTranslation, withTranslation } from 'react-i18next'
import { SvgIcon } from '@mui/material'
import { SearchOff } from '@mui/icons-material'

const EscapePage = lazy(() => import('./escape.component'))

/**
 * Page that renders not found escape page.
 * @alias NotFound
 * @component
 * @category Components
 * @subcategory Escape Pages
 */
class NotFoundComponent extends Component<WithTranslation> {

    /**
     * @public
     * @returns {React.ReactNode} Render the escape page.
     */
    public render() {
        const { t } = this.props

        return <EscapePage
            image={
                <SvgIcon
                    titleAccess={t('ESCAPE_PAGE.NOT_FOUND.TITLE')}
                    component={SearchOff}
                    color="primary"
                    sx={{ width: 150, height: 150 }}/>
            }
            helmet={t('ESCAPE_PAGE.NOT_FOUND.HELMET')}
            title={t('ESCAPE_PAGE.NOT_FOUND.TITLE')}
            description={t('ESCAPE_PAGE.NOT_FOUND.DESCRIPTION')}/>
    }
}

const NotFound: any = withTranslation()(NotFoundComponent)

export default NotFound
