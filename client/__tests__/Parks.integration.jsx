import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import axios from 'axios';
import Parks from '../src/pages/Parks';
import ParksProvider from '../src/contexts/ParksContext';
import { mockParks } from '../__mocks__/mockParks';

const mockAddParkSelection = jest.fn();
const mockRemoveParkSelection = jest.fn();

jest.mock('axios');

// Mock ParksContext
jest.mock('../src/contexts/ParksContext', () => {
  return {
    __esModule: true,
    useParks: jest.fn(() => ({
      parks: mockParks,
      currentPage: 1,
      parksLoading: false,
      parksError: null,
      parkSelections: [],
      addParkSelection: mockAddParkSelection,
      removeParkSelection: mockRemoveParkSelection,
      visitDate: '2025-03-10',
      setVisitDate: jest.fn(),
      selectedState: null,
      setSelectedState: jest.fn(),
      sortBy: 'name',
      setSortBy: jest.fn(),
      fetchParks: jest.fn(),
    })),
    default: ({ children }) => <div>{children}</div>,
  };
});

// Helper render function
const renderParksPage = () => {
  return render(
    <BrowserRouter>
      <ParksProvider>
        <Parks />
      </ParksProvider>
    </BrowserRouter>,
  );
};

describe('Parks Page Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the API response
    axios.get.mockResolvedValueOnce({
      data: { data: { parks: mockParks } },
    });
  });

  test('renders parks and handles selection successfully', async () => {
    renderParksPage();

    await waitFor(() => {
      expect(screen.getByText(/Explore Parks/i)).toBeInTheDocument();
    });

    const selectedCounter = screen.getByText((content) => {
      return content.includes('Selected Parks:') && content.includes('0/5');
    });
    expect(selectedCounter).toBeInTheDocument();

    const addButtons = screen.getAllByText(/Add to Itinerary/i);
    expect(addButtons.length).toBeGreaterThan(0);

    fireEvent.click(addButtons[0]);

    expect(mockAddParkSelection).toHaveBeenCalled();

    const { useParks } = require('../src/contexts/ParksContext');

    useParks.mockImplementation(() => ({
      parks: mockParks,
      currentPage: 1,
      parksLoading: false,
      parksError: null,
      parkSelections: [
        {
          parkId: 'C62B89CF-F912-46F4-878C-8EEBD843CEC6',
          visitDate: '2025-03-10',
        },
      ],
      addParkSelection: mockAddParkSelection,
      removeParkSelection: mockRemoveParkSelection,
      visitDate: '2025-03-10',
      setVisitDate: jest.fn(),
      selectedState: null,
      setSelectedState: jest.fn(),
      sortBy: 'name',
      setSortBy: jest.fn(),
      fetchParks: jest.fn(),
    }));

    renderParksPage();

    expect(
      screen.getByText((content) => {
        return content.includes('Selected Parks:') && content.includes('1/5');
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/Remove from Itinerary/i)).toBeInTheDocument();
  });

  test('displays error when park data fails to load', async () => {
    // Mock context with error state
    const { useParks } = require('../src/contexts/ParksContext');
    useParks.mockImplementation(() => ({
      parks: [],
      currentPage: 1,
      parksLoading: false,
      parksError: 'Failed to load parks. Please try again.',
      parkSelections: [],
      addParkSelection: mockAddParkSelection,
      removeParkSelection: mockRemoveParkSelection,
      visitDate: '2025-03-10',
      setVisitDate: jest.fn(),
      selectedState: null,
      setSelectedState: jest.fn(),
      sortBy: 'name',
      setSortBy: jest.fn(),
      fetchParks: jest.fn(),
    }));

    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    renderParksPage();

    await waitFor(() => {
      const errorElement = screen.getByText((content) => {
        return content.includes('Failed to load parks');
      });
      expect(errorElement).toBeInTheDocument();
    });

    expect(screen.queryByText(/Add to Itinerary/i)).not.toBeInTheDocument();
  });
});
