"use client";

import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useSignupModal from "@/app/hooks/useSignupModal";
import useSigninModal from "@/app/hooks/useSigninModal";
import useRentModal from "@/app/hooks/useRentModal";

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const signinModal = useSigninModal();
  const signupModal = useSignupModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) return signinModal.onOpen();

    rentModal.onOpen();
  }, [currentUser, signinModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
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
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                    toggleOpen();
                  }}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/favorites");
                    toggleOpen();
                  }}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/reservations");
                    toggleOpen();
                  }}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/properties");
                    toggleOpen();
                  }}
                  label="My properties"
                />
                <MenuItem
                  onClick={() => {
                    rentModal.onOpen();
                    toggleOpen();
                  }}
                  label="Airbnb my home"
                />
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
                    signinModal.onOpen();
                  }}
                  label="Sign In"
                />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signupModal.onOpen();
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
