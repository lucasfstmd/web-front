import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { IActionsOpenSnackBar } from '../../store/snackbar'
import { connect } from 'react-redux'
import { Folder, Description, Search, Save, ArrowBack } from '@mui/icons-material'
import './home.scss'
import { createStyles, WithStyles, withStyles } from '@mui/styles'
import {
    Box, Button, ButtonGroup,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, TextField,
    Theme
} from '@mui/material'
import { IComponentRouter } from '../../components/with.router'
import { LayoutActions } from '../../store/layout'
import axiosInstance from '../../services/axios'

const homeStyle = (theme: Theme) => createStyles({
    buttonUpload: {
        borderRadius: '10px'
    }
})

interface IProps extends WithStyles<typeof homeStyle, true>  {
    openSnackBar(data: IActionsOpenSnackBar): void
}

interface IState {
    readonly isFolder: boolean
    readonly isFile: boolean
    readonly newFolder: {
        readonly open: boolean
        readonly name: string
    }
    readonly folders: any[]
    readonly files: any[]
    readonly currentDirectory: string
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
            folders: [],
            files: [],
            currentDirectory: '666863849c214cfe65dd210d',
            directoryStack: []
        }

        this.handleFolders = this.handleFolders.bind(this)
        this.handleSaveNewFolder = this.handleSaveNewFolder.bind(this)
        this.handleBack = this.handleBack.bind(this)
    }

    public componentDidMount() {
        const { t } = this.props
        this.handleFolders(this.state.currentDirectory)
        document.title = `${t('HOME.HELMET')}`
    }

    public componentDidUpdate(prevProps: IJoinProps, prevState: IState) {
        if (this.state.currentDirectory !== prevState.currentDirectory) {
            this.handleFolders(this.state.currentDirectory)
        }
    }

    public render() {
        const {
            theme,
            classes
        } = this.props

        const {
            isFile,
            isFolder,
            newFolder,
            folders,
            files,
        } = this.state


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
                                <Box style={{
                                    heigth: '10px',
                                    display: 'flex',
                                    alignItems: 'center'
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
                                                    directoryStack: [...this.state.directoryStack, this.state.currentDirectory],
                                                    currentDirectory: `${folder.id}`
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
                                        <div key={fl._id} className="item" onClick={() => console.log('teste')}>
                                            <Description sx={{ fontSize: 60 }} style={{ color: theme.palette.secondary.main }}/>
                                            <h1>{fl.filename}</h1>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    }

    private handleFolders(directory: string) {
        axiosInstance.get(`v1/directory/${directory}`)
            .then((res) => {
                this.setState({ folders: res.data })
            })
        axiosInstance.get(`v1/files/find/${directory}`)
            .then((res) => {
                this.setState({ files: res.data })
            })
    }

    private handleSaveNewFolder() {
        axiosInstance.post(
            `v1/directory/create/folder/${this.state.currentDirectory}/${this.state.newFolder.name}`
        ).then(() => this.handleFolders(this.state.currentDirectory))
        this.setState({ newFolder: { open: false } })
    }

    private handleBack() {
        const { directoryStack } = this.state
        if (directoryStack.length > 0) {
            const previousDirectory = directoryStack.pop()
            this.setState({ currentDirectory: previousDirectory, directoryStack })
        }
    }
}

const HomeWithTranslation: any = withTranslation()(HomeComponent)

const HomeWithStyle = withStyles<any>(homeStyle, { withTheme: true })(HomeWithTranslation)

const Home: any = connect(undefined, LayoutActions)(HomeWithStyle)

export default Home
