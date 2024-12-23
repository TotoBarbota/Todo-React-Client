import './CounterButton.css'
type props = {
    incrementValue: number,
    setfunction: Function
}

export default function Button(props: props) {
    let buttnonclassname = "button-add"
    if(props.incrementValue < 0) buttnonclassname = "button-subract"
    return (
        <button className={buttnonclassname} onClick={() => props.setfunction(props.incrementValue)}>{props.incrementValue}</button>
    )}