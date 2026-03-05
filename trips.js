// Map of base costs for destinations
const DESTINATION_COSTS = {
  Paris: 500,
  London: 400,
  "New York": 600
};

// Map of additional costs by transport
const TRANSPORT_COSTS = {
  Plane: 200,
  Train: 100
};

// Map of additional costs by accommodation
const ACCOMMODATION_COSTS = {
  Hotel: 150,
  Hostel: 50,
  Airbnb: 100
};

// Encapsulated travel manager
const TravelManager = (() => {
  const destinations = []; // private array

  // Validate inputs
  const validateDestination = (destination) => {
    if (!DESTINATION_COSTS[destination]) {
      throw new Error(`Invalid destination: ${destination}`);
    }
  };

  const validateTransport = (transport) => {
    if (!TRANSPORT_COSTS[transport]) {
      throw new Error(`Invalid transport: ${transport}`);
    }
  };

  const validateAccommodation = (accommodation) => {
    if (!ACCOMMODATION_COSTS[accommodation]) {
      throw new Error(`Invalid accommodation: ${accommodation}`);
    }
  };

  const validateDate = (date) => {
    if (isNaN(new Date(date))) {
      throw new Error(`Invalid date: ${date}`);
    }
  };

  // Calculate cost using maps
  const calculateCost = (destination, transport, accommodation) => {
    return DESTINATION_COSTS[destination] +
           TRANSPORT_COSTS[transport] +
           ACCOMMODATION_COSTS[accommodation];
  };

  // Public method: register a trip
  const registerDestination = (destination, date, transport, accommodation) => {
    validateDestination(destination);
    validateTransport(transport);
    validateAccommodation(accommodation);
    validateDate(date);

    const newTrip = {
      destination,
      date,
      transport,
      accommodation,
      cost: calculateCost(destination, transport, accommodation)
    };

    destinations.push(newTrip);
  };

  // Public method: get trips (data only)
  const getTrips = () => [...destinations]; // return a copy

  // Public method: display trips
  const showItinerary = () => {
    destinations.forEach(trip => {
      console.log(`Destination: ${trip.destination}`);
      console.log(`Date: ${trip.date}`);
      console.log(`Transport: ${trip.transport}`);
      console.log(`Accommodation: ${trip.accommodation}`);
      console.log(`Cost: $${trip.cost}`);
      console.log("---------------------------");
    });
  };

  return {
    registerDestination,
    getTrips,
    showItinerary
  };
})();

export const { registerDestination, getTrips, showItinerary } = TravelManager;