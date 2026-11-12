import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, lazy, Suspense } from "react";

import { reportVibeError } from "../lib/vibe-error-reporting";
import "@/components/chat/chat-widget.css";

const ChatWidget = lazy(() =>
  import("@/components/chat/ChatWidget").then((m) => ({ default: m.ChatWidget })),
);

function NotFoundComponent() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "28rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "4.5rem", fontWeight: 700, margin: 0 }}>404</h1>
        <h2 style={{ marginTop: "1rem", fontSize: "1.25rem", fontWeight: 600 }}>Page not found</h2>
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#3E5A5C" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.625rem",
              background: "#02383C",
              color: "#fff",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportVibeError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "28rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>This page didn't load</h1>
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#3E5A5C" }}>
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.625rem",
              background: "#02383C",
              color: "#fff",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.625rem",
              border: "1px solid #D6E7E7",
              background: "#fff",
              color: "#0A2B2E",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({}),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <html lang="en" className="js">
      <head>
        <HeadContent />
        <script src="/site.js" defer></script>
      </head>
      <body>
        {children}
        {mounted && (
          <Suspense fallback={null}>
            <ChatWidget />
          </Suspense>
        )}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const trigger = () => {
      if (
        typeof window !== "undefined" &&
        typeof (window as unknown as { initSite?: () => void }).initSite === "function"
      ) {
        (window as unknown as { initSite: () => void }).initSite();
      }
    };
    trigger();
    const raf = requestAnimationFrame(trigger);
    const timer = setTimeout(trigger, 80);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
