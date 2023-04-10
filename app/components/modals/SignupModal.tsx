"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";

import useSignupModal from "@/app/hooks/useSignupModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useSigninModal from "@/app/hooks/useSigninModal";

const SignupModal = () => {
  const signinModal = useSigninModal();
  const signupModal = useSignupModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        signupModal.onClose();
        toast.success("Register Successfully!");
      })
      .catch((error) => toast.error(error))
      .finally(() => {
        reset({ name: "", email: "", password: "" });
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    signupModal.onClose();
    signinModal.onOpen();
  }, [signinModal, signupModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
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
        id="name"
        label="Name"
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
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-2 font-light">
        <p>
          Already have an account?{" "}
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
      isOpen={signupModal.isOpen}
      title="Sign Up"
      actionLabel="Continue"
      onClose={signupModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SignupModal;
