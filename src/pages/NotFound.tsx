
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <h1 className="text-7xl font-bold text-nourish-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Button asChild size="lg" className="bg-nourish-600 hover:bg-nourish-700">
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
