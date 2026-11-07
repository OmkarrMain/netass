import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { api } from "../api/client";
import Button from "./ui/Button";
import Input from "./ui/Input";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export default function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({
    type: "callback",
    title: "Request a Callback",
    description: "Our team will contact you about NetAss availability.",
    pincode: "",
  });
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    function handleOpen(event) {
      setDetails({
        type: event.detail?.type || "callback",
        title: event.detail?.title || "Request a Callback",
        description: event.detail?.description || "Our team will contact you.",
        pincode: event.detail?.pincode || "",
      });
      setForm(initialForm);
      setOpen(true);
    }

    window.addEventListener("netass:callback", handleOpen);
    window.addEventListener("netass:enquiry", handleOpen);

    return () => {
      window.removeEventListener("netass:callback", handleOpen);
      window.removeEventListener("netass:enquiry", handleOpen);
    };
  }, []);

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post("/enquiries", payload);
      return response.data;
    },
    onSuccess: () => {
      setForm(initialForm);
      setOpen(false);
      window.dispatchEvent(
        new CustomEvent("netass:toast", {
          detail: { message: "Your enquiry has been submitted successfully." },
        }),
      );
    },
  });

  function submit(event) {
    event.preventDefault();

    mutation.mutate({
      type: details.type,
      name: form.name.trim(),
      phone: form.phone,
      email: form.email.trim() || null,
      message: [
        form.message.trim(),
        details.pincode ? `PIN code: ${details.pincode}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-brand-navy">
              {details.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{details.description}</p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-muted hover:bg-page"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter your name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />

          <Input
            label="Mobile Number"
            placeholder="10-digit mobile number"
            value={form.phone}
            onChange={(event) =>
              setForm({
                ...form,
                phone: event.target.value.replace(/\D/g, "").slice(0, 10),
              })
            }
            inputMode="numeric"
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          />

          {details.pincode && (
            <Input
              label="PIN Code"
              value={details.pincode}
              onChange={(event) =>
                setDetails({
                  ...details,
                  pincode: event.target.value.replace(/\D/g, "").slice(0, 6),
                })
              }
              inputMode="numeric"
              maxLength={6}
            />
          )}

          <label className="block space-y-1.5">
            <span className="text-sm font-semibold text-ink">Message</span>
            <textarea
              rows={3}
              value={form.message}
              onChange={(event) =>
                setForm({ ...form, message: event.target.value })
              }
              placeholder="Tell us what you need."
              className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue"
            />
          </label>

          {mutation.isError && (
            <p className="text-sm text-danger">
              {mutation.error.response?.data?.message ||
                "Unable to submit your enquiry."}
            </p>
          )}

          <Button
            type="submit"
            variant="cta"
            block
            loading={mutation.isPending}
          >
            Submit Enquiry
          </Button>
        </form>
      </div>
    </div>
  );
}
