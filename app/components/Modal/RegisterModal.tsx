'use client';

import React from 'react'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import LoginModal from './LoginModal';

const RegisterModal =() =>{
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email: '',
            password:''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);

        axios.post('/api/register', data)
        .then(()=>{
            toast.success('Success')
            registerModal.onClose();
            loginModal.onOpen();
        })
        .catch((error)=>{
            toast.error('Something Went Wrong')
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    const toggle = useCallback(()=>{
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent =(
        <div className='flex flex-col gap-4'>
            <Heading  
                title="Welcome to Airbnb"
                subtitle='Create an Account'
            />

            <Input 
                id="email" /** hiện nhanh ID email đã lưu trong máy */
                label="Email"/* hover when click on the ID box || peer-focus:scale-75 peer-focus:-translate-y-4 */ 
                disabled={isLoading}
                register={register}
                errors={errors}
                required

            />
            <Input 
                id="name" /** hiện nhanh name  đã lưu trong máy */
                label='Name'/* hover when click on the name box || peer-focus:scale-75 peer-focus:-translate-y-4 */ 
                disabled={isLoading}
                register={register}
                errors={errors}
                required

            />
            <Input 
                id="password" /** tạo password */
                type="password"
                label='Password'/* hover when click on the password box || peer-focus:scale-75 peer-focus:-translate-y-4 */ 
                disabled={isLoading}
                register={register}
                errors={errors}
                required

            />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label = "Continute with Google"
                icon = {FcGoogle}
                onClick = {()=>signIn('google')}
            />
            <Button 
                outline
                label = "Continute with GitHub"
                icon = {AiFillGithub}
                onClick = {()=>signIn('github')}
            />
            <div className='
                text-neutral-500
                text-center
                mt-4
                font-lighy
            '>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick ={toggle} 
                        className='
                        text-neutral-800
                        cursor-pointer
                        hover:underline
                    '>
                       Login
                    </div>
                </div>
            </div>
        </div>
    )

    return(
        <Modal 
            disabled ={isLoading}// dont be able to change anything
            isOpen ={registerModal.isOpen}
            title="Register"
            actionLabel='Continute'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;