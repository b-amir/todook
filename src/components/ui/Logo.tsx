import Image from "next/image";

export function Logo() {
  return (
    <div className="text-center mb-2 relative h-44">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-52 h-52 rounded-full bg-brpink-100/20 opacity-50 blur-3xl"></div>
      </div>
      <div className="flex justify-center mb-0">
        <Image
          src="/logo.svg"
          alt="Todook Logo"
          width={100}
          height={100}
          className="h-32 w-auto drop-shadow-lg drop-shadow-brpink-100/10"
          priority
        />
      </div>
      <h1 className="sr-only">Todook</h1>
      <p className="text-brgray-100 text-sm font-medium italic">
        Todo list, for Barook!{" "}
      </p>
    </div>
  );
}
