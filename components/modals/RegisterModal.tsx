'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { Field, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/utils/hooks/useRegisterModal'
import useLoginModal from '@/utils/hooks/useLoginModal'
import { Modal, Heading, Input, Button } from '@/components'
import {toast} from 'react-hot-toast'
import { signIn } from 'next-auth/react'



const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen(); 
    },[loginModal, registerModal])

    const {
        register,
        handleSubmit,
        formState:{ errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        
        setIsLoading(true);
        
        axios.post('/api/register', data)
            .then(() => {
                
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong');
                
            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    const bodyContent = (
        <div className='flex flex-col gap-4'>
           <Heading
                title='Welcome to Airbnb'
                subtitle='Create an account'
           />
           <Input
                id='email'
                label='Email'
                type='Email'
                register={register}
                errors={errors}
                required={true}
                disabled={isLoading}

           />
           <Input
                id='name'
                label='Name'
                type='text'
                register={register}
                errors={errors}
                required={true}
                disabled={isLoading}
           />
           <Input
                id='password'
                label='Password'
                type='password'
                register={register}
                errors={errors}
                required={true}
                disabled={isLoading}
           />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick= {() => signIn('google')}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick= {() => signIn('github')}
            />
            <div
                className='
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                '
            >
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div className='text-neutral-800 hover:underline cursor-pointer'
                        onClick={toggle}
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onSubmit={handleSubmit(onSubmit)}
            onClose={registerModal.onClose}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal