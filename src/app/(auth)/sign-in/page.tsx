"use client";

import { authClient } from "~/server/better-auth/client";

const SignIn = () => {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/app",
    });
  };

  return (
    <div className="card bg-base-200 w-full max-w-lg">
      <div className="card-body">
        <h1 className="card-title text-2xl">Sign in to Linksly</h1>
        <p className="text-base-content/80 mb-8">Sign in with Google to save and organize your links.</p>
        <button type="button" className="btn border-[#e5e5e5] bg-white text-black" onClick={handleSignIn}>
          <svg aria-label="Google" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g>
              <path d="m0 0H512V512H0" fill="#ffffff"></path>
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
            </g>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
