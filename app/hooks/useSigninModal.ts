import { create } from "zustand";

interface SigninModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSigninModal = create<SigninModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSigninModal;
