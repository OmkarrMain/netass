import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export default function Footer() {
  const { data } = useQuery({
    queryKey: ["public-settings"],
    queryFn: async () => {
      const response = await api.get("/settings/public");
      return response.data;
    },
  });

  const settings = data?.settings || data || {};
  const supportEmail = settings.support_email || "support@netass.in";
  const phone = settings.support_phone || settings.contact_phone;

  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold">NetAss</h2>
          <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
            Reliable internet connectivity for homes and businesses. Stay
            connected with NetAss.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <Link to="/plans" className="hover:text-white">
              Internet Plans
            </Link>
            <Link to="/about" className="hover:text-white">
              About Us
            </Link>
            <Link to="/faq" className="hover:text-white">
              FAQs
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Customer Support</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <Link to="/contact" className="hover:text-white">
              Contact Us
            </Link>
            <Link to="/documents" className="hover:text-white">
              Documents Required
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Get in Touch</h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p>{phone || "Contact support for assistance"}</p>
            <a
              href={`mailto:${supportEmail}`}
              className="block hover:text-white"
            >
              {supportEmail}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 px-6 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} NetAss. All rights reserved.
      </div>
    </footer>
  );
}
