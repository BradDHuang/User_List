
// let nextUserId = 0;

export const addUser = (user) => ({
    type: "ADD_USER",
    id: user._id,
    ...user,
});

export const editUser = (id, user) => ({
    type: "EDIT_USER",
    id,
    user,
});



