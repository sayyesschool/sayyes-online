export default function settingsReducer(state, action) {
    return {
        ...state,
        [action.name]: action.value === 'default' ? undefined : action.value
    };
}