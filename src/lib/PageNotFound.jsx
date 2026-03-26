import { useLocation } from "react-router-dom";
import { base44 } from "@/api/Base44Client";
import { useQuery } from "@tanstack/react-query";

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  const { data: authData, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const user = await base44.auth.me();
        return { user, isAuthenticated: true };
      } catch {
        return { user: null, isAuthenticated: false };
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p>Page "{pageName}" not found</p>

        {isFetched && authData?.isAuthenticated && (
          <p className="text-sm text-gray-500">
            Admin Note: Page not implemented yet
          </p>
        )}

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
