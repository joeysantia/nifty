import { render, screen } from "@testing-library/react"
import ReviewHeader from "../ReviewHeader"

jest.mock('../ReviewStars.js', () => ({stars}) => <h1>{stars}</h1>)

describe('ReviewHeader', () => {
    let reviews = []
    it('renders as div containing the ReviewStars component and a span', () => {
        render(<ReviewHeader reviews={reviews}/>)
        expect(screen).toMatchSnapshot()
    })

    it('correctly averages an array of review scores', () => {
        reviews = [
            {stars: 3},
            {stars: 1},
            {stars: 2},
            {stars: 2}
        ]
        render(<ReviewHeader reviews={reviews} />)
        expect(screen.getByRole("heading").textContent).toMatch(/2/)
        expect(screen.getByText('4 reviews')).toBeInTheDocument()
    })

    it('correctly rounds to the nearest 0.5', () => {
        reviews = [
            {stars: 1},
            {stars: 3},
            {stars: 3},
            {stars: 2}
        ]
        render(<ReviewHeader reviews={reviews} />)
        expect(screen.getByRole("heading").textContent).toMatch(/2.5/)
    })

    it('correctly rounds up to the next whole star if appropriate', () => {
        reviews = [
            {stars: 4},
            {stars: 4},
            {stars: 4},
            {stars: 3}
        ]

        render(<ReviewHeader reviews={reviews} />)
        expect(screen.getByRole("heading").textContent).toMatch(/4/)
    })

    it('correctly handles a long list of reviews', () => {
        reviews = [
            {stars: 1},
            {stars: 2},
            {stars: 2},
            {stars: 2},
            {stars: 4},
            {stars: 1},
            {stars: 5},
            {stars: 2},
            {stars: 3},
            {stars: 4},
            {stars: 2},
            {stars: 5},
            {stars: 1},
            {stars: 2},
            {stars: 2},
            {stars: 4} 
        ]
        render(<ReviewHeader reviews={reviews} />)
        expect(screen.getByRole("heading").textContent).toMatch(/2.5/)
        expect(screen.getByText("16 reviews")).toBeInTheDocument()
    })
})