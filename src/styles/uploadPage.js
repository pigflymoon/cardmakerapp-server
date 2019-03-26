const drawerWidth = 360;
export const uploadStyles = theme => ({
    root: {
        width: '100%',
        // height: 430,
        minHeight: 430,
        marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing.unit,
        borderStyle: 'dotted',
        borderWidth: 1,
        borderColor: 'gray',
    },
    textField: {
        flexBasis: 200,
    },
    textLongField: {
        flexBasis: 500,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    // drawerPaper: {
    //     position: 'relative',
    //     // height: '100%',
    //     width: drawerWidth,
    // },
    drawerHeader: theme.mixins.toolbar,
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    button: {
        margin: theme.spacing.unit,
        textTransform: 'capitalize',
    },
    input: {
        display: 'none',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    filesWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    file: {
        margin: 4,
        fontSize: 14,
    },
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
    imgPreview: {
        height: 'auto',
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    paperContainer: {
        padding: 20,
    }


});