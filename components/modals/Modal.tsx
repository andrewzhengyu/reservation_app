'use client'

import { useState, useEffect, useCallback } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Button } from '@/components'

interface ModalProps{
    isOpen? : boolean,
    onClose?: () => void,
    onSubmit?: () => void,
    title?: string,
    body?: React.ReactElement,
    footer?: React.ReactElement,
    actionLabel: string,
    disabled?: boolean,
    secondaryAction?: () => void,
    secondaryLabel?: string,
}

const Modal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel,
}: ModalProps) => {

    const [showModal , setShowModal ] = useState(isOpen);

    useEffect(() => {
      setShowModal(isOpen)
    }, [isOpen])
    
    const handleClose = useCallback(
      () => {
        if(disabled) return;

        setShowModal(false);
        setTimeout(
           () => {onClose?.()}
        ,300);
      },
      [onClose, disabled],
    )

    const handleSubmit = useCallback(
        () => {
    
          if(disabled) return;
          onSubmit?.();
          
          
        },
        [onSubmit, disabled],
      );
    
    const handleSecondaryAction = useCallback(
    () => {
        if(disabled || !secondaryAction) return;
        secondaryAction();
    },
    [disabled, secondaryAction],
    );

    if(!isOpen) return null;
      
  return (
    <>
        <div
            className='
                fixed
                flex
                justify-center
                items-center
                bg-neutral-800/70
                inset-0
                overflow-x-hidden
                overflow-y-auto
                z-50
                outline-none
                focus:outline-none
            '
        >
            <div
                className='
                    relative
                    w-full
                    md:w-4/6
                    lg:w-1/2
                    xl:w-2/5
                    h-full
                    md:h-auto
                    lg:h-auto
                '
            >
                {/* CONTENT */}
                <div
                    className={`
                        translate
                        duration-300
                        h-full
                        ${showModal ? 'translate-y-0' : 'translate-y-full'}
                        ${showModal ? 'opacity-100' : 'opacity-0'}
                    `}
                >
                    <div
                        className='
                            h-full
                            md:h-auto
                            lg:h-auto
                            w-full
                            border-0
                            rounded-lg
                            shadow-lg
                            relative
                            flex
                            flex-col
                            bg-white
                            outline-none
                            focus:outline-none
                            translate
                        '
                    >
                        {/* HEADER */}
                        <div
                            className='
                                relative
                                flex
                                items-center
                                justify-center
                                p-6
                                rounded-t
                                border-b-[1px]
                            '
                        >
                            <button
                                onClick={handleClose}
                                className='
                                    absolute
                                    right-9
                                    p-1
                                    border-0
                                    hover:opacity-70
                                    transition
                                '
                            >
                                <IoMdClose size={18}/>
                            </button>
                            <div className='text-lg font-semibold'>
                                {title}
                            </div>
                        </div>
                        {/* BODY */}
                        <div className='relative p-6 flex-auto'>
                            {body}
                        </div>
                        {/* FOOTER */}
                        <div className='flex flex-col gap-2 p-6'>
                            <div className='w-full flex flex-row gap-4'>
                                {secondaryLabel && secondaryAction && (

                                    <Button label={secondaryLabel} onClick={handleSecondaryAction} disabled={disabled} outline={true}/>

                                )}
                                <Button label={actionLabel} onClick={handleSubmit} disabled={disabled} />
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default Modal