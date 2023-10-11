import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <main className="p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Welcome back!
        </h1>

        <p className="text-xl text-muted-foreground">
          Sign in to continue using{" "}
          <span className="text-primary font-medium">Dev Match</span>.
        </p>
      </div>

      <div className="mt-8 max-w-md mx-auto px-6 py-8 rounded-lg border bg-card text-card-foreground shadow-sm">
        <LoginForm />
      </div>
    </main>
  );
}
