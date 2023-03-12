import { render, screen } from "@testing-library/react";
import SignInPopup from "../SignInPopup";
import userEvent from "@testing-library/user-event";

let mockSignInWithEmailAndPassword = jest.fn();
let mockSignInWithPopup = jest.fn();
let mockRemovePopup = jest.fn();

jest.mock("firebase/auth", () => {
  return {
    ...jest.requireActual("firebase/auth"),
    signInWithEmailAndPassword: () => mockSignInWithEmailAndPassword(),
    signInWithPopup: () => mockSignInWithPopup(),
  };
});

describe("SignInPopup", () => {
  it("renders as a container with a form and buttons", () => {
    render(<SignInPopup removePopup={mockRemovePopup} />);
    expect(screen).toMatchSnapshot();
  });

  it("calls removePopup if the delete button is clicked", () => {
    render(<SignInPopup removePopup={mockRemovePopup} />);
    userEvent.click(screen.getByAltText("delete"));
    expect(mockRemovePopup).toHaveBeenCalled();
  });

  it("calls removePopup if the user clicks outside of the popup", () => {
    render(
      <>
        <SignInPopup removePopup={mockRemovePopup} />
        <div data-testid="not-sign-in-popup"></div>
      </>
    );
    userEvent.click(screen.getByTestId("not-sign-in-popup"));
    expect(mockRemovePopup).toHaveBeenCalled();
  });

  it("renders the login form by default", () => {
    render(<SignInPopup removePopup={mockRemovePopup} />);
    expect(
      screen.getByRole("heading", { name: "Sign in" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("register-button-one")).toBeInTheDocument();
    expect(screen.getByTestId("register-button-two").textContent).toMatch(
      /sign in/i
    );
  });

  it("renders the register form if the Register button is clicked", () => {
    render(<SignInPopup removePopup={mockRemovePopup} />);
    userEvent.click(screen.getByRole("button", { name: "Register" }));
    expect(
      screen.getByRole("heading", { name: "Create your account" })
    ).toBeInTheDocument();
    expect(screen.queryByTestId("register-button-one").textContent).toMatch(/sign in/i);
    expect(screen.getByTestId("register-button-two").textContent).toMatch(
      /register/i
    );
  });

  it("renders a disabled button by default", () => {
    render(<SignInPopup removePopup={mockRemovePopup} />);
    expect(screen.getByTestId('register-button-two')).toBeDisabled()
});

  it("renders a disabled button if the email input is invalid", () => {
    render(<SignInPopup removePopup={mockRemovePopup} />);
    userEvent.type(screen.getByTestId("email"), "john.smith")
    expect(screen.getByTestId('register-button-two')).toBeDisabled()

  });

  it("renders a disabled button if the password input is invalid", () => {
    render(<SignInPopup removePopup={mockRemovePopup} />);
    userEvent.type(screen.getByTestId("password"), "password")
    expect(screen.getByTestId('register-button-two')).toBeDisabled()

});

  it("renders a functional button if the inputs are valid", () => {
    render(<SignInPopup removePopup={mockRemovePopup} />);
    userEvent.type(screen.getByTestId("email"), "peter@email.com")
    userEvent.type(screen.getByTestId("password"), "Passw0rd")
    expect(screen.queryByTestId("register-button-one")).not.toBeDisabled();
  });

  it("calls signInWithEmailAndPassword if the form is submitted with valid inputs", () => {
    render(<SignInPopup removePopup={mockRemovePopup} />);
    userEvent.type(screen.getByTestId("email"), "peter@gmail.com")
    userEvent.type(screen.getByTestId("password"), "Passw0rd")
    userEvent.click(screen.getByTestId("register-button-two"))
    expect(mockSignInWithEmailAndPassword).toHaveBeenCalled()
  });

  it("calls signInWithPopup if user chooses to sign in with Google", () => {
    render(<SignInPopup removePopup={mockRemovePopup} />);
    userEvent.click(screen.getByRole("button", { name: "google Continue with Google"}))
    expect(mockSignInWithPopup).toHaveBeenCalled()
  });
}); 
