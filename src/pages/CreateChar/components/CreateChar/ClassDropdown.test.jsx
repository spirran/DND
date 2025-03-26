import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ClassDropdown from './ClassDropdown';
import React from 'react';
import {describe, it, expect} from "vitest";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";
import "@testing-library/dom";
import "@testing-library/user-event";

vi.mock('node-fetch', async () => {
    const actual = await vi.importActual('node-fetch');
    return {
        ...actual,
        default: vi.fn(),
    };
});

describe('ClassDropdown', () => {
    const mockOnClassChange = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the dropdown with fetched classes', async () => {
        const mockClasses = {
            results: [
                { name: 'Barbarian' },
                { name: 'Wizard' },
                { name: 'Rogue' },
            ],
        };

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockClasses),
            })
        );

        render(<ClassDropdown selectedClass="" onClassChange={mockOnClassChange} />);

        await waitFor(() => {
            expect(screen.getByText('Barbarian')).toBeInTheDocument();
            expect(screen.getByText('Wizard')).toBeInTheDocument();
            expect(screen.getByText('Rogue')).toBeInTheDocument();
        });
    });

});