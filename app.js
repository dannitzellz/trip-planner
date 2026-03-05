import { registerDestination, showItinerary } from './trips.js';

const startApp = () => {
  // Example of registering trips
  registerDestination("Paris", "2024-06-15", "Plane");
  registerDestination("London", "2024-07-01", "Train");

  // Show the itinerary
  showItinerary();
};

startApp();