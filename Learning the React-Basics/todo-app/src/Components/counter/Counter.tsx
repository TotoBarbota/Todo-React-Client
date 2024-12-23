import Button from "./CounterButton"
import './Counter.css'

export type CounterProps = {
    counter: number;
    setCounter: Function;
}

export default function Counter(CounterProps: CounterProps) {
    
    function incrementMethod(incrementValue: number) {
        CounterProps.setCounter(CounterProps.counter + incrementValue)
    }

    return (
        <>
            <div>
                <Button incrementValue={1} setfunction ={incrementMethod} />
                <Button incrementValue={2}  setfunction ={incrementMethod} />
                <Button incrementValue={5}  setfunction ={incrementMethod} />
            </div>
            
            <div>
                <Button incrementValue={-1} setfunction={incrementMethod} />
                <Button incrementValue={-2} setfunction={incrementMethod} />
                <Button incrementValue={-5} setfunction={incrementMethod} />
            </div>
            <h1>{CounterProps.counter}</h1>
            <button className="button" onClick={() => CounterProps.setCounter(0)}>Reset</button>
        </>
    )
}