export function Button({ className = '', variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800',
    secondary: 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50',
  };
  return <button className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${variants[variant]} ${className}`} {...props} />;
}
