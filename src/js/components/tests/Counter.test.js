import { render, screen } from "@testing-library/react"
import Counter from "../Counter"
import userEvent from "@testing-library/user-event"

describe("Counter", () => {
    let mockSetQuantity = jest.fn(x => x)
    it('renders as an input', () => {
        render(<Counter quantity={0} setQuantity={mockSetQuantity}/>)
        expect(screen).toMatchSnapshot()
    })

    it('displays the quantity passed down as a prop', () => {
        render(<Counter quantity={10} setQuantity={mockSetQuantity}/>)
        expect(screen.getByRole("spinbutton").value).toEqual("10")
    })

    it('calls the setQuantity function when the value is changed', () => {
        render(<Counter quantity={10} setQuantity={mockSetQuantity}/>)
        userEvent.type(screen.getByRole("spinbutton"), "12")
        expect(mockSetQuantity).toHaveBeenCalled()
    })

    it('calls setQuantity with the integer value of the input value', () => {
        render(<Counter quantity={0} setQuantity={mockSetQuantity}/>)
        userEvent.type(screen.getByRole("spinbutton"), "5")
        expect(mockSetQuantity.mock.calls[0][0]).toEqual(5)
    })
})