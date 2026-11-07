import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export default function AdPanel({ placement }) {
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

  if (isLoading) {
    return <div className="h-[420px] animate-pulse rounded-2xl bg-white/10" />;
  }

  if (!ads.length) {
    return (
      <div className="flex h-[420px] flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/5 p-6 text-center">
        <div className="text-4xl font-bold text-white">NetAss</div>
        <p className="mt-3 text-sm text-white/60">
          Your connection to a better internet experience.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[420px] flex-col gap-4">
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.link_url || "#"}
          target={ad.link_url ? "_blank" : undefined}
          rel={ad.link_url ? "noreferrer" : undefined}
          className="group relative flex-1 overflow-hidden rounded-2xl border border-white/15 bg-white/10"
        >
          <img
            src={ad.image_url}
            alt={ad.title || "NetAss promotion"}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />

          {ad.title && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-12">
              <p className="font-semibold text-white">{ad.title}</p>
            </div>
          )}
        </a>
      ))}
    </div>
  );
}
