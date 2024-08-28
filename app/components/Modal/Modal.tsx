'use client'; //must have

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";

interface ModalProps { //interface for the Modal, attributes, style
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLable?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLable
}) =>{
    const[showModal, setShowModal] = useState(isOpen);

    useEffect(()=>{
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(()=>{ 
        if(disabled){ //break function
            return;
        }

        setShowModal(false);
        setTimeout(()=>{
            onClose();
        }, 300)//delayy for closig animation
    }, [disabled, onClose]);

    const handleSubmit = useCallback(()=>{ 
        if(disabled){//check modal is disabled
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback (()=>{//pre/next button on modal
        if(disabled || !secondaryAction){
            return;
        }

        secondaryAction()
    }, [disabled, secondaryAction]);

    if(!isOpen){//if is not open
        return null;
    }

    return (
        <>
            <div className="
                justify-center 
                items-center 
                flex
                overflow-x-hidden 
                overflow-y-auto 
                fixed 
                inset-0 
                z-50 
                outline-none 
                focus:ouline-none 
                bg-neutral-800/70
            ">
                <div className="
                    relative 
                    w-full 
                    md:w-4/6 
                    lg:w-3/6 
                    xl:w-2/5
                    my-6 
                    mx-auto
                    h-full 
                    lg:h-auto 
                    md:h-auto
                ">
                    {/*CONTENT */}
                    <div className={`
                        translate 
                        duration-300
                        h-full
                        ${showModal ? 'translate-y-0' : 'translate-y-full'}
                        ${showModal ? 'opacity-100' : 'opacity-0'}
                    `}>
                        <div className="
                            translate
                            h-full
                            lg:h-auto
                            md:h-auto
                            border-0
                            rounded-lg
                            shadow-lg
                            relative
                            flex
                            flex-col
                            w-full
                            bg-white
                            outlint-none
                            focus:outline-none
                        ">
                            {/* Header*/}
                            <div className="
                                flex
                                items-center
                                p-6
                                rounded-t
                                justify-center
                                relative
                                border-b-[1px]
                            ">
                                <button 
                                    onClick={handleClose}
                                    className="
                                    p-1
                                    border-0
                                    hover:opacity-70
                                    transition
                                    absolute
                                    left-9
                                ">
                                    <IoMdClose size={18} />
                                </button>
                                <div className="
                                    text-lg
                                    font-semibold
                                "> 
                                    {title}
                                </div>
                            </div>
                            {/* BODY */}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            {/** FOOTER */}
                            <div className="flex flex-col gap-2 p-6">
                                <div className="
                                flex
                                flex-row
                                items-corner
                                gap-5
                                w-full
                                ">
                                    {secondaryAction && secondaryActionLable && (
                                    <Button
                                        outline
                                        disabled={disabled}
                                        label={secondaryActionLable}
                                        onClick={handleSecondaryAction}
                                    />
                                    )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;