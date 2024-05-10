const initialState = () => ({
  time_taken: 0,
  mistakes: 0,
  accuracy_rate: 100,
  pulsation_per_minute: 0,
  valid_keystrokes: 0,
  is_complete: 0,
});

export const metricsReducer = (state = initialState(), action = {}) => {
  switch (action.type) {
    case "update_time_taken": {
      return { ...state, time_taken: state.time_taken + 1 };
    }
    case "update_mistakes": {
      return { ...state, mistakes: state.mistakes + 1 };
    }
    case "set_completed": {
      return { ...state, is_complete: 1 };
    }
    case "update_valid_keystrokes": {
      return { ...state, valid_keystrokes: state.valid_keystrokes + 1 };
    }
    case "update_accuracy_rate": {
      return {
        ...state,
        accuracy_rate: (
          (state.valid_keystrokes * 100) /
          (state.mistakes + state.valid_keystrokes)
        ).toFixed(),
      };
    }
    case "update_ppm": {
      return {
        ...state,
        pulsation_per_minute: (
          state.valid_keystrokes /
          (state.time_taken / 60)
        ).toFixed(),
      };
    }
  }
  return state;
};
