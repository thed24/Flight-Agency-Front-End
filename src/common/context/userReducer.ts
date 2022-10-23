import { User } from 'common/types';

export type UserState = {
    user: User | null;
};

export function userReducer(state: UserState, action: Actions): UserState {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload,
            };
        case 'logout':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}

export type ActionsMap = {
    login: User;
    logout: null;
};

export type Actions = {
    [Key in keyof ActionsMap]: {
        type: Key;
        payload: ActionsMap[Key];
    };
}[keyof ActionsMap];
