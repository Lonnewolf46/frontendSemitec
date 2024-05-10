import lesson from "@/app/lib/lessons";

const initialState = () => ({
  done: "",
  current: "",
  next: "",
  typed: "",
  mistake: "",
  words: "",
  iterations: 0,
  min_time: 0,
  min_mistakes: 0,
});

export const lessonReducer = (state = initialState(), action = {}) => {
  switch (action.type) {
    case "restart": {
      return {
        ...state,
        done: "",
        current: state.words.charAt(0),
        next:
          state.words.slice(1) +
          (" " + state.words).repeat(state.iterations - 1),
        typed: "",
        mistake: "",
      };
    }
    case "set_data": {
      return {
        done: "",
        current: action.words.charAt(0),
        next:
          action.words.slice(1) +
          (" " + action.words).repeat(action.iterations - 1),
        typed: "",
        mistake: "",
        words: action.words,
        min_time: action.min_time,
        min_time: action.min_mistakes,
      };
    }
    case "update_done": {
      return {
        ...state,
        done: state.done + state.current,
        current: state.next.charAt(0),
        next: state.next.slice(1),
        typed: state.typed + state.current,
        mistake: "",
      };
    }
    case "update_mistake": {
      return { ...state, mistake: action.mistake };
    }
  }
  return state;
};
