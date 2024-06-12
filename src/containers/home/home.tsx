import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { IActionsOpenSnackBar } from '../../store/snackbar'
import { connect } from 'react-redux'
import {
    Folder,
    Description,
    Search,
    Save,
    ArrowBack,
    Download
} from '@mui/icons-material'
import './home.scss'
import { createStyles, WithStyles, withStyles } from '@mui/styles'
import {
    Box, Button, ButtonGroup,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel, ListItemIcon, ListItemText, Menu, MenuItem, MenuList,
    OutlinedInput, Paper, TextField,
    Theme,
} from '@mui/material'
import { IComponentRouter } from '../../components/with.router'
import { LayoutActions } from '../../store/layout'
import { ApplicationState } from '../../store/root.types'
import { DirectoryActions } from '../../store/directory'
import { IResponseDirectory } from '../../store/directory/types'
import axiosInstance from '../../services/axios'

const homeStyle = (theme: Theme) => createStyles({
    buttonUpload: {
        borderRadius: '10px'
    }
})

interface IProps extends WithStyles<typeof homeStyle, true>  {
    readonly directory: IResponseDirectory
    readonly currentDirectory: string

    openSnackBar(data: IActionsOpenSnackBar): void

    getDirectory(props: any): void

    saveRequest(props: any): void
}

interface IState {
    readonly isFolder: boolean
    readonly isFile: boolean
    readonly newFolder: {
        readonly open: boolean
        readonly name: string
    }
    readonly anchorEl: null | HTMLElement
    readonly currentDirectoryState: string
    readonly directoryStack: string[]
}

type IJoinProps = IProps & WithTranslation & IComponentRouter

class HomeComponent extends Component<IJoinProps, IState> {
    constructor(props: IJoinProps) {
        super(props)

        this.state = {
            isFolder: true,
            isFile: true,
            newFolder: {
                open: false,
                name: ''
            },
            anchorEl: null,
            currentDirectoryState: props.currentDirectory,
            directoryStack: []
        }

        this.handleSaveNewFolder = this.handleSaveNewFolder.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleDownload = this.handleDownload.bind(this)
    }

    public componentDidMount() {
        const { t } = this.props
        this.props.getDirectory({ currentDirectory: this.props.currentDirectory })
        document.title = `${t('HOME.HELMET')}`
    }

    public componentDidUpdate(prevProps: IJoinProps, prevState: IState) {
        if (this.state.currentDirectoryState !== prevState.currentDirectoryState) {
            this.props.getDirectory({ currentDirectory: this.state.currentDirectoryState })
        }
    }

    public render() {
        const {
            theme,
            classes,
            directory: { folders, files }
        } = this.props

        const {
            isFile,
            isFolder,
            newFolder,
            anchorEl
        } = this.state

        const open = Boolean(anchorEl)

        return <React.Fragment>
            <div className="home">
                <div className="card-header">
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} justifyContent={'space-around'}>
                            <IconButton
                                color={'secondary'}
                                className={classes.buttonUpload}
                                onClick={this.handleBack}
                            >
                                <ArrowBack/>
                            </IconButton>
                            <Box display={'flex'}>
                                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Pesquisar</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        endAdornment={
                                            <InputAdornment position="start">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                >
                                                    <Search/>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <Box
                                    display={'flex'}
                                    alignItems={'center'}
                                    style={{
                                    heigth: '10px',
                                }}>
                                    <ButtonGroup color={'secondary'} variant="contained" aria-label="Basic button group">
                                        <Button
                                            variant={ (isFolder) ? 'contained' : 'outlined' }
                                            onClick={() => {
                                                if (isFile) {
                                                    this.setState({ isFolder: true, isFile: true })
                                                }
                                                this.setState({ isFolder: true, isFile: false })
                                            }}
                                        >
                                            <Folder/>
                                        </Button>
                                        <Button
                                            variant={ (isFile) ? 'contained' : 'outlined' }
                                            onClick={() => {
                                                if (isFolder) {
                                                    this.setState({ isFolder: true, isFile: true })
                                                }
                                                this.setState({ isFolder: false, isFile: true })
                                            }}
                                        >
                                            <Description/>
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color={'secondary'}
                                className={classes.buttonUpload}
                                startIcon={<Folder/>}
                                onClick={() => this.setState({
                                    newFolder: { open: true }
                                })}
                            >
                                Nova Pasta
                            </Button>
                        </Box>
                    </Box>
                </div>
                {
                    isFolder && (
                        <div className="card-body">
                            <div className="containerItem">
                                {
                                    folders.map((folder) => (
                                        <>
                                            <div
                                                key={folder.id}
                                                className="item"
                                                onDoubleClick={() => this.setState({
                                                    directoryStack: [...this.state.directoryStack, this.state.currentDirectoryState],
                                                    currentDirectoryState: `${folder.id}`
                                                })}>
                                                <Folder sx={{ fontSize: 60 }} style={{ color: theme.palette.secondary.main }}/>
                                                <h1>{folder.name}</h1>
                                            </div>
                                        </>
                                    ))
                                }
                                {
                                    newFolder.open && (
                                        <div className="item">
                                            <Folder
                                                onClick={() => this.setState({ newFolder: { open: false } })}
                                                sx={{ fontSize: 60 }}
                                                style={{ color: theme.palette.secondary.main }}
                                            />
                                            <Box
                                                display={'flex'}
                                                justifyContent={'space-around'}
                                                alignItems={'center'}
                                            >
                                                <TextField
                                                    onChange={(e) => this.setState({ newFolder: {
                                                            ...this.state.newFolder,
                                                            name: e.target.value
                                                        } })}
                                                    id="outlined-basic"
                                                    label="Nova pasta"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                                <Save style={{
                                                    margin: '10px',
                                                    color: theme.palette.secondary.main
                                                }}
                                                      onClick={this.handleSaveNewFolder}
                                                />
                                            </Box>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                {
                    isFile && (
                        <div className="card-body">
                            <div className="containerItem">
                                {
                                    files?.map((fl) => (
                                        <>
                                            <div
                                                key={fl._id}
                                                className="item"
                                                onDoubleClick={(e) => this.setState({ anchorEl: e.currentTarget })}>
                                                <Description sx={{ fontSize: 60 }} style={{ color: theme.palette.secondary.main }}/>
                                                <h1>{fl.filename}</h1>
                                            </div>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={() => this.setState({ anchorEl: null })}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <Paper sx={{ width: 320, maxWidth: '100%' }}>
                                                    <MenuList>
                                                        <MenuItem
                                                            onClick={this.handleDownload(fl._id)}
                                                        >
                                                            <ListItemIcon>
                                                                <Download fontSize="small" />
                                                            </ListItemIcon>
                                                            <ListItemText>Baixar</ListItemText>
                                                        </MenuItem>
                                                    </MenuList>
                                                </Paper>
                                            </Menu>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    }

    private handleSaveNewFolder() {
        const { newFolder: { name } } = this.state
        const { currentDirectory } = this.props
        this.props.saveRequest({ nameNewDirectory: name, currentDirectory })
        this.props.getDirectory({ currentDirectory })
    }

    private handleBack() {
        const { directoryStack } = this.state
        if (directoryStack.length > 0) {
            const previousDirectory = directoryStack.pop()
            this.setState({ currentDirectoryState: `${previousDirectory}`, directoryStack })
        }
    }

    private handleDownload(fileId: string) {
        return axiosInstance
            .get(`v1/files/download/${fileId}`)
            .then((res) => res)
    }
}

const HomeWithTranslation: any = withTranslation()(HomeComponent)

const HomeWithStyle = withStyles<any>(homeStyle, { withTheme: true })(HomeWithTranslation)

const mapStateToProps = (state: ApplicationState) => ({
    themeMode: state.layout.themeMode,
    directory: state.directory.request.directory,
    currentDirectory: state.directory.request.currentDirectory,
})

const mapDispatchToProps = {
    ...LayoutActions,
    ...DirectoryActions
}

const Home: any = connect(mapStateToProps, mapDispatchToProps)(HomeWithStyle)

export default Home
