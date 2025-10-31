import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';
import { useIsMobile } from '../utils/deviceUtils';

const DraggableTaskCard = ({ task, onEdit }) => {
  const isMobile = useIsMobile();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    disabled: isMobile // Disable dragging on mobile
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isMobile ? 'default' : (isDragging ? 'grabbing' : 'grab'),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isMobile ? {} : listeners)} // Only add listeners on non-mobile
      className={isMobile ? "" : "touch-none"} // Only prevent touch on non-mobile
    >
      <TaskCard task={task} isDragOver={isDragging} onEdit={onEdit} />
    </div>
  );
};

export default DraggableTaskCard;