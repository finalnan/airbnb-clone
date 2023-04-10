"use client";

import { useCallback, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useSignupModal";
import useLoginModal from "@/app/hooks/useSigninModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => {}}
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={toggleOpen} label="My trips" />
                <MenuItem onClick={toggleOpen} label="My favorites" />
                <MenuItem onClick={toggleOpen} label="My reservations" />
                <MenuItem onClick={toggleOpen} label="My properties" />
                <MenuItem onClick={toggleOpen} label="Airbnb my home" />
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                  label="Sign Out"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    loginModal.onOpen();
                  }}
                  label="Sign In"
                />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    registerModal.onOpen();
                  }}
                  label="Sign Up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
