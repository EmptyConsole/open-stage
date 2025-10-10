/**
 * Utility functions for concert navigation and ticket purchasing
 */

/**
 * Generates a URL for the purchase ticket page with concert details
 * @param {Object} concertData - The concert data object
 * @param {string} concertData.artist - Artist name
 * @param {string} concertData.title - Concert title
 * @param {string} concertData.date - Concert date
 * @param {string} concertData.time - Concert time
 * @param {string} concertData.venue - Venue name
 * @param {string} concertData.address - Venue address
 * @param {string|number} concertData.price - Ticket price
 * @returns {string} - URL with query parameters
 */
export function generatePurchaseTicketUrl(concertData) {
  const baseUrl = '/purchaseticket';
  const params = new URLSearchParams();
  
  // Add concert details as URL parameters
  if (concertData.artist) params.set('artist', concertData.artist);
  if (concertData.title) params.set('title', concertData.title);
  if (concertData.date) params.set('date', concertData.date);
  if (concertData.time) params.set('time', concertData.time);
  if (concertData.venue) params.set('location', concertData.venue);
  if (concertData.address) params.set('address', concertData.address);
  if (concertData.price) params.set('price', concertData.price);
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Default concert data for testing/demo purposes
 */
export const defaultConcertData = {
  artist: "The Amazing Band",
  title: "Summer Concert",
  date: "December 15, 2024",
  time: "8:00 PM",
  venue: "The Grand Theater",
  address: "123 Music Street, City, State 12345",
  price: "25"
};

/**
 * Navigates to purchase ticket page with concert data
 * @param {Object} router - Next.js router object
 * @param {Object} concertData - Concert data object
 */
export function navigateToPurchaseTicket(router, concertData) {
  const url = generatePurchaseTicketUrl(concertData);
  router.push(url);
}
