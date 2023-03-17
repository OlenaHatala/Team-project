export const fromServerToStore = (userFromServer) => {
    return {
        userId: userFromServer._id,
        email: userFromServer.email,
        mobileNum: userFromServer.mobile_number,
        name: userFromServer.name,
        surname: userFromServer.surname 
    }
}

export const fromStoreToServer = (userFromStore) => {
    return {
        user_id: userFromStore.userId,
        email: userFromStore.email,
        mobile_number: userFromStore.mobileNum,
        name: userFromStore.name,
        surname: userFromStore.surname 
    }
}