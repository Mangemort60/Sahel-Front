interface ButtonProps {
  label: string
  bgColor: string
  hoverColor: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  isLoading?: boolean
  largeButton?: boolean
  textColor?: string
}

export const Button = ({
  label,
  bgColor,
  hoverColor,
  type,
  onClick,
  isLoading,
  largeButton,
  textColor,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`mt-2
       py-3 px-4 ${largeButton ? 'w-full' : 'max-w-36'} w-full inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent ${textColor}
      ${hoverColor} ${bgColor} disabled:opacity-50  disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
    `}
      onClick={onClick}
    >
      {isLoading ? (
        <div
          className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full"
          role="status"
          aria-label="loading"
        ></div>
      ) : (
        label
      )}
    </button>
  )
}
