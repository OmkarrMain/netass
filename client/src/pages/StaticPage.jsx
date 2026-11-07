import Card from "../components/ui/Card";

const content = {
  about: {
    title: "About NetAss",
    description:
      "NetAss provides internet connectivity services for homes and businesses. Our goal is to make internet access simple, reliable and accessible.",
  },
  contact: {
    title: "Contact Us",
    description:
      "For new connections, service enquiries, billing assistance or technical support, contact the NetAss support team at support@netass.in.",
  },
  documents: {
    title: "Documents Required",
    description:
      "For a new connection, keep one valid photo identity document and one address proof document ready for verification.",
  },
  terms: {
    title: "Terms & Conditions",
    description:
      "Connection requests, plan selection, payments and service usage are subject to NetAss service terms and applicable policies.",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "NetAss uses customer information to process connection requests, provide services and support account-related activities.",
  },
  refund: {
    title: "Refund Policy",
    description:
      "Refund requests are reviewed according to the payment status, service status and applicable NetAss refund terms.",
  },
};

export default function StaticPage({ page }) {
  const item = content[page];

  return (
    <main className="mx-auto min-h-[60vh] max-w-5xl px-6 py-16">
      <Card className="p-8 sm:p-12">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
          NetAss
        </p>
        <h1 className="mt-3 text-3xl font-bold text-brand-navy">
          {item.title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-muted">
          {item.description}
        </p>
      </Card>
    </main>
  );
}
