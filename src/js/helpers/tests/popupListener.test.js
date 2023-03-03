import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import popupListener from "../popupListener";

describe("popupListener", () => {
  let mockCallback = jest.fn();

  it("does not call the callback function when target is within the popup", () => {
    render(
      <div data-testid="popup">
        <div
          data-testid="target"
          onClick={(e) => popupListener(popup, e.target, mockCallback)}
        ></div>
      </div>
    );

    const popup = screen.getByTestId("popup");
    userEvent.click(screen.getByTestId("target"));
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("does not call the callback with the target is outside of the popup", () => {
    render(
      <>
        <div data-testid="popup"></div>
        <div
          data-testid="target"
          onClick={(e) => popupListener(popup, e.target, mockCallback)}
        ></div>
      </>
    );

    const popup = screen.getByTestId("popup");
    userEvent.click(screen.getByTestId("target"));
    expect(mockCallback).toHaveBeenCalled();
  });
});
