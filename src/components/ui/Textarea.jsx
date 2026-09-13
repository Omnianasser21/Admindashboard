export function Textarea({
  label,
  error,
  hint,
  rows = 4,
  disabled = false,
  className = '',
  id,
  ...props
}) {
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-text">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        disabled={disabled}
        className={`w-full resize-y rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-muted/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60 ${
          error ? 'border-danger focus:ring-danger/20' : 'border-border focus:border-primary'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
