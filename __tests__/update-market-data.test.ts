import { GET } from '../app/api/update-market-data/route';

describe('Update Market Data API', () => {
  it('should return a success message when fetching market data', async () => {
    const response = await GET();
    const jsonResponse = await response.json();

    expect(response.status).toBe(200);
    expect(jsonResponse).toHaveProperty('message', 'Market data update initiated');
  });

  it('should handle errors gracefully', async () => {
    // Mocking an error scenario
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('Fetch error')));

    const response = await GET();
    const jsonResponse = await response.json();

    expect(response.status).toBe(500);
    expect(jsonResponse).toHaveProperty('error', 'An error occurred');
  });
});