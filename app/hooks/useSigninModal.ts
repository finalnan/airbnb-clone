import { create } from "zustand";

interface signinModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSigninModal = create<signinModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSigninModal;
