import { useEffect } from "react";
import { Outlet, useMatches } from "react-router-dom";

export const APP_NAME = "ระบบกิจกรรมนักศึกษา";

export interface RouteHandle {
  title?: string;
}

function RootLayout() {
  const matches = useMatches();

  useEffect(() => {
    const title = matches
      .map((match) => (match.handle as RouteHandle | undefined)?.title)
      .filter(Boolean)
      .pop();

    document.title = title ? `${title} · ${APP_NAME}` : APP_NAME;
  }, [matches]);

  return <Outlet />;
}

export default RootLayout;
