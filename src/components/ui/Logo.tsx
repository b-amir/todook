import Image from "next/image";

export function Logo() {
  return (
    <div className="text-center mb-2 relative h-48">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-52 h-52 rounded-full bg-brgray-100/20 opacity-50 blur-3xl"></div>
      </div>
      <div className="flex justify-center mb-0">
        <Image
          src="/logo.svg"
          alt="Todook Logo"
          width={100}
          height={100}
          className="h-36 w-auto drop-shadow-sm"
          priority
        />
      </div>
      <h1 className="sr-only">Todook</h1>
      <p className="text-brgray-100 text-sm font-medium italic">
        Simple, yet reliable
      </p>
    </div>
  );
}
