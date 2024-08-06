export default function Card({
  icon,
  title,
  children,
  description,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  description?: string
}) {
  return (
    <div className='flex w-full flex-col justify-between rounded-lg border bg-primary-foreground p-4'>
      <header className='flex items-center gap-1 text-secondary-foreground'>
        {icon}
        <p className='text-sm'>{title}</p>
      </header>

      <div className='pt-4'>{children}</div>
      {description && (
        <p className='pt-4 text-sm text-secondary-foreground'>{description}</p>
      )}
    </div>
  )
}
