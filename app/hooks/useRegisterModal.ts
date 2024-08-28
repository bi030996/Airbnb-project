import { create } from 'zustand';
import React from 'react'

interface RegisterModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set)=>({
    isOpen: true,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}));

export default useRegisterModal;