import { useEffect } from "react"
import { useState, useRef, useContext } from "react"

function StopWatch(){

    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    let intervalIdRef = useRef(null)
    let startTimeRef = useRef(0)

    useEffect(() => {
        if(isRunning){
            startTimeRef.current = Date.now();
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current + elapsedTime)
            }, 10)
        }

        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [isRunning]) // run once at the beginning and then whenever isRunning changes


    function start(){
        setIsRunning(true)

    }
    function stop(){
        setIsRunning(false)

    }
    function reset(){
        setIsRunning(false)
        setElapsedTime(0)
    }
    function formatTime() {
        const minutes = String(Math.floor(elapsedTime / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
        const milliseconds = String(elapsedTime % 100).padStart(2, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }
    


    return(
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button onClick={start} className="start-button">Start</button>
                <button onClick={stop}  className="stop-button">Stop</button>
                <button onClick={reset} className="reset-button">Reset</button>
            </div>
        </div>
    )
}
export default StopWatch