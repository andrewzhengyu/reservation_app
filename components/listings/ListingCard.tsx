'use client'

import { Listing, Reservation, User } from "@prisma/client"
import { useCallback, useMemo } from "react"
import { useRouter } from 'next/navigation'
import useCountries from "@/utils/hooks/useCountries"
import { format } from 'date-fns'
import Image from 'next/image'
import { Button, HeartButton } from '@/components'

interface ListingCardProps{
    data:Listing,
    reservation?: Reservation,
    currentUser?: User | null,
    onAction?: (id:string) => void,
    disabled?: boolean,
    actionLabel?: string,
    actionId?: string,
}

const ListingCard = ({
    data,
    reservation,
    currentUser,
    onAction,
    disabled,
    actionLabel,
    actionId="",
}:ListingCardProps) => {

  const router = useRouter();
  const { findByValue } = useCountries();

  const location = findByValue(data.locationValue);

  const handleCancel = useCallback((
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    if(disabled) return;

    onAction?.(actionId)
  },[onAction, actionId, disabled]);

  const price = useMemo(() => {
    if(reservation){
      return  reservation.totalPrice;
    }

    return data.price
  },[reservation, data.price]);

  const reservationDate = useMemo(() => {
    if(!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'pp')} - ${format(end, 'pp')}`;
  },[reservation]);


  return (
    <div
        onClick={() => router.push(`/listings/${data.id}`)}
        className="col-span-1 cursor-pointer group"
    >
        <div className="flex flex-col gap-2 w-full">
            <div className="
                aspect-square
                w-full
                relative
                overflow-hidden
                rounded-xl
            ">
                <Image
                    fill
                    alt="listing"
                    src={data.imageSrc}
                    className="
                        object-cover
                        h-full
                        w-full
                        group-hover:scale-110
                        transition
                    "
                />
                <div className="absolute top-3 right-3">
                    <HeartButton
                        listingId={data.id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
            <div className="font-semibold text-lg">
                {location?.region}, {location?.label}
            </div>
            <div className="font-light text-neutral-500">
                {reservationDate || data.category}
                
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">
                    ${price}
                </div>
                {!reservation && (
                    <div className="font-night">night</div>
                )}
            </div>
            {onAction && actionLabel && (
                <Button
                    disabled={disabled}
                    small
                    label={actionLabel}
                    onClick={handleCancel}
                />
            )}
        </div>
    </div>
  )
}

export default ListingCard