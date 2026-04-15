import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";

describe("UserAccount", () => {
  it("should render user name", () => {
    const user = { id: 1, name: "John Doe" };

    render(<UserAccount user={user} />);

    const userName = screen.queryByText(/john doe/i);
    expect(userName).toBeInTheDocument();
  });

  it("should render edit button if user is an admin", () => {
    const user = { id: 1, name: "Admin User", isAdmin: true };

    render(<UserAccount user={user} />);

    const editButton = screen.getByRole("button", { name: /edit/i });
    expect(editButton).toBeInTheDocument();
  });

  it("should not render edit button if user is not an admin", () => {
    const user = { id: 1, name: "Regular User", isAdmin: false };
    render(<UserAccount user={user} />);

    const editButton = screen.queryByRole("button", { name: /edit/i });
    expect(editButton).not.toBeInTheDocument();
  });
});
