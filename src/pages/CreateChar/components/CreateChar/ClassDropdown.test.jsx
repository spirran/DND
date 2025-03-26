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

    it('calls onClassChange when a class is selected', async () => {
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
        });

        const dropdown = screen.getByLabelText('Select Class:');
        dropdown.value = 'Wizard';
        dropdown.dispatchEvent(new Event('change', { bubbles: true })); //check if change event in parent component is called

        expect(mockOnClassChange).toHaveBeenCalledWith('Wizard');
    });

    it('displays an empty dropdown when fetch fails', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
            })
        );

        render(<ClassDropdown selectedClass="" onClassChange={mockOnClassChange} />);

        await waitFor(() => {
            expect(screen.queryByText('Barbarian')).not.toBeInTheDocument();
            expect(screen.queryByText('Wizard')).not.toBeInTheDocument();
            expect(screen.queryByText('Rogue')).not.toBeInTheDocument();
        });

        const dropdown = screen.getByLabelText('Select Class:');
        expect(dropdown.children.length).toBe(0);
    });

    it('renders the correct selected class', async () => {
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

        render(<ClassDropdown selectedClass="Wizard" onClassChange={mockOnClassChange} />);

        await waitFor(() => {
            expect(screen.getByText('Barbarian')).toBeInTheDocument();
            expect(screen.getByText('Wizard')).toBeInTheDocument();
            expect(screen.getByText('Rogue')).toBeInTheDocument();
        });

        const dropdown = screen.getByLabelText('Select Class:');
        expect(dropdown.value).toBe('Wizard');
    });
});