import { http, HttpResponse } from 'msw';

const URL = import.meta.env.VITE_APP_URL

export const handlers = [
  http.get('/api/data/endpoint1', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ],
    });
  }),
  http.get('/api/data/endpoint2', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ],
    });
  }),

]