import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#6F8BA4]">
      <NavBar />

      <section id="profile" className="py-[100px]">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-[#20247b] text-[38px] md:text-[44px] font-extrabold leading-tight">
                BE 6E
              </h1>
              <p className="text-[16px]">Track your vehicle, sessions, and bookings at a glance.</p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/ChargingStations/state"
                className="inline-flex items-center rounded-xl px-5 py-2.5 text-white bg-[#20247b] hover:bg-[#1a1e6b] transition shadow"
              >
                Book Charging Slot
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-xl px-5 py-2.5 text-[#20247b] bg-white border border-[#20247b]/20 hover:bg-slate-50 transition shadow-sm"
              >
                Find Nearby Stations
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-xl px-5 py-2.5 text-[#20247b] bg-white border border-[#20247b]/20 hover:bg-slate-50 transition shadow-sm"
              >
                Add Vehicle
              </a>
            </div>
          </div>

          {/* Top grid: Vehicle + Stats */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Vehicle Card */}
            <div className="lg:col-span-1 rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(31,45,61,0.12)] border border-white/60">
              <h3 className="text-[#20247b] font-bold text-2xl mb-1">Primary Vehicle</h3>
              <p className="text-sm mb-4">Tata Nexon EV • MH 12 AB 1234</p>

              <div className="rounded-xl bg-[#f8fafc] p-4 border border-slate-200/70 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="grid place-content-center w-12 h-12 rounded-xl bg-[#fc5356]/10">
                    <span className="text-2xl" role="img" aria-label="car">🚗</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#20247b]">Battery</div>
                    <div className="text-sm">Current SoC: <span className="font-semibold text-[#20247b]">62%</span></div>
                  </div>
                </div>

                {/* Battery progress */}
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-[#fc5356]" style={{ width: "62%" }} />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-lg bg-white p-2 border border-slate-200">
                    <div className="text-xs">Est. Range</div>
                    <div className="font-semibold text-[#20247b]">170 km</div>
                  </div>
                  <div className="rounded-lg bg-white p-2 border border-slate-200">
                    <div className="text-xs">Connector</div>
                    <div className="font-semibold text-[#20247b]">CCS2</div>
                  </div>
                  <div className="rounded-lg bg-white p-2 border border-slate-200">
                    <div className="text-xs">Plan</div>
                    <div className="font-semibold text-[#20247b]">Gold</div>
                  </div>
                </div>
              </div>

              {/* Preferred Stations */}
              <div>
                <div className="text-[#20247b] font-semibold mb-2">Preferred Stations</div>
                <div className="flex flex-wrap gap-2">
                  {["Sector 17 Plaza", "City Mall Parking", "Tech Park B1"].map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-white border border-slate-200 text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard number="1,240 kWh" label="Lifetime Energy" />
              <StatCard number="86" label="Charging Sessions" />
              <StatCard number="₹ 18,560" label="Total Spend" />
              <StatCard number="920 kg" label="CO₂ Saved" />
            </div>
          </div>

          {/* Middle grid: Upcoming + Recent + Payments */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Upcoming Booking */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(31,45,61,0.12)] border border-white/60">
              <h3 className="text-[#20247b] font-bold text-xl mb-3">Upcoming Booking</h3>
              <div className="rounded-xl border border-slate-200 p-4 bg-[#f8fafc]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">Station</div>
                    <div className="font-semibold text-[#20247b]">City Mall Parking</div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs bg-[#fc5356]/10 text-[#fc5356] font-semibold">
                    Reserved
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <KeyVal k="Date" v="Aug 24, 2025" />
                  <KeyVal k="Slot" v="06:30 – 07:30 PM" />
                  <KeyVal k="Connector" v="CCS2 • 60 kW" />
                  <KeyVal k="Est. Cost" v="₹ 160 – 190" />
                </div>
                <div className="mt-4 flex gap-3">
                  <a href="/ChargingStations/state" className="px-4 py-2 rounded-lg bg-[#20247b] text-white hover:bg-[#1a1e6b] transition">
                    Manage
                  </a>
                  <a href="#" className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition">
                    Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(31,45,61,0.12)] border border-white/60">
              <h3 className="text-[#20247b] font-bold text-xl mb-3">Recent Sessions</h3>
              <div className="divide-y divide-slate-200">
                {[
                  { place: "Tech Park B1", date: "Aug 20, 2025", kwh: 18.4, cost: 285, time: "42m" },
                  { place: "Sector 17 Plaza", date: "Aug 16, 2025", kwh: 12.2, cost: 190, time: "30m" },
                  { place: "City Mall Parking", date: "Aug 10, 2025", kwh: 25.0, cost: 375, time: "58m" },
                  { place: "Metro P3", date: "Aug 02, 2025", kwh: 9.6, cost: 150, time: "22m" },
                ].map((s, i) => (
                  <div key={i} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#20247b]">{s.place}</div>
                      <div className="text-xs">{s.date} • {s.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{s.kwh} kWh</div>
                      <div className="font-semibold">₹ {s.cost}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <a href="#" className="text-[#20247b] font-semibold hover:underline">View all sessions</a>
              </div>
            </div>

            {/* Payment / Preferences */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(31,45,61,0.12)] border border-white/60">
              <h3 className="text-[#20247b] font-bold text-xl mb-3">Payment & Preferences</h3>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <KeyVal k="Default Payment" v="Visa •••• 5621" />
                <KeyVal k="Billing Cycle" v="Monthly (1st of every month)" />
                <KeyVal k="Auto-Start" v="Enabled for preferred stations" />
                <KeyVal k="Notifications" v="Push + Email" />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#20247b]/10 text-[#20247b] text-xs font-semibold">Smart Charging</span>
                <span className="px-3 py-1 rounded-full bg-[#fc5356]/10 text-[#fc5356] text-xs font-semibold">Peak Avoidance</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-semibold">Solar Priority</span>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-10 flex flex-col items-center">
            <div  onClick={
              () => navigate("/ChargingStations/state")
            }
              className="inline-flex items-center rounded-xl px-6 py-3 text-white bg-[#fc5356] hover:bg-[#e64a4c] transition shadow"
            >
              Start New Session
            </div>
            <p className="text-xs mt-2 opacity-80">Check availability at your preferred stations.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Small presentational components ---------- */

function StatCard({ number, label }) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-[0_10px_30px_rgba(31,45,61,0.12)] border border-white/60">
      <h6 className="text-[#20247b] font-extrabold text-3xl md:text-4xl leading-none">{number}</h6>
      <p className="mt-1 m-0 font-semibold">{label}</p>
    </div>
  );
}

function KeyVal({ k, v }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b last:border-none border-slate-200/70 pb-2">
      <span className="text-[#20247b] font-semibold">{k}</span>
      <span className="text-[14px]">{v}</span>
    </div>
  );
}

export default Profile;
