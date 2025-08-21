import { TodoForm } from "@/components/todo-form/TodoForm";
import { TodoList } from "@/components/todo-list/TodoList";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Logo } from "@/components/ui/Logo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <header className="text-center">
          <Logo />
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
