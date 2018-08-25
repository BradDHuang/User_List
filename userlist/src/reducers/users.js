
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
                  confirmPW: action.confirmPW,
                },
            ];
        default:
            return state;
    }
};

export default users;









