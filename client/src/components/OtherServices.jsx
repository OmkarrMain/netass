import {
  Ticket,
  Database,
  Globe,
  Router,
  Truck,
  RefreshCw,
  Building2,
  Handshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "./ui/Card";
import Button from "./ui/Button";

const services = [
  {
    title: "Wi-Fi Vouchers",
    description: "Purchase short-duration internet voucher packs.",
    icon: Ticket,
    route: "/vouchers",
  },
  {
    title: "Data Top-Up",
    description: "Enquire about additional data for your connection.",
    icon: Database,
    type: "contact",
  },
  {
    title: "Static IP",
    description: "Request a dedicated static IP address.",
    icon: Globe,
    type: "static_ip",
  },
  {
    title: "Router Buy / Rent",
    description: "Ask about router purchase and rental options.",
    icon: Router,
    type: "router",
  },
  {
    title: "Connection Shifting",
    description: "Move your existing connection to a new address.",
    icon: Truck,
    type: "shifting",
  },
  {
    title: "Plan Change",
    description: "Enquire about upgrading or changing your plan.",
    icon: RefreshCw,
    type: "contact",
  },
  {
    title: "Enterprise Leased Line",
    description: "Discuss dedicated connectivity for your business.",
    icon: Building2,
    type: "enterprise",
  },
  {
    title: "Partner Registration",
    description: "Explore opportunities to become a NetAss partner.",
    icon: Handshake,
    type: "franchise",
  },
];

export default function OtherServices() {
  function openEnquiry(service) {
    window.dispatchEvent(
      new CustomEvent("netass:enquiry", {
        detail: {
          type: service.type,
          title: service.title,
          description: service.description,
        },
      }),
    );
  }

  return (
    <section id="other-services" className="scroll-mt-24 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Beyond Internet Plans
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-navy">
            Other Services
          </h2>
          <p className="mt-3 text-sm text-muted">
            Explore additional services offered by NetAss.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card
                key={service.title}
                className="flex flex-col transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 inline-flex w-fit rounded-xl bg-blue-50 p-3 text-brand-blue">
                  <Icon size={25} />
                </div>

                <h3 className="font-bold text-brand-navy">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                  {service.description}
                </p>

                {service.route ? (
                  <Link to={service.route} className="mt-5">
                    <Button variant="outline" block>
                      Explore Service
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    block
                    className="mt-5"
                    onClick={() => openEnquiry(service)}
                  >
                    Send Enquiry
                  </Button>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
