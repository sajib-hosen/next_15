type AnchorLink = `https://${string}` | `http://${string}`;
type AppMode = "development" | "staging" | "production";

namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BACKEND_API: AnchorLink;
  }
}
