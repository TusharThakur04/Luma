import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import SignedInHomePage from "@/views/signedInHomePage";

export default function Home() {
  return (
    <>
      <SignedOut>
        <div className="h-screen w-screen flex">
          <div className="flex-1 relative flex justify-center items-center bg-cover bg-center overflow-hidden bg-[url('/noisy-gradients1.png')]">
            <div className="absolute inset-0 backdrop-blur-md bg-black/20" />

            <div className="relative z-10 flex flex-col items-center text-center gap-6 px-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                Build ideas faster with Luma
              </h1>

              <p className="text-gray-200 max-w-xl text-lg">
                Create and chat with your projects in real time.
              </p>

              <div className="flex gap-4 mt-4">
                <SignInButton>
                  <Button className="px-6 py-5 text-base">Sign in</Button>
                </SignInButton>

                <SignUpButton>
                  <Button
                    variant="outline"
                    className="px-6 py-5 text-base bg-white/10 text-white border-white/30 hover:bg-white/20"
                  >
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <SignedInHomePage />
      </SignedIn>
    </>
  );
}
