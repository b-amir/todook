import { TodoForm } from "@/components/TodoForm";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brgray-500 mb-2">Todook</h1>
          <p className="text-brgray-300">
            Simple, fast, and reliable task management
          </p>
        </header>

        <div className="space-y-6">
          <TodoForm />
        </div>
      </div>
    </div>
  );
}
