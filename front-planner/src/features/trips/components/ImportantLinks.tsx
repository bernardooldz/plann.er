import { Link2, Plus } from "lucide-react";
import { Button } from "../../../design-system";
import { api } from "../services/trips.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ImportantLinksProps {
  openCreateLinkModal: () => void;
}

interface Link {
  title: string;
  url: string;
}

export function ImportantLinks({ openCreateLinkModal }: ImportantLinksProps) {
  const { tripId } = useParams();
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response: { data: { links: Link[] } }) => setLinks(response.data.links));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>
      <div className="space-y-5">
        {links.length > 0 ? (
          links.map((link) => (
            <div
              key={link.title}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                >
                  {link.url}
                </a>
              </div>
              <Link2 className="size-5 text-zinc-400 shrink-0" />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-zinc-500">
              Ainda não há nenhum link cadastrado
            </span>
          </div>
        )}
      </div>

      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
