'use client'

import { signIn } from 'next-auth/react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { Field, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/utils/hooks/useRegisterModal'
import useLoginModal from '@/utils/hooks/useLoginModal'
import { Modal, Heading, Input, Button } from '@/components'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const LoginModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const toggle = useCallback(() => {
        loginModal.onClose(); 
        registerModal.onOpen();
    },[loginModal, registerModal])

    const {
        register,
        handleSubmit,
        formState:{ errors }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        
        setIsLoading(true);
        
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) =>{
            setIsLoading(false);
            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }
            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }
    const bodyContent = (
        <div className='flex flex-col gap-4'>
           <Heading
                title='Welcome back'
                subtitle='Log in to your account'
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
                onClick= {() => { signIn('github') }}
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
                        First time to use airbnb?
                    </div>
                    <div className='text-neutral-800 hover:underline cursor-pointer'
                        onClick={toggle}
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Log in'
            actionLabel='Continue'
            onSubmit={handleSubmit(onSubmit)}
            onClose={loginModal.onClose}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal