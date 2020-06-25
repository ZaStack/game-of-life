import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ButtonBar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        Generation: {props.genCount}
                    </Typography>
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
                    <FormControl className={classes.formControl}>
                        <InputLabel id='size-select-label'>Size</InputLabel>
                        <Select
                            labelId='size-select-label'
                            id='size-select'
                            // value={props.size}
                        >
                            <MenuItem onClick={props.setSmall}>Small</MenuItem>
                            <MenuItem onClick={props.setMedium}>Medium</MenuItem>
                            <MenuItem onClick={props.setLarge}>Large</MenuItem>
                        </Select>
                    </FormControl>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ButtonBar;
