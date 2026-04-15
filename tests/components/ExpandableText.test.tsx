import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render full text and no button if under limit", () => {
    const text = "Hello World";

    render(<ExpandableText text={text} />);

    const article = screen.getByRole("article");
    expect(article).toHaveTextContent(text);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should render truncated text and button if over limit", () => {
    render(<ExpandableText text={longText} />);

    const article = screen.getByRole("article");

    expect(article).toHaveTextContent(truncatedText);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });

  it("should render expanded text when show more button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    const article = screen.getByRole("article");
    expect(article).toHaveTextContent(longText);
    expect(button).toHaveTextContent(/less/i);
  });

  it("should render truncated text when show less button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);

    const article = screen.getByRole("article");
    expect(article).toHaveTextContent(truncatedText);
    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
