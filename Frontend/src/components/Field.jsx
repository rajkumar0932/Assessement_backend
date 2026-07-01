export default function Field({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        {...props}
        className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
        }`}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
