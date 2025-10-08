import { Card, CardActions, CardHeader } from './TaskCardStyles';
import { Pencil, Trash2 } from 'lucide-react';
import { colors } from '../styles/colors';

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'done';
  priority: 'low' | 'medium' | 'high';
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
}

function TaskCard({
  title,
  description,
  priority,
  onEdit,
  onDelete,
  onComplete,
}: TaskCardProps) {
  return (
    <Card priority={priority}>
      <CardHeader>
        <h4>{title}</h4>
        <p>{description || 'No description'}</p>
      </CardHeader>

      <CardActions>
        {onComplete && (
          <button
            onClick={onComplete}
            title="Mark as done"
            aria-label="Mark as done"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke={colors.primary}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {onEdit && (
          <button onClick={onEdit} title="Edit Task" aria-label="Edit" type="button">
            <Pencil size={16} color={colors.text} strokeWidth={1.8} />
          </button>
        )}

        {onDelete && (
          <button onClick={onDelete} title="Delete Task" aria-label="Delete" type="button">
            <Trash2 size={16} color={colors.text} strokeWidth={1.8} />
          </button>
        )}
      </CardActions>
    </Card>
  );
}

export default TaskCard;
