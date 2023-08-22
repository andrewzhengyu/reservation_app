'use client'
interface HeadingProps{
    title: string,
    subtitle?: string,
    isCenter?: boolean,
}

const Heading = ({title, subtitle, isCenter}:HeadingProps) => {
  return (
    <div className={isCenter? 'text-center': 'text-start'}>
        <div className="text-2xl font-bold">
            {title}
        </div>
        <div className="font-light text-netural-500 mt-2">
            {subtitle}
        </div>
    </div>
  )
}

export default Heading