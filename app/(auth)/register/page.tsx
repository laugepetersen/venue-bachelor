import { signInWithGoogle, signUp } from "@/lib/actions";
import Button from "@/components/Button";
import Input from "@/components/form/Input";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <h1 className="text-2xl font-semibold">Opret konto</h1>
      <form action={signUp} className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-2">
          <Input
            className="rounded-xl"
            label="Email"
            type="email"
            name="email"
            placeholder="john@gmail.com"
          />
          <Input
            className="rounded-xl"
            label="Adgangskode"
            type="password"
            name="password"
            placeholder="* * * * * *"
          />
          <Input
            className="rounded-xl"
            label="Bekræft adgangskode"
            type="password"
            name="confirm_password"
            placeholder="* * * * * *"
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Button type="submit" title="Opret konto" />
          <p className="text-sm text-center text-secondary">
            Har du allerede en konto?&nbsp;
            <Link href="/login" className="underline text-primary font-medium">
              Log ind
            </Link>
            &nbsp;her.
          </p>
        </div>
      </form>
      <div className="relative grid place-items-center">
        <div className="h-[1px] bg-color-border-subtle absolute top-1/2 left-0 w-full -translate-y-1/2 z-0"></div>
        <p className="bg-white text-sm font-medium text-secondary z-10 relative px-4">
          Eller opret med
        </p>
      </div>
      <form className="grid grid-cols-1 gap-y-2 font-medium">
        <button
          formAction={signInWithGoogle}
          className="flex items-center gap-4 rounded-xl border border-color-border py-4 px-4 cursor-pointer"
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
        {/* <div className="flex items-center gap-4 rounded-xl bg-[#3F7CF3] text-white py-4 px-4 cursor-pointer">
          <svg
            width="28"
            height="28"
            viewBox="0 0 800 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M750.664 402.105C750.664 208.824 593.945 52.1055 400.664 52.1055C207.382 52.1055 50.6636 208.824 50.6636 402.105C50.6636 576.793 178.632 721.59 345.976 747.871V503.309H257.085V402.105H345.976V324.996C345.976 237.293 398.242 188.809 478.179 188.809C516.476 188.809 556.539 195.652 556.539 195.652V281.793H512.382C468.929 281.793 455.335 308.762 455.335 336.48V402.105H552.398L536.898 503.309H455.351V747.902C622.695 721.637 750.664 576.84 750.664 402.105Z"
              fill="white"
            />
          </svg>
          Opret med Facebook
        </div> */}
      </form>
    </div>
  );
}
