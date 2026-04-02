export function Progress({ value }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
