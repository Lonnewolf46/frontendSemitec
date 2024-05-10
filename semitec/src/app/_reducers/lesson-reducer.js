import lesson from "@/app/lib/lessons";

const initialState = () => ({
    done: "",
    current: "",
    next: "",
    typed: "",
    mistake: "",
});

export const lessonReducer = (state = initialState(), action = {}) => {
    switch (action.type) {
        case 'set_data' : {
            return {
                done: "",
                current: action.words.charAt(0),
                next: action.words.slice(1) + (" " + action.words).repeat(action.iterations),
                typed: "",
                mistake: "",
            }
        }
        case 'update_done': {
            return { ...state,
                done: state.done + state.current,
                current: state.next.charAt(0),
                next: state.next.slice(1),
                typed: state.typed + state.current,
                mistake: ""
            }
        }
        case 'update_mistake': {
            return { ...state, mistake: action.mistake}
        }
    }
    return state;
}