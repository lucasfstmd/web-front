import React, { Component } from 'react'

import { WithTranslation, withTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
    BottomNavigation,
    BottomNavigationAction,
    Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Drawer,
    List,
    Theme,
    Typography
} from '@mui/material'
import { createStyles, WithStyles, withStyles } from '@mui/styles'
import { Delete, DriveFolderUpload, AccountCircle } from '@mui/icons-material'
import { ThemeMode } from '../../../material.theme'
import axiosInstance from '../../../services/axios'

import { IComponentRouter, withRouter } from '../../with.router'
import { useDropzone } from 'react-dropzone'

export const DRAWER_WIDTH = 220

const NavBarStyle = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.primary.main
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: DRAWER_WIDTH,
            flexShrink: 0
        },
        transition: '.2s all'
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
        transition: '.3s all',
        boxShadow: '2px 50px 10px 0px rgba(0,0,0,0.3)',
        border: 'none !important',
        '&>div': {
            height: '100%'
        }
    },
    toolbar: theme.mixins.toolbar,
    listItemIcon: {
        minWidth: '30px'
    },
    list: {
        height: '100%',
        overflowY: 'auto',
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.1)',
            borderRadius: '5px'
        },
        '&::-webkit-scrollbar': {
            width: '5px',
            height: '5px'
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '5px',
            backgroundColor: theme.palette.secondary.main
        }
    },
    listItemButton: {
        marginTop: `${theme.spacing(0.5)} !important`,
        marginBottom: `${theme.spacing(0.5)} !important`,
        marginLeft: `${theme.spacing(1)} !important`,
        marginRight: `${theme.spacing(1)} !important`,
        borderRadius: `5px !important`
    }
})

const FileUpload = ({ submit, openDialog, setOpenDialog }) => {
    const [uploadedFiles, setUploadedFiles] = React.useState([])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            // @ts-ignore
            setUploadedFiles(acceptedFiles)
        },
    })

    const handleSubmit = () => {
        submit(uploadedFiles)
        setOpenDialog(false)
    }

    return (
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Escolha o Arquivo"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        style={{
                            width: '30vw',
                            height: '100%',
                            backgroundColor: '#F8F8F8'
                        }}
                    >
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Clique aqui ou arraste os Arquivos para cá.</p>
                            <ul>
                                {uploadedFiles.map((file: any) => (
                                    <li key={file.name}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant={'contained'}
                    color={'error'}
                    onClick={() => setOpenDialog(false)}
                >
                    Fechar
                </Button>
                <Button
                    variant={'contained'}
                    color={'secondary'}
                    onClick={handleSubmit}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

/**
 * @private
 * @property {boolean} mobileOpen
 * @property {boolean} desktopOpen
 * @property {ThemeMode} themeMode
 * @property {function} drawerToggle
 * @property {function} closeMobileView
 */
interface Props extends WithStyles<typeof NavBarStyle, true> {
    readonly mobileOpen: boolean
    readonly desktopOpen: boolean
    readonly themeMode: ThemeMode

    drawerToggle(): void

    closeMobileView(): void
}

type IProps = Props & WithTranslation & IComponentRouter

interface IState {
    readonly upload: boolean
}

/**
 * Component that renders the application drawer, responsible for the visibility of the system's navigation menu.
 * @component
 * @category Components
 * @subcategory layout
 * @property {boolean} mobileOpen Controls the visibility of the drawer when it's on mobile devices.
 * @property {boolean} desktopOpen Controls the visibility of the drawer when it's on desktops.
 * @property {ThemeMode} themeMode Theme Material UI
 * @property {function} drawerToggle Function that triggers the visibility of the drawer
 * @property {function} closeMobileView
 */
class NavBar extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)

        this.state = {
            upload: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.setUploadDialog = this.setUploadDialog.bind(this)
    }

    /**
     * Render method.
     * Triggering method to render the component.
     * @public
     * @return {React.ReactNode} Component rendering
     */
    public render() {

        const {
            classes,
            desktopOpen,
            theme,
            location: { pathname },
            navigate
        } = this.props

        const {
            upload
        } = this.state

        const drawer = (
            <Box display="flex" flexDirection="column" className={classes.root}>
                <List id="list_nav_bar_menu" className={classes.list}>
                    <Link to={'#'}
                          style={{ textDecoration: 'none' }}
                          className={classes.listItemButton}
                          onClick={() => this.setState({ upload: true })}
                    >
                        <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                            <DriveFolderUpload sx={{ fontSize: 80 }} style={{ color: theme.palette.secondary.main }}/>
                            <Typography variant={'h5'} style={{ color: theme.palette.secondary.main }}>
                                Upload
                            </Typography>
                        </Box>
                    </Link>

                    <Link to={'/app/home'} style={{ textDecoration: 'none' }} className={classes.listItemButton}>
                        <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                            <AccountCircle sx={{ fontSize: 80 }} style={{ color: theme.palette.secondary.main }}/>
                            <Typography variant={'h5'} style={{ color: theme.palette.secondary.main }}>
                                Perfil
                            </Typography>
                        </Box>
                    </Link>

                    <Link to={'/app/home'} style={{ textDecoration: 'none' }} className={classes.listItemButton}>
                        <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                            <Delete sx={{ fontSize: 80 }} style={{ color: theme.palette.red.main }}/>
                            <Typography variant={'h5'} style={{ color: theme.palette.red.main }}>
                                Lixeira
                            </Typography>
                        </Box>
                    </Link>
                </List>
            </Box>
        )
        const pathNames: string[] = pathname.split('/')
        const value: string = pathNames[pathNames.length - 1]

        return <React.Fragment>

            <Box
                sx={{ display: { xl: 'none', lg: 'none', md: 'none', sm: 'flex', xs: 'flex' } }}
                position="fixed"
                bottom={0}
                width="100%">
                <BottomNavigation
                    sx={{ width: '95%', height: '40px' }}
                    value={value}
                    onChange={(e: any, newValue: string) => navigate(`/app/${newValue}`)}>
                    <BottomNavigationAction value="home" icon={<DriveFolderUpload/>}/>
                    <BottomNavigationAction value="menu1" icon={<AccountCircle/>}/>
                    <BottomNavigationAction value="menu2" icon={<Delete/>}/>
                </BottomNavigation>
            </Box>

            <Box sx={{ display: { xl: 'flex', lg: 'flex', md: 'flex', sm: 'none', xs: 'none' } }}>
                <nav className={desktopOpen ? classes.drawer : ''}>

                    <Drawer
                        id="drawer_desktop"
                        open={desktopOpen}
                        variant="persistent"
                        classes={{ paper: classes.drawerPaper }}>
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
            <FileUpload submit={this.handleSubmit} openDialog={upload} setOpenDialog={this.setUploadDialog}/>
        </React.Fragment>
    }

    private handleSubmit(files: any) {
        const formData = new FormData()

        for (const file of files) {
            formData.append("files", file)
        }

        axiosInstance.post(
            `v1/files/upload/666863849c214cfe65dd210d`,
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data",
                }
            }
        ).then((res) => console.log('sucess'))
            .catch((err) => console.log('error'))
    }

    private setUploadDialog(open: boolean) {
        this.setState({ upload: open })
    }
}

const NavBarWithTranslation = withTranslation()(NavBar)

const NavBarWithStyle = withStyles<any>(NavBarStyle, { withTheme: true })(NavBarWithTranslation)

export default withRouter(NavBarWithStyle)
