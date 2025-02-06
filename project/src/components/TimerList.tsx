import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { Timer, TimersByCategory } from '../types/Timer';

interface TimerListProps {
  timersByCategory: TimersByCategory;
  onStartTimer: (id: string) => void;
  onPauseTimer: (id: string) => void;
  onResetTimer: (id: string) => void;
  onStartCategory: (category: string) => void;
  onPauseCategory: (category: string) => void;
  onResetCategory: (category: string) => void;
}

export function TimerList({
  timersByCategory,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onStartCategory,
  onPauseCategory,
  onResetCategory
}: TimerListProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (timer: Timer): number => {
    return (timer.remainingTime / timer.duration) * 100;
  };

  // Get all unique categories
  const categories = Object.keys(timersByCategory);

  return (
    <scrollView>
      <stackLayout style={styles.container}>
        {/* Global Controls */}
        <stackLayout style={styles.globalControls}>
          <label className="text-xl font-bold mb-4">Global Controls</label>
          <flexboxLayout style={styles.buttonContainer}>
            <button
              className="bg-green-500 text-white p-2 rounded mr-2"
              onTap={() => categories.forEach(onStartCategory)}
            >
              Start All Timers
            </button>
            <button
              className="bg-yellow-500 text-white p-2 rounded mr-2"
              onTap={() => categories.forEach(onPauseCategory)}
            >
              Pause All Timers
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onTap={() => categories.forEach(onResetCategory)}
            >
              Reset All Timers
            </button>
          </flexboxLayout>
        </stackLayout>

        {/* Timer Categories */}
        {Object.entries(timersByCategory).map(([category, timers]) => (
          <stackLayout key={category} style={styles.categoryContainer}>
            <flexboxLayout style={styles.categoryHeader}>
              <label className="text-xl font-bold">{category}</label>
            </flexboxLayout>

            {timers.map((timer) => (
              <stackLayout key={timer.id} style={styles.timerContainer}>
                <flexboxLayout style={styles.timerHeader}>
                  <label className="text-lg font-semibold">{timer.name}</label>
                  <label>{formatTime(timer.remainingTime)}</label>
                </flexboxLayout>

                <progress
                  value={getProgressPercentage(timer)}
                  maxValue={100}
                  style={styles.progressBar}
                />

                <flexboxLayout style={styles.timerControls}>
                  {timer.status !== 'running' ? (
                    <button
                      className="bg-green-500 text-white p-1 rounded mr-1"
                      onTap={() => onStartTimer(timer.id)}
                    >
                      Start
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-500 text-white p-1 rounded mr-1"
                      onTap={() => onPauseTimer(timer.id)}
                    >
                      Pause
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white p-1 rounded"
                    onTap={() => onResetTimer(timer.id)}
                  >
                    Reset
                  </button>
                </flexboxLayout>
              </stackLayout>
            ))}
          </stackLayout>
        ))}
      </stackLayout>
    </scrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  globalControls: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  categoryContainer: {
    marginBottom: 16
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  timerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8
  },
  timerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  progressBar: {
    height: 4,
    marginBottom: 8
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});