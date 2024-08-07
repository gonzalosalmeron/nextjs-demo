interface props extends React.ComponentProps<'input'> {
  label: string
  error: string | undefined | null
}
export default function InputAuth({
  label,
  name,
  type,
  defaultValue,
  autoComplete,
  error,
  ...props
}: props) {
  return (
    <label className='flex flex-col gap-1 text-sm'>
      {label}
      <input
        name={name}
        type={type}
        className='rounded-lg border bg-secondary px-4 py-2 text-base outline-none focus:border-primary'
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        {...props}
      />
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </label>
  )
}
