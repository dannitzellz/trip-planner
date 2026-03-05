import { registerDestination, getTrips } from './trips.js';

// Get form and itinerary elements
const tripForm = document.getElementById('trip-form');
const itineraryList = document.getElementById('itinerary-list');

// Listen for form submission
tripForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  // Get input values
  const destination = document.getElementById('destination').value;
  const date = document.getElementById('date').value;
  const transport = document.getElementById('transport').value;
  const accommodation = document.getElementById('accommodation').value;

  // Register the trip
  registerDestination(destination, date, transport, accommodation);

  // Add accommodation info to the trip for display
  const trips = getTrips();
  trips[trips.length - 1].accommodation = accommodation;

  // Update itinerary display
  renderItinerary(trips);

  // Reset the form
  tripForm.reset();
});

// Function to render itinerary
function renderItinerary(trips) {
  // Clear current list
  itineraryList.innerHTML = '';

  trips.forEach(trip => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>Destination:</strong> ${trip.destination} <br>
      <strong>Date:</strong> ${trip.date} <br>
      <strong>Transport:</strong> ${trip.transport} <br>
      <strong>Accommodation:</strong> ${trip.accommodation} <br>
      <strong>Cost:</strong> $${trip.cost}
    `;
    itineraryList.appendChild(li);
  });
}