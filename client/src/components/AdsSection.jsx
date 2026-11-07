import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export default function AdsSection({ placement = "plans_banner" }) {
  const { data, isLoading } = useQuery({
    queryKey: ["ads", placement],
    queryFn: async () => {
      const response = await api.get("/ads", {
        params: { placement },
      });

      return response.data.ads || response.data;
    },
  });

  const ads = Array.isArray(data) ? data : [];

  if (isLoading || !ads.length) return null;

  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-6 py-8 sm:grid-cols-2">
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.link_url || "#"}
          target={ad.link_url ? "_blank" : undefined}
          rel={ad.link_url ? "noreferrer" : undefined}
          className="group overflow-hidden rounded-2xl border border-line bg-white"
        >
          <img
            src={ad.image_url}
            alt={ad.title || "NetAss advertisement"}
            className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
          {ad.title && (
            <div className="p-4">
              <h3 className="font-semibold text-brand-navy">{ad.title}</h3>
            </div>
          )}
        </a>
      ))}
    </section>
  );
}
