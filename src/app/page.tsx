import { TodoForm } from "@/components/todo-form/TodoForm";
import { TodoList } from "@/components/todo-list/TodoList";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Logo } from "@/components/ui/Logo";
import { ControlBox } from "@/components/control-box/ControlBox";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto max-w-2xl py-8 px-4 flex-grow flex flex-col">
        <header className="text-center">
          <Logo />
        </header>

        <main className="flex-grow flex flex-col">
          <ErrorBoundary>
            <div className="space-y-2 flex-grow flex flex-col">
              <TodoForm />
              <ControlBox />
              <TodoList />
            </div>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
