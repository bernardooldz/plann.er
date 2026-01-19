import { CircleCheck, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/trips.service";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EditActivityModal } from "../modals/EditActivityModal";
import { DeleteActivityModal } from "../modals/DeleteActivityModal";

interface Activity {
  id: string;
  title: string;
  occurs_at: string;
  can_edit: boolean;
}

interface ActivityGroup {
  date: string;
  activities: Activity[];
}

export function ActivitiesList() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<ActivityGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [deletingActivity, setDeletingActivity] = useState<Activity | null>(null);

  function loadActivities() {
    if (!tripId) return;
    
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => {
        setActivities(response.data.activities || []);
      })
      .catch((error) => {
        console.error('Erro ao carregar atividades:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadActivities();
  }, [tripId]);

  function handleEditActivity(activity: Activity) {
    setEditingActivity(activity);
  }

  function handleDeleteActivity(activity: Activity) {
    setDeletingActivity(activity);
  }

  function handleActivityUpdated() {
    setEditingActivity(null);
    loadActivities();
  }

  function handleActivityDeleted() {
    setDeletingActivity(null);
    loadActivities();
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-zinc-400">Carregando atividades...</div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="space-y-8">
        <p className="text-sm text-zinc-500">
          Nenhuma atividade cadastrada ainda.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {activities.map((category) => {
          return (
            <div key={category.date} className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">
                  Dia {format(new Date(category.date), "d")}
                </span>
                <span className="text-xs text-zinc-500">
                  {format(new Date(category.date), "EEEE", { locale: ptBR })}
                </span>
              </div>
              {category.activities.length > 0 ? (
                <div>
                  {category.activities.map((activity) => {
                    return (
                      <div key={activity.id} className="space-y-2.5">
                        <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                          <CircleCheck className="size-5 text-lime-300" />
                          <span className="text-zinc-100 flex-1">{activity.title}</span>
                          <span className="text-zinc-400 text-sm">
                            {format(new Date(activity.occurs_at), "HH:mm")}h
                          </span>
                          {activity.can_edit && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleEditActivity(activity)}
                                className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-all"
                                title="Editar atividade"
                              >
                                <Edit className="size-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteActivity(activity)}
                                className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
                                title="Excluir atividade"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">
                  Nenhuma atividade cadastrada nessa data.
                </p>
              )}
            </div>
          );
        })}
      </div>

      {editingActivity && (
        <EditActivityModal
          activity={editingActivity}
          closeEditActivityModal={handleActivityUpdated}
        />
      )}

      {deletingActivity && (
        <DeleteActivityModal
          activity={deletingActivity}
          onConfirm={handleActivityDeleted}
          onCancel={() => setDeletingActivity(null)}
        />
      )}
    </>
  );
}
