const plannerForm = document.getElementById('plannerForm');
const planDestination = document.getElementById('planDestination');
const planStart = document.getElementById('planStart');
const planEnd = document.getElementById('planEnd');
const planTravelers = document.getElementById('planTravelers');
const planBudget = document.getElementById('planBudget');
const itineraryField = document.getElementById('generatedItinerary');
const planPreview = document.getElementById('planPreview');

function formatDate(value) {
  if (!value) return 'Flexible dates';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderPlanPreview() {
  if (!planPreview || !planDestination || !planTravelers || !planBudget) return;

  const destinationLabel = planDestination.options[planDestination.selectedIndex]?.text || 'Your destination';
  const start = planStart?.value || '';
  const end = planEnd?.value || '';
  const travelers = planTravelers.value || '1';
  const budget = planBudget.value || 'Flexible';

  const previewMarkup = `
    <h2>Suggested Itinerary</h2>
    <div class="itinerary-item">
      <h3>Arrival</h3>
      <p>Reach ${destinationLabel} and settle in between ${formatDate(start)} and ${formatDate(end)}.</p>
    </div>
    <div class="itinerary-item">
      <h3>Explore</h3>
      <p>Plan sightseeing, local food, and one signature experience for ${travelers} traveler(s).</p>
    </div>
    <div class="itinerary-item">
      <h3>Budget Focus</h3>
      <p>Estimated budget target: ${budget}. Keep transport, stay, and food aligned with that range.</p>
    </div>
  `;

  planPreview.innerHTML = previewMarkup;

  if (itineraryField) {
    itineraryField.value = [
      `Destination: ${destinationLabel}`,
      `Dates: ${formatDate(start)} to ${formatDate(end)}`,
      `Travelers: ${travelers}`,
      `Budget: ${budget}`,
      'Suggested plan: arrival, local exploration, one signature experience, and departure logistics.'
    ].join('\n');
  }
}

if (plannerForm) {
  plannerForm.addEventListener('input', renderPlanPreview);
  plannerForm.addEventListener('change', renderPlanPreview);
  window.addEventListener('load', renderPlanPreview);
}
