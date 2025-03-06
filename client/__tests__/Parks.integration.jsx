import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import axios from 'axios';
import Parks from '../src/pages/Parks';
import ParksProvider from '../src/contexts/ParksContext';
import TripsProvider from '../src/contexts/TripsContext';
import { mockParks } from '../__mocks__/mockParks';

const mockAddParkSelection = jest.fn();
const mockRemoveParkSelection = jest.fn();
const mockCreateTrip = jest.fn();
const mockSetCurrentTripId = jest.fn();

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
    default: ({ children }) => (
      <div data-testid='parks-provider'>{children}</div>
    ),
  };
});

// Mock TripsContext
jest.mock('../src/contexts/TripsContext', () => {
  return {
    __esModule: true,
    useTrips: jest.fn(() => ({
      getTrip: jest.fn(),
      createTrip: mockCreateTrip,
      loading: false,
      error: null,
      tripsCache: {},
      currentTripId: null,
      setCurrentTripId: mockSetCurrentTripId,
    })),
    default: ({ children }) => (
      <div data-testid='trips-provider'>{children}</div>
    ),
  };
});

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

// Render Parks page with necessary providers
const renderParksPage = () => {
  return render(
    <BrowserRouter>
      <ParksProvider>
        <TripsProvider>
          <Parks />
        </TripsProvider>
      </ParksProvider>
    </BrowserRouter>,
  );
};

describe('Parks Page Integration', () => {
  let originalConsoleError;

  beforeAll(() => {
    // Save the original console.error
    originalConsoleError = console.error;
    // Mock console.error to suppress expected error logs
    console.error = jest.fn();
  });

  afterAll(() => {
    // Restore original console.error
    console.error = originalConsoleError;
  });

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

  test('creates trip and navigates when "Create Trip" button is clicked', async () => {
    // Mock ParksContext with sufficient park selections
    const { useParks } = require('../src/contexts/ParksContext');
    useParks.mockImplementation(() => ({
      parks: mockParks,
      currentPage: 1,
      parksLoading: false,
      parksError: null,
      parkSelections: Array(5)
        .fill()
        .map((_, i) => ({
          parkId: `park-${i}`,
          visitDate: '2025-03-10',
        })),
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

    // Setup mock trip creation response
    const mockTripId = 'new-trip-123';
    mockCreateTrip.mockResolvedValueOnce(mockTripId);

    renderParksPage();

    // Find and click the "Create Trip" button
    const createTripButton = screen.getByText('Create Trip');
    fireEvent.click(createTripButton);

    await waitFor(() => {
      // Verify trip creation was called
      expect(mockCreateTrip).toHaveBeenCalled();
      // Verify current trip ID was set
      expect(mockSetCurrentTripId).toHaveBeenCalledWith(mockTripId);
      // Verify navigation occurred
      expect(mockNavigate).toHaveBeenCalledWith(`/trips/${mockTripId}`);
    });

    // Verify park selections were removed
    expect(mockRemoveParkSelection).toHaveBeenCalled();
  });

  test('shows error when creating trip fails', async () => {
    // Mock ParksContext with sufficient park selections
    const { useParks } = require('../src/contexts/ParksContext');
    useParks.mockImplementation(() => ({
      parks: mockParks,
      currentPage: 1,
      parksLoading: false,
      parksError: null,
      parkSelections: Array(5)
        .fill()
        .map((_, i) => ({
          parkId: `park-${i}`,
          visitDate: '2025-03-10',
        })),
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

    // Setup mock trip creation failure
    mockCreateTrip.mockRejectedValueOnce(new Error('Failed to create trip'));

    renderParksPage();

    // Find and click the "Create Trip" button
    const createTripButton = screen.getByText('Create Trip');
    fireEvent.click(createTripButton);

    await waitFor(() => {
      // Verify error message is displayed
      expect(
        screen.getByText('Failed to create trip. Please try again.'),
      ).toBeInTheDocument();

      // Verify console.error was called with the expected message
      expect(console.error).toHaveBeenCalledWith(
        'Error creating trip:',
        'Failed to create trip',
      );
    });

    // Verify navigation was not called
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('disables "Create Trip" button when loading', async () => {
    // Mock ParksContext with sufficient park selections
    const { useParks } = require('../src/contexts/ParksContext');
    useParks.mockImplementation(() => ({
      parks: mockParks,
      currentPage: 1,
      parksLoading: false,
      parksError: null,
      parkSelections: Array(5)
        .fill()
        .map((_, i) => ({
          parkId: `park-${i}`,
          visitDate: '2025-03-10',
        })),
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

    // Mock TripsContext with loading state
    const { useTrips } = require('../src/contexts/TripsContext');
    useTrips.mockImplementation(() => ({
      getTrip: jest.fn(),
      createTrip: mockCreateTrip,
      loading: true,
      error: null,
      tripsCache: {},
      currentTripId: null,
      setCurrentTripId: mockSetCurrentTripId,
    }));

    renderParksPage();

    // Verify the button is disabled and shows loading text
    const createTripButton = screen.getByText(
      'Packing your virtual backpack..',
    );
    expect(createTripButton).toBeDisabled();
    expect(createTripButton).toHaveClass('loading');
  });
});
