import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Placeholder({ title }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold text-brand-navy">{title}</h1>
      <p className="mt-3 text-muted">
        This section will be implemented in the next development module.
      </p>
      <Link to="/" className="mt-6">
        <Button>Back to Home</Button>
      </Link>
    </main>
  );
}
