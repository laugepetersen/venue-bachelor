"use client";

import Button from "@/components/Button";
import Input from "@/components/form/Input";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signIn, signInWithGoogle } from "@/lib/actions";
import * as z from "zod";
import { ChangeEvent, FormEvent, useState } from "react";
import { loginSchema } from "@/lib/validationSchemas";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

interface FormData {
  email: string;
  password: string;
}

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });

  const router = useRouter();

  const handleChange = (
    input: keyof FormData,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => {
      return { ...prev, [input]: e.target.value };
    });
    setErrors({
      ...errors,
      [input]: "",
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const { email, password } = formData;
    const validationState = loginSchema.safeParse(formData);

    setErrors({
      email: validationState.error?.formErrors.fieldErrors.email?.[0] ?? "",
    });

    if (!validationState.success) {
      setIsSubmitting(false);
      return;
    }

    const signInStatus = await signIn(email, password);

    if (signInStatus?.error) {
      alert(signInStatus.error);
      setIsSubmitting(false);
    } else {
      router.replace("/account/profile");
    }
  };

  return (
    <>
      {isSubmitting && (
        <div className="w-full h-full absolute top-0 left-0 bg-white/50 z-20 backdrop-blur-sm grid place-items-center">
          <Spinner size={24} />
        </div>
      )}
      <div className="grid grid-cols-1 gap-6">
        <h1 className="text-2xl font-semibold">Log ind</h1>
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-2">
            <Input
              className="rounded-xl"
              label="Email"
              type="text"
              name="email"
              autoComplete="email"
              placeholder="john@gmail.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e)}
              errorMessage={errors.email}
            />
            <Input
              className="rounded-xl"
              label="Adgangskode"
              type="password"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => handleChange("password", e)}
              placeholder="* * * * * *"
            />
          </div>
          <div className="grid grid-cols-1 gap-3">
            <Button
              title="Log ind"
              variant="primary"
              className="disabled:opacity-50"
              disabled={
                formData.email === "" ||
                formData.password === "" ||
                isSubmitting
              }
            />
            <p className="text-sm text-center text-secondary">
              Har du ikke en konto?&nbsp;
              <Link
                href="/register"
                className="underline text-primary font-medium"
              >
                Opret dig
              </Link>
              &nbsp;her.
            </p>
          </div>
        </form>
        <div className="relative grid place-items-center">
          <div className="h-[1px] bg-color-border-subtle absolute top-1/2 left-0 w-full -translate-y-1/2 z-0"></div>
          <p className="bg-white text-sm font-medium text-secondary z-10 relative px-4">
            Eller fortsæt med
          </p>
        </div>
        <form className="grid grid-cols-1 gap-y-2 font-medium">
          <button
            formAction={signInWithGoogle}
            className="flex items-center gap-4 rounded-xl border border-color-border py-4 px-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="-3 0 262 262"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              />
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              />
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              />
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              />
            </svg>
            Fortsæt med Google
          </button>
        </form>
      </div>
    </>
  );
}
