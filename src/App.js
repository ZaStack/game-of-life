import React, { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer';
import randomColor from 'randomcolor';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//Set neighbor cells to check
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
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));

const App = () => {
    const [numRows, setNumRows] = useState(25);
    const [numCols, setNumCols] = useState(40);
    const [color, setColor] = useState('red');
    const [genCount, setGenCount] = useState(0)
    const [running, setRunning] = useState(false);
    let runningCount = 0

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
                Array.from(Array(numCols), () =>
                    Math.random() > 0.7 ? 1 : 0
                )
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
        setGenCount(runningCount++)
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
        <>
            <div>Generation: {genCount}</div>
            <button
                onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true;
                        runSimulation();
                    }
                }}>
                {running ? 'stop' : 'start'}
            </button>
            <button
                onClick={() => {
                    seedGrid();
                }}>
                seed
            </button>
            <button
                onClick={() => {
                    setGrid(generateEmptyGrid());
                }}>
                clear
            </button>
            <button
                onClick={() => {
                    setNumRows(25);
                    setNumCols(40);
                }}>
                small
            </button>
            <button
                onClick={() => {
                    setNumRows(40);
                    setNumCols(60);
                }}>
                medium
            </button>
            <button
                onClick={() => {
                    setNumRows(60);
                    setNumCols(80);
                }}>
                large
            </button>
            <button
                onClick={() => {
                    setColor('red')
                }}>
                red
            </button>
            <button
                onClick={() => {
                    setColor('purple')
                }}>
                purple
            </button>
            <button
                onClick={() => {
                    setColor('green')
                }}>
                green
            </button>
            <button
                onClick={() => {
                    setColor('pink')
                }}>
                pink
            </button>
            <button
                onClick={() => {
                    setColor('orange')
                }}>
                orange
            </button>
            <button
                onClick={() => {
                    setColor('blue')
                }}>
                blue
            </button>
            <button
                onClick={() => {
                    setColor('yellow')
                }}>
                yellow
            </button>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${numCols}, 20px)`,
                }}>
                {grid.map((rows, i) =>
                    rows.map((col, j) => (
                        <div
                            key={`${i}-${j}`}
                            onClick={() => {
                                if(!running){
                                    const newGrid = produce(grid, (gridCopy) => {
                                        gridCopy[i][j] = grid[i][j] ? 0 : 1;
                                    });
                                    setGrid(newGrid);
                                }
                            }}
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: grid[i][j] ? randomColor({hue: `${color}`}) : 'black',
                                border: 'solid 1px black',
                            }}
                        />
                    ))
                )}
            </div>
        </>
    );
};
export default App;

