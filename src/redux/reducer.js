export const initialState = {
    userList: [],
    currentUser: {}
};
export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            let temp = state.userList;
            temp.push(action.payload);
            return {
                ...state,
                userList: temp
            };
    }
};