
const users = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER':
            return [
                ...state,
                {
                  id: action.id,
                  first_name: action.first_name,
                  last_name: action.last_name,
                  sex: action.sex,
                  age: action.age,
                  password: action.password,
                //   confirmPW: action.confirmPW,
                },
            ];
            
        case 'EDIT_USER':
            return state.map(user => {
                if (user.id !== action.id) {
                    return user;
                } else {
                    return {
                        ...user,
                        ...action.user
                    };
                }
            });
            
        case 'DELETE_USER':
            return state.filter(user => user.id !== action.id);
            
        default:
            return state;
    }
};

export default users;









