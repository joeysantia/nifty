import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import StarButtons from "../StarButtons"

    let mockSetStars = jest.fn()

describe('StarButtons', () => {

    it('renders as a div with 5 images', () => {
        render(<StarButtons stars={0} setStars={mockSetStars} />)
        expect(screen).toMatchSnapshot()
    })

    it('renders with no yellow stars if the stars prop equals zero', () => {
        render(<StarButtons stars={0} setStars={mockSetStars} />)
        expect(screen.queryByTestId("yellow star")).not.toBeInTheDocument()
    })

    it('renders with 3 yellow stars if the stars prop equals 3', () => {
        render(<StarButtons stars={3} setStars={mockSetStars} />)
        expect(screen.getAllByTestId("yellow star").length).toEqual(3)
    })

    it('fires the setState function when a star is clicked', () => {
        render(<StarButtons stars={0} setStars={mockSetStars} />)
        userEvent.click(screen.getByAltText("3 stars"))
        expect(mockSetStars).toHaveBeenCalled()
    })
    it('changes the state of parent component when a star is clicked', () => {
        mockSetStars.mockImplementation(x => x)
        render(<StarButtons stars={0} setStars={mockSetStars} />)
        userEvent.click(screen.getByAltText("3 stars"))
        expect(mockSetStars.mock.results[0].value).toEqual(3)
    })
})