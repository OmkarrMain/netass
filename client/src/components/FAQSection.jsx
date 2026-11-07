import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { api } from "../api/client";
import { useState } from "react";

export default function FAQSection({ limit = 5 }) {
  const [active, setActive] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const response = await api.get("/faqs");
      return response.data.faqs || response.data;
    },
  });

  const faqs = Array.isArray(data) ? data : [];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-9 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Need Help?
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-navy">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-muted">
            Answers to common questions about NetAss services.
          </p>
        </div>

        {isLoading && (
          <p className="py-8 text-center text-muted">Loading FAQs...</p>
        )}

        {isError && (
          <p className="py-8 text-center text-danger">Unable to load FAQs.</p>
        )}

        {!isLoading && !isError && !faqs.length && (
          <p className="py-8 text-center text-muted">
            No FAQs available right now.
          </p>
        )}

        <div className="space-y-3">
          {(limit === null ? faqs : faqs.slice(0, limit)).map((faq, index) => (
            <div
              key={faq.id || index}
              className="overflow-hidden rounded-xl border border-line"
            >
              <button
                onClick={() => setActive(active === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-ink">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-brand-blue transition ${
                    active === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {active === index && (
                <div className="border-t border-line px-5 py-4 text-sm leading-6 text-muted">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {limit && (
          <div className="mt-7 text-center">
            <Link
              to="/faq"
              className="text-sm font-bold text-brand-blue hover:text-brand-orange"
            >
              View all FAQs
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
