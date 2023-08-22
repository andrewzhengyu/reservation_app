'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'

import { Container, Heading, ListingCard } from "@/components"
import { Listing, Reservation, User } from "@prisma/client"

import axios from 'axios'
import toast from 'react-hot-toast'

interface ReservationClientProps{
    reservations?: Reservation[],
    currentUser?: User | null,
}

const ReservationClient = ({reservations, currentUser}:ReservationClientProps) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState('');
    const onCancel = useCallback((id:string) => {
      setDeleteId(id);
      axios.delete(`/api/reservations/${id}`)
          .then(() => {
              toast.success('Reservation Cancelled');
              router.refresh()
          })
          .catch((error) => {
              toast.error(error?.response?.data?.error);
          })
          .finally(() => {
              setDeleteId('');
          })
    },[router]);
    
    return (
      <Container>
          <Heading
              title="Reservation"
              subtitle="Where you've been and where are you going"
          />
          <div className='
              mt-10
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
          '>
              
              {reservations?.map((reservation:any)=>(
                 
                  <ListingCard
                      key={reservation.id}
                      data={reservation.listing}
                      reservation={reservation}
                      actionId={reservation.id}
                      onAction={onCancel}
                      disabled={deleteId === reservation.id}
                      actionLabel='Cancel Reservation'
                      currentUser={currentUser}
                  />
  
              ))}
          </div>
      </Container>
    )}
export default ReservationClient