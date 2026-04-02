export function Select({ className = '', ...props }) {
  return <select className={`rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 ${className}`} {...props} />;
}
