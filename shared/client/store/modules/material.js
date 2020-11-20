export const GET_MATERIAL = 'GET_MATERIAL';

export function getMaterial(id) {
    return {
        type: GET_MATERIAL,
        request: {
            method: 'get',
            url: `/materials/${id}`
        }
    };
}

export const types = {
    GET_MATERIAL
};

export const actions = {
    getMaterial
};

export default function reducer(state = null, action) {
    switch (action.type) {
        case GET_MATERIAL:
            return action.data;

        default:
            return state;
    }
}