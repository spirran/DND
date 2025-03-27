import React from 'react';
import {render, screen} from '@testing-library/react';
import ClassLevelInput from "./ClassLevelInput";
import {describe, it, expect} from "vitest";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";
import "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe("Level input component", () => {
    it("renders an input element", () => {
        render(<ClassLevelInput />);
        expect(screen.getByText("Level:")).toBeInTheDocument();
    });

    it("renders the input with the correct initial value", () => {
        render(<ClassLevelInput currentLevel="5" />);
        const input = screen.getByRole("textbox", { id:"level" });
        expect(input).toHaveValue("5");
    });

    it("calls onLevelChange when input value changes", async () => {
        const mockOnLevelChange = vi.fn(); //vi.fn is vitest function, a mock function
        render(<ClassLevelInput onLevelChange={mockOnLevelChange} />); //pass the mock function as a prop
        const input = screen.getByRole("textbox", { id:"level" });

        await userEvent.type(input, "10");
        expect(mockOnLevelChange).toHaveBeenCalledTimes(2); // Called for each character typed
        expect(mockOnLevelChange).toHaveBeenCalledWith("1");
        expect(mockOnLevelChange).toHaveBeenCalledWith("0");
    });

    it("renders an empty input when currentLevel is not provided", () => {
        render(<ClassLevelInput />);
        const input = screen.getByRole("textbox", { id:"level"  });
        expect(input).toHaveValue("");
    });
});