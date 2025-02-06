import * as React from 'react';
import { StyleSheet } from 'react-nativescript';

interface CompletionModalProps {
  timerName: string;
  onClose: () => void;
}

export function CompletionModal({ timerName, onClose }: CompletionModalProps) {
  return (
    <flexboxLayout style={styles.container}>
      <stackLayout style={styles.modal}>
        <label style={styles.textTitle}>🎉 Timer Complete!</label>
        <label style={styles.textBody}>{timerName} has finished</label>
        <button
          style={styles.button}
          onTap={onClose}
        >
          Close
        </button>
      </stackLayout>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    alignItems: 'center'
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  textBody: {
    fontSize: 18,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#3B82F6', // Tailwind 'blue-500'
    color: 'white',
    padding: 10,
    borderRadius: 5
  }
});
