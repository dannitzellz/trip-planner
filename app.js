import { registerDestination, getTrips } from './trips.js';

const tripForm       = document.getElementById('trip-form');
const itineraryList  = document.getElementById('itinerary-list');

// Destination emoji map
const DEST_ICONS = {
  'Paris':    '🗼',
  'London':   '🎡',
  'New York': '🗽',
};

const TRANSPORT_ICONS = {
  'Plane': '✈',
  'Train': '🚄',
};

const ACCOM_ICONS = {
  'Hotel':  '🏨',
  'Hostel': '🛏',
  'Airbnb': '🏠',
};

// Format date nicely
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Render persisted trips on page load
renderItinerary(getTrips());

tripForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const destination   = document.getElementById('destination').value;
  const date          = document.getElementById('date').value;
  const transport     = document.getElementById('transport').value;
  const accommodation = document.getElementById('accommodation').value;

  registerDestination(destination, date, transport, accommodation);

  const trips = getTrips();
  trips[trips.length - 1].accommodation = accommodation;

  renderItinerary(trips);
  tripForm.reset();
});

function renderItinerary(trips) {
  itineraryList.innerHTML = '';

  if (trips.length === 0) {
    itineraryList.innerHTML = `
      <li class="itinerary-empty">
        <div class="itinerary-empty-icon">✈</div>
        <p>No trips yet — add your first destination above!</p>
      </li>`;
    return;
  }

  trips.forEach((trip, i) => {
    const li = document.createElement('li');
    li.classList.add('trip-card');
    li.dataset.destination = trip.destination;
    li.style.animationDelay = `${i * 0.06}s`;

    const destIcon      = DEST_ICONS[trip.destination]    || '📍';
    const transportIcon = TRANSPORT_ICONS[trip.transport] || '🚌';
    const accomIcon     = ACCOM_ICONS[trip.accommodation] || '🏠';

    li.innerHTML = `
      <div class="trip-card-pin">${destIcon}</div>
      <div class="trip-card-body">
        <div class="trip-card-destination">${trip.destination}</div>
        <div class="trip-card-meta">
          <span class="trip-meta-item"><span class="meta-icon">📅</span>${formatDate(trip.date)}</span>
          <span class="trip-meta-item"><span class="meta-icon">${transportIcon}</span>${trip.transport}</span>
          <span class="trip-meta-item"><span class="meta-icon">${accomIcon}</span>${trip.accommodation}</span>
        </div>
      </div>
      <div class="trip-card-cost">$${trip.cost}</div>
    `;

    itineraryList.appendChild(li);
  });
}