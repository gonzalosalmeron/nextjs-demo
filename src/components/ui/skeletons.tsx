export const CardSkeleton = () => (
  <div className='flex min-h-36 w-full flex-col justify-between gap-4 rounded-lg border bg-primary-foreground p-4'>
    <header className='flex items-center gap-1 text-secondary-foreground'>
      <div className='aspect-square h-4 animate-pulse rounded-full bg-secondary-foreground/10' />
      <div className='h-4 w-full animate-pulse rounded-md bg-secondary-foreground/10' />
    </header>

    <div className='h-full w-full flex-1 animate-pulse rounded-md bg-secondary-foreground/10' />
  </div>
)
