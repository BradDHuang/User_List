
let nextUserId = 0;

export const addUser = (user) => ({
    type: "ADD_USER",
    id: nextUserId++,
    ...user,
});



