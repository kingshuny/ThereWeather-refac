// action types
export const CHANGE_USER_INFO = "CHANGE_USER_INFO"
export const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE"
export const UPDATE_START_END_PAGE = "UPDATE_START_END_PAGE"

// actions creator functions

export const changeUser = (userinfo) => {
    return {
        type: CHANGE_USER_INFO,
        payload: {
            ...userinfo,
        },
    }
}
export const updateCurrentPage = (current) => {
    return {
        type: UPDATE_CURRENT_PAGE,
        payload: {
            current
        }
    }
}
export const updateStartEndPage = (start, end) => {
    return {
        type: UPDATE_START_END_PAGE,
        payload: {
            start, 
            end
        }
    }
}
