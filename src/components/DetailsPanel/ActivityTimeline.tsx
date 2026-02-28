import React from 'react';
import { ActivityLog } from '../../types';
import Avatar from '../Common/Avatar';

interface ActivityTimelineProps {
  activities: ActivityLog[];
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  return (
    <div className="flow-root">
      <ul className="divide-y divide-neutral-200">
        {activities.map((activity) => (
          <li key={activity.id} className="py-4">
            <div className="flex space-x-3">
              <Avatar user={activity.user} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">{activity.user.name}</p>
                <p className="text-sm text-neutral-500 truncate">{activity.action}</p>
                <p className="text-xs text-neutral-400 mt-1">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-neutral-600">{activity.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityTimeline;