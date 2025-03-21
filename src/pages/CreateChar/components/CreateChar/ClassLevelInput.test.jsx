import React from 'react';
import {render, screen} from '@testing-library/react';
import ClassLevelInput from "./ClassLevelInput";
import {describe, it, expect} from "vitest";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";
import "@testing-library/dom";
import "@testing-library/user-event";

describe("Level input component", () =>
{
    it("renders an input element", ()=>{
        render(<ClassLevelInput/>)
        expect(screen.getByText("Level:")).toBeInTheDocument();
    })
})