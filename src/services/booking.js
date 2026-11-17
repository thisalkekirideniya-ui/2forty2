/**
 * BOOKING SERVICE — FRONTEND SIMULATION
 * -------------------------------------------------------------------------
 * No data leaves the browser. This mimics network latency so the loading,
 * success and error states can be designed and tested. In the backend phase,
 * replace the body with:
 *
 *   const res = await fetch('/api/bookings', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) throw new Error('Request failed');
 *   return res.json();
 */
export async function submitBookingInquiry(payload) {
  await new Promise((resolve) => setTimeout(resolve, 1600));

  // Allows QA to preview the error state: use an email starting with "error@".
  if (String(payload.email).toLowerCase().startsWith('error@')) {
    throw new Error('Simulated network error');
  }

  return {
    simulated: true,
    reference: `DEMO-${Date.now().toString(36).toUpperCase().slice(-6)}`,
  };
}

/**
 * CONTACT MESSAGE — FRONTEND SIMULATION
 * Replace with: POST /api/messages in the backend phase.
 */
export async function submitContactMessage(payload) {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  if (String(payload.email).toLowerCase().startsWith('error@')) throw new Error('Simulated network error');
  return { simulated: true };
}
