export interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  category: string;
  status: 'idle' | 'running' | 'paused' | 'completed';
}

export interface TimersByCategory {
  [category: string]: Timer[];
}

export interface TimerFormData {
  name: string;
  duration: number;
  category: string;
}

export interface TimerHistory {
  id: string;
  name: string;
  category: string;
  completedAt: Date;
}