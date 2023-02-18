export const addUser = (payload) => {
    console.log("PAYLOAD HERE", payload);
    return {
        type: "ADD_USER",
        payload: payload
    };
};