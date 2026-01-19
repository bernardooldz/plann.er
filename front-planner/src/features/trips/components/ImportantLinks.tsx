import { Link2, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "../../../design-system";
import { api } from "../services/trips.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditLinkModal } from "../modals/EditLinkModal";
import { DeleteLinkModal } from "../modals/DeleteLinkModal";

interface ImportantLinksProps {
  openCreateLinkModal: () => void;
  refreshTrigger?: number;
}

interface Link {
  id: string;
  title: string;
  url: string;
  can_edit: boolean;
}

export function ImportantLinks({
  openCreateLinkModal,
  refreshTrigger,
}: ImportantLinksProps) {
  const { tripId } = useParams();
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [deletingLink, setDeletingLink] = useState<Link | null>(null);

  function loadLinks() {
    if (!tripId) return;

    api
      .get(`/trips/${tripId}/links`)
      .then((response) => {
        setLinks(response.data.links || []);
      })
      .catch((error) => {
        console.error("Erro ao carregar links:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadLinks();
  }, [tripId, refreshTrigger]);

  function handleEditLink(link: Link) {
    setEditingLink(link);
  }

  function handleDeleteLink(link: Link) {
    setDeletingLink(link);
  }

  function handleLinkUpdated() {
    setEditingLink(null);
    loadLinks();
  }

  function handleLinkDeleted() {
    setDeletingLink(null);
    loadLinks();
  }

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-zinc-100">
            Links importantes
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed -mt-2">
            Organize links úteis para a viagem como reservas, mapas e
            informações importantes.
          </p>
        </div>

        {loading ? (
          <div className="text-zinc-400">Carregando links...</div>
        ) : (
          <div className="space-y-5">
            {links.length > 0 ? (
              links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between gap-4 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800"
                >
                  <div className="space-y-1 flex-1">
                    <span className="block font-medium text-zinc-100">
                      {link.title}
                    </span>
                    <a
                      href={link.url}
                      target="_blank"
                      className="block text-sm text-zinc-400 truncate hover:text-lime-200 transition-colors"
                    >
                      {link.url}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-all"
                      title="Abrir link"
                      href={link.url}
                    >
                      <Link2 className="size-5 text-lime-400 shrink-0" />
                    </a>

                    {link.can_edit && (
                      <>
                        <button
                          onClick={() => handleEditLink(link)}
                          className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-all"
                          title="Editar link"
                        >
                          <Edit className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLink(link)}
                          className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
                          title="Excluir link"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-zinc-400">
                  Nenhum link foi cadastrado ainda.
                </p>
              </div>
            )}
          </div>
        )}

        <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
          <Plus className="size-5" />
          Cadastrar novo link
        </Button>
      </div>

      {editingLink && (
        <EditLinkModal
          link={editingLink}
          closeEditLinkModal={handleLinkUpdated}
        />
      )}

      {deletingLink && (
        <DeleteLinkModal
          link={deletingLink}
          onConfirm={handleLinkDeleted}
          onCancel={() => setDeletingLink(null)}
        />
      )}
    </>
  );
}
