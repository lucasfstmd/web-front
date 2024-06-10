import React, { Component, lazy } from 'react'

import { WithTranslation, withTranslation } from 'react-i18next'
import { WithStyles } from '@mui/styles'
import { SvgIcon } from '@mui/material'
import { WarningAmber } from '@mui/icons-material'

const EscapePage = lazy(() => import('./escape.component'))

type Props = WithTranslation & WithStyles<any>

/**
 * Page that renders access denied escape page.
 * @alias AccessDenied
 * @component
 * @category Components
 * @subcategory Escape Pages
 */
class AccessDeniedComponent extends Component<Props> {

    /**
     * @public
     * @returns {React.ReactNode} Render the escape page.
     */
    public render() {
        const { t } = this.props

        return <EscapePage
            image={
                <SvgIcon
                    titleAccess={t('ESCAPE_PAGE.ACCESS_DENIED.TITLE')}
                    component={WarningAmber}
                    color="primary"
                    sx={{ width: 150, height: 150 }}/>
            }
            title={t('ESCAPE_PAGE.ACCESS_DENIED.TITLE')}
            helmet={t('ESCAPE_PAGE.ACCESS_DENIED.HELMET')}
            description={t('ESCAPE_PAGE.ACCESS_DENIED.DESCRIPTION')}/>
    }
}

const AccessDenied: any = withTranslation()(AccessDeniedComponent)

export default AccessDenied
