import { useState } from "react";
import CounterTable from "./CounterTable";



export default function CounterWraper() {
    const [counter, setCounter] = useState(0)
    return (
        <div>
            <CounterTable counter={counter} setCounter={setCounter} />
        </div>
    );
}