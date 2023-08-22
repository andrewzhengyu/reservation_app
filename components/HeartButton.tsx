'use client'

import useFavorite from "@/utils/hooks/useFavorite";
import { User } from "@prisma/client"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface HeartButtonProps{
    listingId: string,
    currentUser?: User | null,
}

const HeartButton = ({listingId, currentUser}: HeartButtonProps) => {

  
  const {hasFavorited, toggleFavorite} = useFavorite({
    listingId,
    currentUser
  });
  
  return (
    <div
        onClick={toggleFavorite}
        className="
            relative
            hover:opacity-80
            transition
            cursor-pointer
        "
    >
        <AiOutlineHeart
            size={28}
            className={`
                ${hasFavorited? 'fill-rose-500' : 'fill-neutral-500'}
                absolute
                -top-[2px]
                -right-[2px]
            `}
        />
        <AiFillHeart
            size={24}
            className={`
                ${hasFavorited? 'fill-rose-500': 'fill-white'}
            `}
        />
    </div>
  )
}

export default HeartButton
