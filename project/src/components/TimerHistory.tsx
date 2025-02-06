import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { TimerHistory } from '../types/Timer';

interface HistoryScreenProps {
  history: TimerHistory[];
  onDelete: (id: string) => void;
}

export function HistoryScreen({ history, onDelete }: HistoryScreenProps) {
  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  return (
    <scrollView>
      <stackLayout style={styles.container}>
        <label className="text-2xl font-bold mb-4">Timer History</label>
        {history.length === 0 ? (
          <label className="text-gray-500">No completed timers yet</label>
        ) : (
          history.map((item) => (
            <stackLayout key={item.id} style={styles.historyItem}>
              <flexboxLayout style={styles.itemHeader}>
                <label className="text-lg font-semibold">{item.name}</label>
                <button
                  className="text-red-500"
                  onTap={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </flexboxLayout>
              <label className="text-sm text-gray-600">
                Category: {item.category}
              </label>
              <label className="text-sm text-gray-600">
                Completed: {formatDate(item.completedAt)}
              </label>
            </stackLayout>
          ))
        )}
      </stackLayout>
    </scrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  historyItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  }
});