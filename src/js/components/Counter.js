
const Counter = ({ quantity, setQuantity }) => {
    return <input type="number" onChange={(e) => setQuantity(parseInt(e.target.value))} value={quantity} />
}

export default Counter