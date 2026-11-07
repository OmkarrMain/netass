import { useState } from "react";
import Button from "./ui/Button";

export default function CookieBanner() {
  const [visible, setVisible] = useState(
    () => localStorage.getItem("netass_cookie_consent") !== "accepted",
  );

  function accept() {
    localStorage.setItem("netass_cookie_consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-white p-4 shadow-2xl">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-semibold text-brand-navy">Cookie Notice</h3>
          <p className="mt-1 max-w-3xl text-sm text-muted">
            NetAss uses essential cookies and local storage to support website
            functionality and remember your preferences.
          </p>
        </div>

        <Button variant="cta" onClick={accept}>
          Accept
        </Button>
      </div>
    </div>
  );
}
