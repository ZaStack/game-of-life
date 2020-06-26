import React from 'react';
import { Paper, ButtonGroup, Select, FormControl, MenuItem, InputLabel, Button, Typography, Toolbar, AppBar, makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '10px',
        width: '80%',
        backgroundColor: '#404040',
        borderRadius: '20px',
        
    },
    appbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '5px',
        width: '100%',
        backgroundColor: '#A49FB0',
        borderRadius: '20px',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
        fontSize: '3rem',
        color: '#404040'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        
    },
    selectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px'
        
    }
}));

const ButtonBar = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <AppBar position='static' className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant='h6' className={classes.title}>
                        Generation: {props.genCount}
                    </Typography>
                    <div className={classes.selectionContainer}>
                        <ButtonGroup
                            color='#454545'
                            aria-label='outlined primary button group'
                            className={classes.buttongroup}>
                            <Button onClick={props.setRunning}>
                                {props.running ? 'stop' : 'start'}
                            </Button>
                            <Button onClick={props.seedGrid}>Seed</Button>
                            <Button
                                onClick={() =>
                                    props.clearGrid(props.generateEmptyGrid)
                                }>
                                Clear
                            </Button>
                        </ButtonGroup>
                        <FormControl className={classes.formControl}>
                            <InputLabel id='size-select-label'>Size</InputLabel>
                            <Select
                                labelId='size-select-label'
                                id='size-select'
                                // value={props.size}
                            >
                                <MenuItem onClick={props.setSmall}>Small</MenuItem>
                                <MenuItem onClick={props.setMedium}>
                                    Medium
                                </MenuItem>
                                <MenuItem onClick={props.setLarge}>Large</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id='color-select-label'>Color</InputLabel>
                            <Select labelId='color-select-label' id='color-select'>
                                <MenuItem onClick={() => props.setColor('red')}>
                                    Red
                                </MenuItem>
                                <MenuItem onClick={() => props.setColor('purple')}>
                                    Purple
                                </MenuItem>
                                <MenuItem onClick={() => props.setColor('green')}>
                                    Green
                                </MenuItem>
                                <MenuItem onClick={() => props.setColor('pink')}>
                                    Pink
                                </MenuItem>
                                <MenuItem onClick={() => props.setColor('orange')}>
                                    Orange
                                </MenuItem>
                                <MenuItem onClick={() => props.setColor('blue')}>
                                    Blue
                                </MenuItem>
                                <MenuItem onClick={() => props.setColor('yellow')}>
                                    Yellow
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Toolbar>
            </AppBar>
        </Paper>
    );
};

export default ButtonBar;
