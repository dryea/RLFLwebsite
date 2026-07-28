"use client";

export default function EMIPieChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  const pct = total > 0 ? Math.round((principal / total) * 100) : 50;

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4 flex h-40 w-40 items-center justify-center">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#f3e8ff" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="42"
            fill="none" stroke="#702B86" strokeWidth="8"
            strokeDasharray={`${pct * 2.64} ${(100 - pct) * 2.64}`}
            transform="rotate(-90 50 50)"
            strokeLinecap="round"
          />
          <circle
            cx="50" cy="50" r="42"
            fill="none" stroke="#F2A900" strokeWidth="8"
            strokeDasharray={`${(100 - pct) * 2.64} ${pct * 2.64}`}
            transform="rotate(${-90 + (pct / 100) * 360} 50 50)"
            strokeLinecap="round"
          />
        </svg>
        <div className="text-center">
          <div className="text-2xl font-extrabold text-primary-500">Rs.{(total / 100000).toFixed(1)}L</div>
          <div className="text-xs text-gray-400">Total</div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="h-3 w-3 rounded-sm bg-primary-500" />
          <span className="text-gray-600">Principal</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="h-3 w-3 rounded-sm bg-secondary-500" />
          <span className="text-gray-600">Interest</span>
        </div>
      </div>
    </div>
  );
}
