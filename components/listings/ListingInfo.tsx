import useCountries from "@/utils/hooks/useCountries"
import { User } from "@prisma/client"
import { IconType } from "react-icons"
import { Avatar } from "..";
import { ListingCategory } from '@/components'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../Map'), {
    ssr:false,
})

interface ListingInfoProps{
    user: User,
    description: string,
    guestCount: number,
    roomCount: number,
    bathroomCount: number,
    category: {
        icon: IconType,
        label: string,
        description: string,
    } | undefined,
    locationValue: string,
}

const ListingInfo = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}:ListingInfoProps) => {

  const { findByValue } = useCountries();  

  const coordinates = findByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div className="
                flex
                flex-row
                items-center
                text-xl
                font-semibold
                gap-2
            ">
                <div>Hosted by {user?.name}</div>
                <Avatar src={user?.image}/>
            </div>
            <div className="
                flex
                flex-row
                items-center
                gap-4
                font-light
                text-neutral-500
            ">

                <div>
                    {guestCount} guests
                </div>
                <div>
                    {roomCount} rooms
                </div>
                <div>
                    {bathroomCount} bathrooms
                </div>
            </div>
        </div>
        <hr />
        {category && (
            <ListingCategory
                icon={category.icon}
                label={category.label}
                description={category.description}
            />
        )}
        <hr />
        <div className="text-neutral-500 font-light">
            {description}
        </div>
        <hr />
        <Map center={coordinates} />
    </div>
  )
}

export default ListingInfo