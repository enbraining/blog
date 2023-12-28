import Link from "next/link";
import Particles from "./components/particles";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
            <Link key="/posts" href="/posts" className="text-sm duration-200 text-zinc-500 hover:text-zinc-300">
              Posts
            </Link>
            <Link key="/contact" href="/contact" className="text-sm duration-200 text-zinc-500 hover:text-zinc-300">
              Contact
            </Link>
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-50 animate-fade-in"
        quantity={70}
      />
      <h1 className="z-10 text-4xl text-transparent duration-500 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text pb-4">
        enbraining
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          I'm building{" "}
          <Link href="https://xolving.com" className="underline duration-299 hover:text-zinc-300">
            xolving.com
          </Link>
        </h2>
      </div>
    </div>
  );

}
