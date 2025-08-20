import Image from "next/image";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-0">
            <Image
              src="/logo.svg"
              alt="Todook Logo"
              width={100}
              height={100}
              className="h-36 w-auto drop-shadow-sm"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
              priority
            />
          </div>
          <h1 className="sr-only">Todook</h1>
          <p className="text-brgray-100 text-sm font-medium italic">
            Simple, yet reliable
          </p>
        </header>

        <main>
          <ErrorBoundary>
            <div className="space-y-6">
              <TodoForm />
              <TodoList />
            </div>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
