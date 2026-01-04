import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams();

  async function CreateLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });

    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-160 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Cadastrar link</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeCreateLinkModal}
              />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={CreateLink} className="space-y-3">
          <div className="px-4 flex items-center flex-1 h-14 bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              placeholder="Título do link"
              className="bg-transparent text-md placeholder-zinc-400 outline-none flex-1 "
            />
          </div>

          <div className="px-4 flex items-center flex-1 h-14 bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
            <Link2 className="size-5 text-zinc-400" />
            <input
              type="text"
              name="url"
              placeholder="URL"
              className="bg-transparent text-md placeholder-zinc-400 outline-none flex-1 "
            />
          </div>          

          <Button type="submit" variant="primary" size="full">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  );
}
