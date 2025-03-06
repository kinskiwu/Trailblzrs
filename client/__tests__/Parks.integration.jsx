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

// Render Parks page with necessary providers
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

    // Wait for parks to load
    await waitFor(() => {
      expect(screen.getByText(/Explore Parks/i)).toBeInTheDocument();
    });

    // Verify initial selected parks count
    const selectedCounter = screen.getByText((content) => {
      return content.includes('Selected Parks:') && content.includes('0/5');
    });

    expect(selectedCounter).toBeInTheDocument();

    // Simulate adding a park to the itinerary
    const addButtons = screen.getAllByText(/Add to Itinerary/i);
    expect(addButtons.length).toBeGreaterThan(0);

    // Click "Add to Itinerary"
    fireEvent.click(addButtons[0]);

    expect(mockAddParkSelection).toHaveBeenCalled();

    // Update context to reflect selection
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

    // Verify the selected parks count has updated
    expect(
      screen.getByText((content) => {
        return content.includes('Selected Parks:') && content.includes('1/5');
      }),
    ).toBeInTheDocument();
    // Ensure "Remove from Itinerary" button is displayed
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

    // Simulate network failure when fetching parks data
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    renderParksPage();

    // Confirm error message is displayed
    await waitFor(() => {
      const errorElement = screen.getByText((content) => {
        return content.includes('Failed to load parks');
      });
      expect(errorElement).toBeInTheDocument();
    });
    // Ensure "Add to Itinerary" is not present in error state
    expect(screen.queryByText(/Add to Itinerary/i)).not.toBeInTheDocument();
  });
});
