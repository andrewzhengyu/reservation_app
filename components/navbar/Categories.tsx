'use client'

import { Container, CategoryBox } from '@/components'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { constants } from 'buffer'
import { useSearchParams, usePathname } from 'next/navigation'

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmills'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a pool'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island'
    },
]

const Categories = () => {

  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if(!isMainPage) return null;

  return (
    <Container>
        <div
            className='
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
            '
        >
            {categories.map((item) => (
                <CategoryBox
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    selected={category === item.label}
                />
            ))}
        </div>
    </Container>
  )
}

export default Categories