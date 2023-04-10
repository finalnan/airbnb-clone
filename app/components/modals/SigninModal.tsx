"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";

import useSigninModal from "@/app/hooks/useSigninModal";
import useSignupModal from "@/app/hooks/useSignupModal";

const SigninModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const signinModal = useSigninModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Welcome back!");
        router.refresh();
        signinModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const onToggle = useCallback(() => {
    signinModal.onClose();
    signupModal.onOpen();
  }, [signinModal, signupModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        errors={errors}
        register={register}
        id="email"
        label="Email"
        disabled={isLoading}
        required
      />
      <Input
        errors={errors}
        register={register}
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {
          signIn("github");
        }}
      />
      <div className="text-neutral-500 text-center mt-2 font-light">
        <p>
          Don't have an account?{" "}
          <span
            onClick={onToggle}
            className="text-neutral-800 curs  or-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={signinModal.isOpen}
      title="Sign In"
      actionLabel="Continue"
      onClose={signinModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SigninModal;
