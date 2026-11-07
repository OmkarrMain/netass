import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MapPin, Search, CheckCircle2, XCircle } from "lucide-react";
import { api } from "../api/client";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function CoverageChecker() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState(null);

  const coverageMutation = useMutation({
    mutationFn: async (pin) => {
      const response = await api.get(`/coverage/${pin}`);
      return response.data;
    },
    onSuccess: (data) => setResult(data),
    onError: (error) => {
      setResult({
        serviceable: false,
        message:
          error.response?.data?.message ||
          "Unable to check coverage right now.",
      });
    },
  });

  function checkCoverage(event) {
    event.preventDefault();

    if (!/^\d{6}$/.test(pincode)) {
      setResult({
        message: "Enter a valid 6-digit PIN code.",
        invalid: true,
      });
      return;
    }

    setResult(null);
    coverageMutation.mutate(pincode);
  }

  return (
    <div className="w-full rounded-2xl border border-line bg-white p-6 shadow-lg sm:p-8">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-50 p-3 text-brand-blue">
          <MapPin size={25} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-brand-navy">
            Check Service Availability
          </h2>
          <p className="text-sm text-muted">
            Find out if NetAss is available in your area.
          </p>
        </div>
      </div>

      <form
        onSubmit={checkCoverage}
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <div className="flex-1">
          <Input
            placeholder="Enter 6-digit PIN code"
            value={pincode}
            onChange={(event) => {
              setPincode(event.target.value.replace(/\D/g, "").slice(0, 6));
              setResult(null);
            }}
            inputMode="numeric"
            maxLength={6}
          />
        </div>

        <Button
          type="submit"
          variant="cta"
          loading={coverageMutation.isPending}
        >
          <Search size={17} />
          Check Availability
        </Button>
      </form>

      {result && (
        <div
          className={`mt-5 flex items-start gap-3 rounded-xl p-4 ${
            result.invalid || result.serviceable === false
              ? "bg-red-50 text-danger"
              : "bg-green-50 text-success"
          }`}
        >
          {result.serviceable ? (
            <CheckCircle2 size={22} />
          ) : (
            <XCircle size={22} />
          )}

          <div>
            <p className="font-semibold">
              {result.invalid
                ? "Invalid PIN code"
                : result.serviceable
                  ? "NetAss is available in your area!"
                  : "NetAss is not available in your area yet."}
            </p>

            <p className="mt-1 text-sm">
              {result.message ||
                (result.serviceable
                  ? [result.area, result.city].filter(Boolean).join(", ")
                  : "Submit a callback request and our team can contact you.")}
            </p>

            {!result.invalid && result.serviceable === false && (
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("netass:callback", {
                      detail: { pincode },
                    }),
                  )
                }
                className="mt-2 text-sm font-bold underline"
              >
                Notify me when available
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
