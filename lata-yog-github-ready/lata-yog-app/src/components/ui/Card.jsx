export function Card({ className = '', children }) {
  return <div className={`rounded-3xl bg-white p-4 shadow-soft border border-slate-200 ${className}`}>{children}</div>;
}
