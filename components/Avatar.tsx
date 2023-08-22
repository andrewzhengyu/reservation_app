'use client'

import Image from "next/image"

interface AvatarProps{
  src: string | null | undefined,
}

const Avatar = ({src}: AvatarProps) => {
  return (
   
        <Image
            src={src || '/assets/user.png'}
            alt="avatar"
            width={30}
            height={30}
            className="rounded-full"
        />
   
  )
}

export default Avatar