'use client';
import { Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

export default function RefPage() {
    const [numchanges, setNumChanges] = useState(20);
    const [isRunning, setIsRunning] = useState(false);

    const numsid = useRef(null);
    const countRef = useRef(20);

    const toggle = () => {
        setIsRunning(!isRunning);
    }
    useEffect(() => {
        if (isRunning) {
            start();
        } else {
            clearInterval(numsid.current);
        }
        return() => clearInterval(numsid.current);
    }, [isRunning]);
    const start = () => {
        numsid.current = setInterval(()=>{
            countRef.current = countRef.current - 1;
            if(countRef.current < 0){
                clearInterval(numsid.current);
                countRef.current = 20;
                setIsRunning(false);
            }
            setNumChanges(countRef.current);
        },1000);
    }
    const reset=() => {
        clearInterval(numsid.current);
        countRef.current = 20;
        setIsRunning(false);
        setNumChanges(20);
    }

    return(
        <div>
            <button onClick={toggle}>
                {isRunning ? "pause" : "start"}
            </button>

            <button onClick={reset}>
                reset
            </button>
            <Typography>
                {numchanges}
            </Typography>
        </div>
    )
}