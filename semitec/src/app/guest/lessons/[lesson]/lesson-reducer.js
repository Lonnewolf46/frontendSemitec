import lesson from "@/app/lib/lessons";
const initialState = () => ({
    done: "",
    current: lesson.words.charAt(0),
    next: lesson.words.slice(1) + (" " + lesson.words).repeat(2),
    typed: "",
    mistake: "",
});

export const lessonReducer = (state = initialState(), action = {}) => {
    switch (action.type) {
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