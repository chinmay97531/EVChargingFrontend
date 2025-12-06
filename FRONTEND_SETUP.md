# EVParking Frontend - Production-Ready React Application

A modern, responsive frontend for the EV Parking + Charging Station system, built with React, TypeScript, Tailwind CSS, React Router, Recharts, Axios, and React Query.

## Quick Start

```bash
cd Frontend/vite-project
npm install
export VITE_BACKEND_URL="http://localhost:3000/api/v1"
npm run dev
```

Open `http://localhost:5173` in your browser.

## Features

- ✅ Full JWT authentication with token persistence
- ✅ Vehicle management (create, read, delete)
- ✅ Booking creation and management
- ✅ Multi-mode payment processing
- ✅ Advanced analytics dashboard with multiple charts
- ✅ Responsive design (mobile-first)
- ✅ Real-time data with React Query
- ✅ Type-safe with TypeScript
- ✅ Clean component architecture

## Built With

- **React 19** + TypeScript
- **Tailwind CSS 4** for styling
- **React Router v7** for navigation
- **TanStack React Query v5** for data management
- **Recharts** for data visualization
- **Axios** with interceptors for API calls
- **Lucide React** for icons

## File Structure

```
src/
├── models/               # TypeScript interfaces
├── services/
│   ├── api.ts           # Axios instance with token interceptor
│   └── hooks.ts         # All React Query hooks
├── components/
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Navbar.tsx       # Navigation bar
│   ├── StatsCharts.tsx  # Chart components
│   └── ...
├── pages/
│   ├── CarManagement.tsx
│   ├── PaymentPage.tsx
│   ├── StatsDashboard.tsx
│   ├── ProfilePageNew.tsx
│   └── ...
└── App.tsx              # Route configuration
```

## API Endpoints Integrated

**Authentication**
- `GET /profile` — useProfile()

**Vehicles**
- `POST /insertCarData` — useInsertCar()
- `POST /getCarDetails` — useCarDetails()
- `POST /deleteCarDetails` — useDeleteCar()

**Bookings**
- `POST /booking` — useCreateBooking()
- `GET /getChargingSessions` — useGetChargingSessions()
- `GET /bookings` — useBookings()
- `POST /completeBooking` — useCompleteBooking()

**Payments**
- `POST /payment` — useCreatePayment()

**Statistics**
- `GET /stats/sessions-over-time` — useSessionsOverTime()
- `GET /stats/revenue-over-time` — useRevenueOverTime()
- `GET /stats/energy-consumption` — useEnergyConsumption()
- `GET /stats/soc-trends` — useSoCTrends()
- `GET /stats/payments-by-mode` — usePaymentsByMode()

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Home with quick links |
| `/auth` | Auth | Login/Signup |
| `/profile` | Profile | User info & vehicles |
| `/vehicles` | Car Management | Add/delete vehicles |
| `/bookings` | Bookings | View & complete bookings |
| `/payment` | Payment | Process payments |
| `/stats` | Statistics | Analytics dashboard |

## Development

### Add a New Hook

Edit `src/services/hooks.ts`:
```tsx
export const useYourResource = () => {
  return useQuery(['yourResource'], async () => {
    const { data } = await api.get('/your-endpoint')
    return data.data
  })
}
```

### Add a New Page

1. Create `src/pages/YourPage.tsx`
2. Add route in `App.tsx` inside `<Layout>`
3. Use hooks from `src/services/hooks.ts`

### Styling

Use Tailwind CSS classes. Primary color: indigo-600, secondary: gray.

## Production Build

```bash
npm run build       # Creates dist/ directory
npm run preview     # Preview production build
```

Deploy `dist/` to any static hosting (Vercel, Netlify, AWS S3).

Set `VITE_BACKEND_URL` environment variable to your production API URL.

## Environment Variables

Create `.env` or set via system:
```
VITE_BACKEND_URL=http://localhost:3000/api/v1
```

## Troubleshooting

**Token errors?** → Check `localStorage` has `token` key after signin
**CORS errors?** → Backend must allow `http://localhost:5173` in CORS config
**Stats empty?** → Run backend seed script to populate data
**Build fails?** → Run `npm install` to ensure all deps are installed

## Next Steps

- Deploy frontend to Vercel/Netlify
- Set production backend URL in environment variables
- Add unit tests with Jest
- Add E2E tests with Cypress
- Enable PWA for offline support

---

⚡ Built for EV charging excellence
