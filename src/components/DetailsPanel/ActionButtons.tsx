import React from 'react';

interface ActionButtonsProps {
  onApplyReply: () => void;
  onEditBeforeSending: () => void;
  onUpdate: () => void;
  onRemove: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onApplyReply, 
  onEditBeforeSending, 
  onUpdate, 
  onRemove 
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <button
        onClick={onApplyReply}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Применить как ответ
      </button>
      <button
        onClick={onEditBeforeSending}
        className="w-full bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Редактировать перед отправкой
      </button>
      <div className="flex space-x-2 pt-2">
        <button
          onClick={onUpdate}
          className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Обновить
        </button>
        <button
          onClick={onRemove}
          className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;