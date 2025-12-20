# EVParking Frontend - Complete Setup & Run Guide

This is a production-ready React + TypeScript + Vite frontend for the EV Charging & Parking system. Follow the steps below to set up and run locally.

## Prerequisites

- **Node.js** 18+ (download from https://nodejs.org/)
- **npm** (comes with Node.js)
- Running **backend** at `http://localhost:3000/api/v1` (optional: Python model server at `http://localhost:5001` for the charging predictor)

## Quick Start (5 minutes)

### 1. Install Dependencies

```powershell
cd 'c:\Users\dalmi\Desktop\EVParking\EVChargingFrontend'
npm install
```

If you encounter Tailwind build issues, install the optional deps:
```powershell
npm install -D tailwindcss postcss autoprefixer
```

### 2. Set Environment Variables

On Windows PowerShell:

```powershell
# Backend API URL (required)
$env:VITE_BACKEND_URL = 'http://localhost:3000/api/v1'

# Python model server URL (optional, for charging predictor)
$env:VITE_MODEL_URL = 'http://localhost:5001'
```

Or create a `.env` file in the project root:
```env
VITE_BACKEND_URL=http://localhost:3000/api/v1
VITE_MODEL_URL=http://localhost:5001
```

### 3. Start Development Server

```powershell
npm run dev
```

Vite will print the dev URL (typically `http://localhost:5173`). Open that in your browser.

### 4. Build for Production

```powershell
npm run build
npm run preview  # preview the built version locally
```

## Project Structure

```
src/
├── models/                 # TypeScript interfaces (Car, Booking, Payment, User, etc.)
├── services/
│   ├── api.ts             # Axios instance with token interceptor
│   ├── hooks.ts           # React Query hooks (useProfile, useBookings, useStats, etc.)
│   ├── user.service.ts
│   ├── car.service.ts
│   ├── booking.service.ts
│   ├── battery.service.ts
│   ├── payment.service.ts
│   ├── statistics.service.ts
│   └── chargingSchedule.service.ts
├── components/
│   ├── Layout.tsx         # Main layout wrapper
│   ├── Navbar.tsx         # Navigation
│   ├── ProtectedRoute.tsx # Auth guard
│   ├── ChargingSchedulePredictor.tsx
│   ├── StatsCharts.tsx
│   ├── BatteryDisplay.tsx
│   ├── ui/                # Reusable UI components (Card, Button, Input, Modal, etc.)
│   └── charts/            # Recharts wrappers
├── pages/
│   ├── dashboard.tsx      # Home page
│   ├── Auth.tsx           # Login/Signup
│   ├── ProfilePageNew.tsx # User profile
│   ├── CarManagement.tsx  # Vehicle management
│   ├── Bookings.tsx       # Booking management
│   ├── PaymentPage.tsx    # Payment processing
│   ├── StatsDashboard.tsx # Analytics
│   └── ChargingStations.tsx
├── contexts/
│   └── AuthContext.tsx    # Global auth state
├── App.tsx                # Route definitions
├── main.tsx               # Entry point
└── index.css              # Tailwind styles
```

## Integrated Backend APIs

### Authentication
- **POST** `/api/v1/signup` — Create account
- **POST** `/api/v1/signin` — Login (returns JWT token)

### User Profile
- **POST** `/api/v1/getUserDetails` — Fetch user info

### Vehicles
- **POST** `/api/v1/getCarDetails` — List user's cars
- **POST** `/api/v1/insertCarData` — Add a new car
- **POST** `/api/v1/deleteCarDetails` — Delete a car
- **DELETE** `/api/v1/cars/:carId` — Delete a car (alternative)

### Bookings
- **POST** `/api/v1/booking` — Create booking (body: `{ lat, long }`)
- **POST** `/api/v1/getChargingSessions` — Fetch bookings with station details
- **POST** `/api/v1/getAllBookings` — Fetch paginated bookings (body: `{ limit, offset }`)
- **POST** `/api/v1/completeBooking` — Mark booking complete (body: `{ bookingId }`)
- **POST** `/api/v1/cancelBooking` — Cancel booking (body: `{ bookingId }`)

### Battery & Charging
- **GET** `/api/v1/battery/status` — Fetch battery status (query: `?carId=123`)
- **POST** `/api/v1/charging-schedule/predict` — Predict optimal charging (body: `{ hour, demand, solar }`)

### Payments
- **GET** `/api/v1/payment/data` — Fetch payment stats
- **POST** `/api/v1/payment` — Process payment (body: `{ bookingId, amount, paymentMode }`)

### Statistics & Analytics
- **GET** `/api/v1/statistics` — Get comprehensive stats
- **GET** `/api/v1/stats/sessions-over-time` — Sessions by time
- **GET** `/api/v1/stats/revenue-over-time` — Revenue trends
- **GET** `/api/v1/stats/energy-consumption` — Energy usage
- **GET** `/api/v1/stats/soc-trends` — Battery SoC trends
- **GET** `/api/v1/stats/payments-by-mode` — Payment mode breakdown

### Charging Stations
- **POST** `/api/v1/nearestEVStation` — Find nearby stations (body: `{ lat, long }`)
- **POST** `/api/v1/getStationDetails` — Search by name (body: `{ stationName }`)
- **POST** `/api/v1/getStationDetailsByCity` — Search by city (body: `{ cityName }`)
- **POST** `/api/v1/getStationDetailsByPostCode` — Search by postcode (body: `{ pinCode }`)

## Key Features

✅ **Authentication**
- JWT token stored in localStorage
- Automatic token injection into request headers
- Protected routes via `ProtectedRoute` component

✅ **State Management**
- React Query for server state (queries & mutations)
- React Context for auth state
- Optimistic updates & cache invalidation

✅ **UI/UX**
- Responsive TailwindCSS styling
- Lucide React icons
- Reusable component library (Card, Button, Input, Modal, Table, Dropdown)
- Loading & error states

✅ **Data Visualization**
- Recharts for line, bar, and pie charts
- Battery display widget
- Stats dashboard with real-time data

✅ **ML Integration**
- Charging schedule predictor component
- Calls Python model server at `/predict`
- Displays optimal charging actions with color coding

## Common Issues & Fixes

### CORS Error
**Problem:** `Access-Control-Allow-Origin` error when frontend calls backend.

**Solution:** Ensure backend CORS config includes `http://localhost:5173`:
```typescript
// In backend src/index.ts
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))
```

### Token Not Persisted
**Problem:** After login, token disappears on page refresh.

**Solution:** Check localStorage has `token` key:
```javascript
// In browser console
localStorage.getItem('token')
```

If empty, login again and ensure `AuthContext.tsx` saves the token:
```typescript
localStorage.setItem('token', response.data.token)
```

### Stats Endpoints Return Empty
**Problem:** Stats pages show "No data" or "Loading..."

**Solution:** 
1. Ensure backend seed has sample data: `npm run seed` (in backend dir)
2. Check network tab in DevTools to see if requests are 404 or 500
3. Verify query params match backend endpoints

### Charging Predictor Fails
**Problem:** "Error: Failed to get prediction" on predictor component.

**Solution:**
1. Ensure Python model server is running:
   ```powershell
   cd 'c:\Users\dalmi\Desktop\EVParking\EVChargingModel'
   python app.py
   ```
   Should print: `Running on http://0.0.0.0:5001`

2. Set `VITE_MODEL_URL` to the correct URL:
   ```powershell
   $env:VITE_MODEL_URL = 'http://localhost:5001'
   ```

3. Test manually in browser console:
   ```javascript
   fetch('http://localhost:5001/predict', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ hour: 12, demand: 1, solar: 2 })
   }).then(r => r.json()).then(console.log)
   ```

### Build Fails with Tailwind Errors
**Problem:** `ERROR: unknown option "--cjs"` or PostCSS issues.

**Solution:** Ensure build deps are installed:
```powershell
npm install -D tailwindcss postcss autoprefixer
npm run build
```

If still fails, check `tailwind.config.cjs` and `postcss.config.cjs` exist and have proper syntax.

## Development Workflows

### Adding a New Page

1. Create `src/pages/YourPage.tsx`:
   ```tsx
   import React from 'react'
   import { useYourHook } from '../services/hooks'

   const YourPage: React.FC = () => {
     const { data, isLoading } = useYourHook()
     return <div>Your page content</div>
   }

   export default YourPage
   ```

2. Add route in `src/App.tsx`:
   ```tsx
   <Route path="/your-page" element={<Layout><YourPage /></Layout>} />
   ```

3. Update navbar in `src/components/Navbar.tsx` if needed.

### Adding a New Hook

1. Edit `src/services/hooks.ts` and add:
   ```tsx
   export const useYourResource = () => {
     return useQuery({
       queryKey: ['yourResource'],
       queryFn: async () => {
         const { data } = await api.get('/your-endpoint')
         return data.data as YourType[]
       }
     })
   }
   ```

2. Use in components:
   ```tsx
   const { data } = useYourResource()
   ```

### Styling with Tailwind

Use standard Tailwind classes:
```tsx
<div className="p-6 bg-white border border-gray-200 rounded shadow">
  <h1 className="text-2xl font-bold text-gray-800 mb-4">Title</h1>
  <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
    Click me
  </button>
</div>
```

## Deployment

### Vercel / Netlify

1. Connect your GitHub repo (if using Git)
2. Set environment variable in dashboard:
   ```
   VITE_BACKEND_URL=https://your-backend.com/api/v1
   VITE_MODEL_URL=https://your-model.com
   ```
3. Auto-deploy on push to main

### Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

Build & run:
```powershell
docker build -t evparking-frontend .
docker run -p 3000:3000 -e VITE_BACKEND_URL=http://your-backend:3000/api/v1 evparking-frontend
```

## Scripts

```powershell
npm run dev       # Start dev server (port 5173)
npm run build     # Build for production
npm run preview   # Preview prod build locally
npm run lint      # Run ESLint
```

## Troubleshooting

**Still stuck?** Check:
1. Backend is running: `curl http://localhost:3000/health`
2. Frontend can reach backend: Check browser DevTools Network tab
3. Token is in localStorage: `localStorage.getItem('token')`
4. Env vars are set: `$env:VITE_BACKEND_URL` in PowerShell
5. Dependencies installed: `npm list` shows all packages

## Support

For issues, check:
- Backend README: `../EVChargingBackend/README.md`
- Model README: `../EVChargingModel/README.md`
- Frontend setup docs in this file

---

**Happy charging! 🚗⚡**
