interface ButtonProps {
  label: string
  bgColor: string
  hoverColor: string
}

export const Button = ({ label, bgColor, hoverColor }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`
      mt-4 py-3 px-4 w-32 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent text-white
      ${hoverColor} ${bgColor} disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
    `}
    >
      {label}
    </button>
  )
}
