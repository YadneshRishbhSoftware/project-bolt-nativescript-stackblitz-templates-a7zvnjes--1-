import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-nativescript';
import { TimerFormData } from '../types/Timer';

interface TimerFormProps {
  onSubmit: (data: TimerFormData) => void;
  onCancel: () => void;
}

export function TimerForm({ onSubmit, onCancel }: TimerFormProps) {
  const [formData, setFormData] = useState<TimerFormData>({
    name: '',
    duration: 60,
    category: ''
  });

  const handleSubmit = () => {
    if (formData.name && formData.duration > 0 && formData.category) {
      onSubmit(formData);
    }
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-xl font-bold mb-4">Add New Timer</label>
      
      <label className="text-sm mb-1">Timer Name</label>
      <textField
        className="mb-4 p-2 border rounded"
        text={formData.name}
        onTextChange={(args) => setFormData(prev => ({ ...prev, name: args.value }))}
      />

      <label className="text-sm mb-1">Duration (seconds)</label>
      <textField
        className="mb-4 p-2 border rounded"
        keyboardType="number"
        text={formData.duration.toString()}
        onTextChange={(args) => setFormData(prev => ({ ...prev, duration: parseInt(args.value) || 0 }))}
      />

      <label className="text-sm mb-1">Category</label>
      <textField
        className="mb-4 p-2 border rounded"
        text={formData.category}
        onTextChange={(args) => setFormData(prev => ({ ...prev, category: args.value }))}
      />

      <flexboxLayout style={styles.buttonContainer}>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onTap={handleSubmit}
        >
          Add Timer
        </button>
        <button
          className="bg-gray-500 text-white p-2 rounded ml-2"
          onTap={onCancel}
        >
          Cancel
        </button>
      </flexboxLayout>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '80%',
    flexDirection: 'column'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16
  }
});