import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { Timer, TimerFormData } from '../types/Timer';
import { useTimers } from '../hooks/useTimers';
import { TimerForm } from './TimerForm';
import { TimerList } from './TimerList';
import { CompletionModal } from './CompletionModal';

type ScreenOneProps = {
  route: RouteProp<MainStackParamList, "One">,
  navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function ScreenOne({ navigation }: ScreenOneProps) {
  const { timers, dispatch, getTimersByCategory, getCompletedTimer, clearCompletedTimer } = useTimers();
  const [showAddTimer, setShowAddTimer] = useState(false);
  const completedTimer = getCompletedTimer();

  const handleAddTimer = (data: TimerFormData) => {
    const newTimer: Timer = {
      id: Date.now().toString(),
      ...data,
      remainingTime: data.duration,
      status: 'idle'
    };
    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    setShowAddTimer(false);
  };

  const handleStartTimer = (id: string) => {
    dispatch({ type: 'START_TIMER', payload: id });
  };

  const handlePauseTimer = (id: string) => {
    dispatch({ type: 'PAUSE_TIMER', payload: id });
  };

  const handleResetTimer = (id: string) => {
    dispatch({ type: 'RESET_TIMER', payload: id });
  };

  const handleStartCategory = (category: string) => {
    dispatch({ type: 'START_CATEGORY', payload: category });
  };

  const handlePauseCategory = (category: string) => {
    dispatch({ type: 'PAUSE_CATEGORY', payload: category });
  };

  const handleResetCategory = (category: string) => {
    dispatch({ type: 'RESET_CATEGORY', payload: category });
  };

  // Function to navigate to ScreenTwo
  const navigateToScreenTwo = () => {
    navigation.navigate('Two');
  };

  return (
    <gridLayout rows="auto, *">
      <flexboxLayout row={0} style={styles.header}>
        <flexboxLayout style={styles.buttonContainer}>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onTap={() => setShowAddTimer(true)}
          >
            Add Timer
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded ml-2"
            onTap={navigateToScreenTwo}
          >
            Go to Screen Two
          </button>
        </flexboxLayout>
      </flexboxLayout>

      <gridLayout row={1}>
        <TimerList
          timersByCategory={getTimersByCategory()}
          onStartTimer={handleStartTimer}
          onPauseTimer={handlePauseTimer}
          onResetTimer={handleResetTimer}
          onStartCategory={handleStartCategory}
          onPauseCategory={handlePauseCategory}
          onResetCategory={handleResetCategory}
        />

        {showAddTimer && (
          <absoluteLayout style={styles.modalContainer}>
            <TimerForm
              onSubmit={handleAddTimer}
              onCancel={() => setShowAddTimer(false)}
            />
          </absoluteLayout>
        )}

        {completedTimer && (
          <CompletionModal
            timerName={completedTimer.name}
            onClose={clearCompletedTimer}
          />
        )}
      </gridLayout>
    </gridLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});