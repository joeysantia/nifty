import { render, screen } from "@testing-library/react"
import ReviewStars from "../ReviewStars"

describe('ReviewStars', () => {
    it('renders as a div with five images', () => {
        render(<ReviewStars stars={3} />)
        expect(screen).toMatchSnapshot()
    })

    it('renders no stars correctly', () => {
        render(<ReviewStars stars={0} />)
        expect(screen.queryAllByAltText("no star").length).toEqual(5)
})

    it('renders five stars correctly', () => {
        render(<ReviewStars stars={5} />)
        expect(screen.queryAllByAltText("star").length).toEqual(5)
    })

    it('renders three stars correctly', () => {
        render(<ReviewStars stars={3} />)
        expect(screen.queryAllByAltText("star").length).toEqual(3)
        expect(screen.queryAllByAltText("no star").length).toEqual(2)
    })

    it('renders a non-integer stars correctly', () => {
        render(<ReviewStars stars={2.5} />)
        expect(screen.queryAllByAltText("star").length).toEqual(2)
        expect(screen.getByAltText("half star")).toBeInTheDocument()
    })
})