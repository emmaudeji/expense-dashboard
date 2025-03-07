import { Component, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Navigate to="/error" replace />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen justify-center items-center flex-col gap-3 text-center max-w-md">
      <h1 className="font-bold text-2xl">Oops! Something went wrong.</h1>
      <p>Please try again or return to the homepage.</p>
      <button onClick={() => navigate("/")} className="text-blue-600">Go Home</button>
    </div>
  );
};

