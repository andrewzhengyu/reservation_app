'use client'

import useCountries from "@/utils/hooks/useCountries"
import { User } from "@prisma/client"
import {Heading, HeartButton} from '@/components'
import Image from 'next/image'

interface ListingHeadProps{
    title: string,
    locationValue: string,
    imageSrc: string,
    id: string,
    currentUser?: User | null,
}

const ListingHead = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser,
}: ListingHeadProps) => {

  const { findByValue } = useCountries();

  const location = findByValue(locationValue);

 

  return (
    <>
        <Heading
            title={title}
            subtitle={`${location?.region}, ${location?.label}`}
        />
        <div
            className="
                w-full
                h-[60vh]
                overflow-hidden
                rounded-xl
                relative
            "
        >
            <Image
                alt="image"
                src={imageSrc}
                fill
                className="object-cover w-full"
            />
            <div className="absolute top-5 right-5">
                <HeartButton
                    listingId={id}
                    currentUser={currentUser}
                />
            </div>
        </div>
    </>
  )
}

export default ListingHead