import { useState } from "react";
import Counter from "./Counter";



export default function CounterWraper() {
    const [counter, setCounter] = useState(0)
    return (
        <div>
            <Counter counter={counter} setCounter={setCounter} />
        </div>
    );
}