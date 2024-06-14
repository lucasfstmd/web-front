import React, { Component } from 'react'
import { Box, Button, TextField, Theme } from '@mui/material'
import { withTranslation, WithTranslation } from 'react-i18next'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const profileStyle = (theme: Theme) => createStyles({

})

type IJoinProps = WithTranslation & WithStyles<typeof profileStyle, true>


class Menu1Component extends Component<IJoinProps> {

    constructor(props: IJoinProps) {
        super(props)
    }

    /**
     * Method belonging to the component's life cycle, triggered immediately after a component is assembled (inserted in the tree).
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @return {void}
     */
    public componentDidMount() {
        const { t } = this.props
        document.title = `${t('Perfil')}`
    }

    /**
     * Render method.
     * Triggering method to render the component.
     * @return {JSX.Element} Component to be rendered.
     */
    public render() {
        const {
            theme
        } = this.props

        return <React.Fragment>
            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Box
                    style={{
                        backgroundColor: '#454899',
                        width: '749px',
                        heigth: '539px',
                        margin: '5vh'
                    }}
                    mt={5}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <AccountCircleIcon
                        sx={{ fontSize: 120 }}
                        style={{
                            margin: '5vh',
                            color: theme.palette.secondary.main
                        }}
                    />
                    <TextField color='white' style={{
                        margin: '1vh',
                        width: '80%'
                    }} id="outlined-basic" label="Editar Email" variant="outlined" />
                    <TextField color='white' style={{
                        margin: '1vh',
                        width: '80%'
                    }} id="outlined-basic" label="Senha Atual" variant="outlined" />
                    <TextField color='white' style={{
                        margin: '1vh',
                        width: '80%'
                    }} id="outlined-basic" label="Nova Senha" variant="outlined" />
                    <TextField color='white' style={{
                        margin: '1vh',
                        width: '80%'
                    }} id="outlined-basic" label="Repetir Nova Senha" variant="outlined" />
                    <Box m={1}>
                        <Button style={{
                            backgroundColor: theme.palette.primary.background,
                            color: theme.palette.secondary.main
                        }} >
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>

    }
}

const ProfileWithTranslation: any = withTranslation()(Menu1Component)

const ProfileWithStyle = withStyles<any>(profileStyle, { withTheme: true })(ProfileWithTranslation)

export default ProfileWithStyle
