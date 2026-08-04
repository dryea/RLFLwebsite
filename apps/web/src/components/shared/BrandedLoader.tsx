export default function BrandedLoader({ label }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-20">
      <div className="flex items-end gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-2.5 rounded-t-sm ${
              i % 2 === 0 ? "bg-primary-600" : "bg-secondary-500"
            }`}
            style={{
              height: `${[40, 28, 18, 28, 40][i - 1]}px`,
              animation: `pulse 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
      {label && <p className="mt-4 text-sm text-gray-400">{label}</p>}
    </div>
  );
}
