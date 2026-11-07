import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Check, GitCompareArrows, X } from "lucide-react";
import { api } from "../api/client";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import EmptyState from "./ui/EmptyState";

const categories = [
  { value: "fiber", label: "Fiber Plans" },
  { value: "broadband", label: "Broadband Plans" },
  { value: "topup", label: "Data Top-Up" },
  { value: "addon", label: "Add-On Services" },
];

const cycles = [
  { value: "monthly", label: "Monthly", field: "monthly_price" },
  { value: "half_yearly", label: "6 Months", field: "half_yearly_price" },
  { value: "yearly", label: "Yearly", field: "yearly_price" },
];

function formatPrice(value) {
  if (value === null || value === undefined || value === "") return "N/A";

  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function PlanPrice({ plan, cycle }) {
  const selectedCycle = cycles.find((item) => item.value === cycle);
  return formatPrice(plan[selectedCycle.field]);
}

export default function PlansTable() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("fiber");
  const [cycle, setCycle] = useState("monthly");
  const [selected, setSelected] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["plans", category],
    queryFn: async () => {
      const response = await api.get("/plans", {
        params: { category },
      });

      return response.data.plans || response.data;
    },
  });

  const plans = Array.isArray(data) ? data : [];

  const selectedPlans = useMemo(
    () => plans.filter((plan) => selected.includes(plan.id)),
    [plans, selected],
  );

  function changeCategory(value) {
    setCategory(value);
    setSelected([]);
    setSelectionMode(false);
  }

  function toggleCompare(planId) {
    setSelected((current) => {
      if (current.includes(planId)) {
        return current.filter((id) => id !== planId);
      }

      if (current.length >= 3) {
        window.dispatchEvent(
          new CustomEvent("netass:toast", {
            detail: {
              type: "error",
              message: "You can compare a maximum of three plans.",
            },
          }),
        );

        return current;
      }

      return [...current, planId];
    });
  }

  function choosePlan(plan) {
    navigate("/book", {
      state: {
        plan,
        billingCycle: cycle,
      },
    });
  }

  return (
    <section id="plans-table" className="scroll-mt-24">
      <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Choose Your Connection
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-navy">
            Explore Our Plans
          </h2>
          <p className="mt-2 text-sm text-muted">
            Compare available plans and select the one that suits you.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {cycles.map((item) => (
            <button
              key={item.value}
              onClick={() => setCycle(item.value)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                cycle === item.value
                  ? "border-brand-blue bg-brand-blue text-white"
                  : "border-line bg-white text-muted hover:border-brand-blue"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item.value}
            onClick={() => changeCategory(item.value)}
            className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
              category === item.value
                ? "bg-brand-navy text-white"
                : "border border-line bg-white text-muted hover:border-brand-blue hover:text-brand-blue"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          Showing {plans.length} available plans
        </p>

        <Button
          variant={selectionMode ? "outline" : "primary"}
          onClick={() => {
            setSelectionMode(!selectionMode);
            setSelected([]);
          }}
        >
          {selectionMode ? "Cancel Selection" : "Book Online"}
        </Button>
      </div>

      {isLoading && (
        <div className="rounded-xl border border-line bg-white p-12 text-center text-muted">
          Loading plans...
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-danger">
          {error.response?.data?.message ||
            "Unable to load plans. Please try again."}
        </div>
      )}

      {!isLoading && !isError && plans.length === 0 && (
        <EmptyState
          title="No plans available"
          description="There are currently no active plans in this category."
        />
      )}

      {!isLoading && !isError && plans.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-sm">
            <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
              <thead className="bg-table-head text-brand-navy">
                <tr>
                  {selectionMode && <th className="px-4 py-4">Select</th>}
                  <th className="px-4 py-4">Speed</th>
                  <th className="px-4 py-4">Plan Name</th>
                  <th
                    className={`px-4 py-4 ${cycle === "monthly" ? "bg-blue-100" : ""}`}
                  >
                    Monthly
                  </th>
                  <th
                    className={`px-4 py-4 ${cycle === "half_yearly" ? "bg-blue-100" : ""}`}
                  >
                    6 Months
                  </th>
                  <th
                    className={`px-4 py-4 ${cycle === "yearly" ? "bg-blue-100" : ""}`}
                  >
                    Yearly
                  </th>
                  <th className="px-4 py-4">Data Usage</th>
                  <th className="px-4 py-4">FUP</th>
                  <th className="px-4 py-4">After FUP</th>
                  <th className="px-4 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {plans.map((plan, index) => (
                  <tr
                    key={plan.id}
                    className={`border-t border-line ${
                      index % 2 === 0 ? "bg-white" : "bg-table-zebra"
                    }`}
                  >
                    {selectionMode && (
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selected.includes(plan.id)}
                          onChange={() => toggleCompare(plan.id)}
                          className="h-4 w-4 accent-brand-blue"
                          aria-label={`Compare ${plan.name}`}
                        />
                      </td>
                    )}

                    <td className="px-4 py-4 font-semibold text-brand-navy">
                      {plan.speed_mbps ? `${plan.speed_mbps} Mbps` : "N/A"}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-semibold text-ink">
                          {plan.name}
                        </span>
                        {plan.is_popular && (
                          <Badge variant="success">Popular</Badge>
                        )}
                      </div>
                    </td>

                    <td
                      className={`px-4 py-4 font-semibold ${cycle === "monthly" ? "bg-blue-50 text-brand-blue" : ""}`}
                    >
                      {formatPrice(plan.monthly_price)}
                    </td>

                    <td
                      className={`px-4 py-4 font-semibold ${cycle === "half_yearly" ? "bg-blue-50 text-brand-blue" : ""}`}
                    >
                      {formatPrice(plan.half_yearly_price)}
                    </td>

                    <td
                      className={`px-4 py-4 font-semibold ${cycle === "yearly" ? "bg-blue-50 text-brand-blue" : ""}`}
                    >
                      {formatPrice(plan.yearly_price)}
                    </td>

                    <td className="px-4 py-4">
                      {plan.data_limit || "Unlimited"}
                    </td>
                    <td className="px-4 py-4">
                      {plan.fup_gb ? `${plan.fup_gb} GB` : "N/A"}
                    </td>
                    <td className="px-4 py-4">
                      {plan.post_fup_speed_mbps
                        ? `${plan.post_fup_speed_mbps} Mbps`
                        : "N/A"}
                    </td>

                    <td className="px-4 py-4">
                      <Button
                        variant="cta"
                        className="px-3 py-2"
                        onClick={() => choosePlan(plan)}
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-white p-5">
            <h3 className="font-semibold text-brand-navy">Plan Information</h3>
            <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <Check size={16} className="mt-0.5 text-success" />
                Speeds are subject to the selected plan's specifications.
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="mt-0.5 text-success" />
                Billing options include monthly, six-month and yearly cycles.
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="mt-0.5 text-success" />
                FUP limits and post-FUP speeds are shown for applicable plans.
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="mt-0.5 text-success" />
                Final charges are calculated at checkout with applicable GST.
              </li>
            </ul>
          </div>
        </>
      )}

      {selectionMode && selected.length > 0 && (
        <div className="fixed bottom-5 left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 items-center justify-between gap-4 rounded-xl border border-line bg-white p-4 shadow-2xl">
          <div>
            <p className="font-semibold text-brand-navy">
              {selected.length} plans selected
            </p>
            <p className="text-xs text-muted">
              Select up to 3 plans to compare.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setSelected([])}>
              Clear
            </Button>
            <Button
              variant="cta"
              disabled={selected.length < 2}
              onClick={() => setCompareOpen(true)}
            >
              <GitCompareArrows size={16} />
              Compare
            </Button>
          </div>
        </div>
      )}

      {compareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 p-4">
          <div className="max-h-[85vh] w-full max-w-5xl overflow-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-brand-navy">
                  Compare Plans
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Prices shown for the{" "}
                  {cycles.find((item) => item.value === cycle)?.label} billing
                  cycle.
                </p>
              </div>

              <button
                onClick={() => setCompareOpen(false)}
                className="rounded-lg p-2 text-muted hover:bg-page"
                aria-label="Close comparison"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {selectedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-xl border border-line p-5"
                >
                  <h4 className="font-bold text-brand-navy">{plan.name}</h4>
                  <p className="mt-3 text-2xl font-bold text-brand-blue">
                    <PlanPrice plan={plan} cycle={cycle} />
                  </p>
                  <div className="mt-5 space-y-3 text-sm text-muted">
                    <p>
                      Speed:{" "}
                      {plan.speed_mbps ? `${plan.speed_mbps} Mbps` : "N/A"}
                    </p>
                    <p>Data: {plan.data_limit || "Unlimited"}</p>
                    <p>FUP: {plan.fup_gb ? `${plan.fup_gb} GB` : "N/A"}</p>
                    <p>
                      Post-FUP:{" "}
                      {plan.post_fup_speed_mbps
                        ? `${plan.post_fup_speed_mbps} Mbps`
                        : "N/A"}
                    </p>
                    <p>
                      Features:{" "}
                      {Array.isArray(plan.features)
                        ? plan.features.join(", ")
                        : plan.features || "Standard features"}
                    </p>
                  </div>
                  <Button
                    variant="cta"
                    block
                    className="mt-6"
                    onClick={() => choosePlan(plan)}
                  >
                    Choose Plan
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
