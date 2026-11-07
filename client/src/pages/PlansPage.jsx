import { useRef } from "react";
import { ArrowDown, CalendarCheck, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import CoverageChecker from "../components/CoverageChecker";
import PlansTable from "../components/PlansTable";
import OtherServices from "../components/OtherServices";
import AdsSection from "../components/AdsSection";
import Button from "../components/ui/Button";

export default function PlansPage() {
  const plansRef = useRef(null);
  const servicesRef = useRef(null);

  function scrollToPlans() {
    plansRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function scrollToServices() {
    servicesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <>
      <section className="bg-brand-navy">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
              NetAss Internet Services
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Fast Fiber for
              <span className="block text-brand-orange">Mumbai Homes</span>
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-white/70">
              Explore NetAss internet plans, compare speeds and pricing, and
              find the right connection for your home or business.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="cta" onClick={scrollToPlans}>
                <CalendarCheck size={18} />
                Book Online
              </Button>

              <Button
                variant="outline"
                className="border-white/50 bg-transparent text-white hover:bg-white hover:text-brand-navy"
                onClick={scrollToServices}
              >
                <Layers3 size={18} />
                Other Services
              </Button>
            </div>
          </div>

          <CoverageChecker />
        </div>
      </section>

      <AdsSection placement="plans_banner" />

      <section ref={plansRef} className="mx-auto max-w-7xl px-6 py-16">
        <PlansTable />
      </section>

      <div ref={servicesRef}>
        <OtherServices />
      </div>

      <section className="bg-brand-navy px-6 py-14 text-center">
        <h2 className="text-2xl font-bold text-white">
          Need help choosing a plan?
        </h2>
        <p className="mt-3 text-sm text-white/70">
          Contact our team for assistance with NetAss services.
        </p>
        <Link to="/contact" className="mt-6 inline-block">
          <Button variant="cta">Contact NetAss</Button>
        </Link>
      </section>
    </>
  );
}
