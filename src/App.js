import React, { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer';
import randomColor from 'randomcolor';
import ButtonBar from './components/app-bar';
import { makeStyles, Paper, Typography } from '@material-ui/core'

const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: 'auto',
            height: 'auto',
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    description: {
        color: '#A49FB0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '1.1rem',
        maxWidth: '80%'
    },
}));

const App = () => {
    const [numRows, setNumRows] = useState(25);
    const [numCols, setNumCols] = useState(40);
    const [color, setColor] = useState('red');
    const [genCount, setGenCount] = useState(0);
    const [running, setRunning] = useState(false);
    const classes = useStyles();
    let runningCount = 0;

    //Functions to pass to the appbar component for sizing the grid
    const setSmall = () => {
        setNumRows(25);
        setNumCols(40);
    };
    const setMedium = () => {
        setNumRows(40);
        setNumCols(60);
    };
    const setLarge = () => {
        setNumRows(60);
        setNumCols(80);
    };

    // Generate the empty grid

    const generateEmptyGrid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
        }
        return rows;
    };

    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    });

    //Seed the empty grid on render, and button click

    const seedGrid = useCallback(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
            );
        }
        setGrid(rows);
    }, [numCols, numRows]);

    useEffect(() => {
        seedGrid();
    }, [seedGrid, numRows, numCols]);

    //Run simulation
    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        setGenCount(runningCount++);
        setGrid((g) => {
            return produce(g, (gridCopy) => {
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            if (
                                newI >= 0 &&
                                newI < numRows &&
                                newJ >= 0 &&
                                newJ < numCols
                            ) {
                                neighbors += g[newI][newJ];
                            }
                        });

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0;
                        } else if (g[i][j] === 0 && neighbors === 3) {
                            gridCopy[i][j] = 1;
                        }
                    }
                }
            });
        });
        //Set timeout frequency for simulation
        setTimeout(runSimulation, 100);
    }, [numCols, numRows, runningCount]);

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Paper
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${numCols}, 20px)`,
                    }}>
                    {grid.map((rows, i) =>
                        rows.map((col, j) => (
                            <Paper
                                elevation={3}
                                key={`${i}-${j}`}
                                onClick={() => {
                                    if (!running) {
                                        const newGrid = produce(
                                            grid,
                                            (gridCopy) => {
                                                gridCopy[i][j] = grid[i][j]
                                                    ? 0
                                                    : 1;
                                            }
                                        );
                                        setGrid(newGrid);
                                    }
                                }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: grid[i][j]
                                        ? randomColor({ hue: `${color}` })
                                        : 'black',
                                    border: 'solid 1px black',
                                }}
                            />
                        ))
                    )}
                </Paper>
                <ButtonBar
                    className={classes.buttonbar}
                    genCount={genCount}
                    setColor={setColor}
                    setRunning={() => {
                        setRunning(!running);
                        if (!running) {
                            runningRef.current = true;
                            runSimulation();
                        }
                    }}
                    setSmall={setSmall}
                    setMedium={setMedium}
                    setLarge={setLarge}
                    seedGrid={seedGrid}
                    clearGrid={setGrid}
                    generateEmptyGrid={generateEmptyGrid}
                    running={running}
                />
                <Typography className={classes.description}>
                    <p>
                        The Game Of Life is a cellular automaton devised by the
                        brilliant mathematician, John Conway, who passed due to
                        Covid-19 on April 11, 2020. 
                    </p>
                    <span>The rules are as follows:</span>
                    <ol>
                        <li>
                            Any live cell with fewer than two live neighbours
                            dies, as if by underpopulation.
                        </li>
                        <li>
                            Any live cell with two or three live neighbours
                            lives on to the next generation.
                        </li>
                        <li>
                            Any live cell with more than three live neighbours
                            dies, as if by overpopulation.
                        </li>
                        <li>
                            Any dead cell with exactly three live neighbours
                            becomes a live cell, as if by reproduction.
                        </li>
                    </ol>
                    <p>Rest in peace, Professor Conway</p>
                </Typography>
                <span>&#169; Copyright Zach Stack 2020</span>
            </div>
        </div>
    );
};
export default App;
