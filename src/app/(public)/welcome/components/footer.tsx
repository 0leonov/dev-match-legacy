import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <p className="container py-4 text-sm">
        Created by{" "}
        <Link
          className="font-medium underline-offset-4 hover:underline"
          href="https://github.com/0leonov"
          target="_blank"
        >
          Artyom Leonov
        </Link>
        . The source code is available on{" "}
        <Link
          className="font-medium underline-offset-4 hover:underline"
          href="https://github.com/0leonov/dev-match"
          target="_blank"
        >
          GitHub
        </Link>
        .
      </p>
    </footer>
  );
}
