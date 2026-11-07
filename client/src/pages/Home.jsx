import { Link } from "react-router-dom";
import {
  Wifi,
  ShieldCheck,
  Headset,
  Gauge,
  ArrowRight,
  Router,
  Building2,
  Wallet,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import CoverageChecker from "../components/CoverageChecker";
import AdsSection from "../components/AdsSection";
import FAQSection from "../components/FAQSection";

const features = [
  {
    icon: Gauge,
    title: "High-Speed Internet",
    description:
      "Enjoy fast and reliable connectivity for work, entertainment and everyday browsing.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Connectivity",
    description:
      "Stay connected with a service designed for consistent everyday performance.",
  },
  {
    icon: Headset,
    title: "Customer Support",
    description:
      "Get assistance with connection requests, billing and technical issues.",
  },
  {
    icon: Wifi,
    title: "Flexible Plans",
    description: "Choose a plan that fits your speed requirements and budget.",
  },
];

const services = [
  {
    icon: Router,
    title: "Wi-Fi Vouchers",
    description: "Get short-duration internet access through voucher packs.",
    link: "/vouchers",
  },
  {
    icon: Building2,
    title: "Business Connectivity",
    description: "Enquire about connectivity solutions for your business.",
    link: "/contact",
  },
  {
    icon: Wallet,
    title: "Other Services",
    description: "Ask about static IP, routers, shifting and more.",
    link: "/contact",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-blue/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-brand-orange/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white">
              YOUR INTERNET. YOUR WAY.
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Stay Connected.
              <span className="block text-brand-orange">Stay Ahead.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/70">
              Discover reliable internet services with NetAss. Find a plan that
              suits your needs and enjoy a better connected experience.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/plans">
                <Button variant="cta">
                  Explore Internet Plans
                  <ArrowRight size={18} />
                </Button>
              </Link>

              <Link to="/contact">
                <Link to="/contact">
                  <Button variant="cta">Contact Us</Button>
                </Link>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-7 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-brand-orange" />
                Reliable service
              </span>
              <span className="flex items-center gap-2">
                <Wifi size={18} className="text-brand-orange" />
                Multiple plans
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">NETASS CONNECTIVITY</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Find your connection
                  </h2>
                </div>
                <div className="rounded-xl bg-brand-orange p-3 text-white">
                  <Wifi size={28} />
                </div>
              </div>

              <CoverageChecker />

              <p className="mt-4 text-center text-xs text-white/60">
                Enter your PIN code to check NetAss service availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdsSection placement="plans_banner" />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Why NetAss?
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-navy">
            Internet Made Simple
          </h2>
          <p className="mt-3 text-muted">
            Everything you need for a dependable internet experience.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 inline-flex rounded-xl bg-blue-50 p-3 text-brand-blue">
                  <Icon size={26} />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
                More from NetAss
              </p>
              <h2 className="mt-2 text-3xl font-bold text-brand-navy">
                Our Services
              </h2>
            </div>

            <Link to="/contact" className="text-sm font-bold text-brand-blue">
              Enquire about services <ArrowRight size={16} className="inline" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Card key={service.title} className="flex flex-col">
                  <div className="mb-5 inline-flex w-fit rounded-xl bg-orange-50 p-3 text-brand-orange">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className="mt-5 text-sm font-bold text-brand-blue"
                  >
                    Learn More <ArrowRight size={16} className="inline" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
