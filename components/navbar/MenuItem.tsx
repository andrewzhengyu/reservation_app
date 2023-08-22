'use client'

interface MenuItemProps{
    onClick: () => void,
    label: string,
}

const MenuItem = ({onClick, label}: MenuItemProps) => {
  return (
    <div
        className="
            hover: bg-netural-100
            transition
            px-4
            py-3
            font-semibold
        "
        onClick={onClick}
    >
        {label}
    </div>
  )
}

export default MenuItem