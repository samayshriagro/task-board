import React from 'react';
import { Wifi, WifiOff, RefreshCw, AlertCircle } from 'lucide-react';
import { useTaskStore } from '../store/taskStoreSupabase';

const ConnectionStatus = () => {
  const { isOnline, isLoading, error, syncWithSupabase } = useTaskStore();

  const handleSync = () => {
    syncWithSupabase();
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <RefreshCw size={16} className="animate-spin" />
        <span className="text-sm">Syncing...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
        <AlertCircle size={16} />
        <span className="text-sm">Offline mode</span>
        <button
          onClick={handleSync}
          className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900 rounded hover:bg-orange-200 dark:hover:bg-orange-800"
          title="Try to reconnect"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isOnline ? (
        <>
          <Wifi size={16} className="text-green-600 dark:text-green-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Online</span>
        </>
      ) : (
        <>
          <WifiOff size={16} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Offline</span>
          <button
            onClick={handleSync}
            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Try to connect"
          >
            Connect
          </button>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;