import { render, screen } from "@testing-library/react"
import ReviewList from "../ReviewList"
import userEvent from "@testing-library/user-event"


jest.mock("../AddReviewForm.js", () => () => {
    return <h1 data-testid="add-review-form">AddReviewForm rendered</h1>
})
jest.mock("../ReviewStars.js", () => ({stars}) => {
    return <h1 data-testid="review-stars">{stars} stars rendered</h1>
})
jest.mock('../ReviewHeader', () => () => {
    return <h1 data-testid="review-header">ReviewHeader rendered</h1>
})

describe("ReviewList", () => {

    

    let reviews = [
        {
            id: '123',
            userPhoto: "www.photo.com",
            stars: 4,
            description: "Great item!",
            img: {
                src: "www.photo.com",
                alt: "review"
            }
        },
        {
            id: '456',
            userPhoto: "www.photo.com",
            stars: 5,
            description: "Love it!",
            img: {
                src: "www.photo.com",
                alt: "review"
            }
        }
    ]

    it('renders as a section with a button and list of reviews', () => {
        render(<ReviewList reviews={reviews} />)
        expect(screen).toMatchSnapshot()
    })

    it('renders the AddReviewForm component if the button is clicked', () => {
                render(<ReviewList reviews={reviews} />)
                userEvent.click(screen.getByAltText("add button"))
                expect(screen.getByTestId("add-review-form").textContent).toMatch(/addreviewform rendered/i)
    })

    it('does not render the AddReviewForm by default', () => {
        render(<ReviewList reviews={reviews} />)
        expect(screen.queryByText("AddReviewForm rendered")).not.toBeInTheDocument()
    })

})