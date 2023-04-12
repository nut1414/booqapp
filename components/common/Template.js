export function Template({ children, className, ...props }) {
  return (
    <div
      className={
        'min-h-screen flex flex-col items-center justify-between p-24'
        +className}
      {...props}
    >
      
      {children}
    </div>
  )
}