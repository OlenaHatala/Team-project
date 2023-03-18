const getListMemberData = (board) => {
    const boardData = {
        _id: board._id,
        label: board.label,
        service_name: board.service_name,
        address: board.address,
    }
    return boardData;
}

const getListOwnerData = (board) => {
    const boardData = {
        _id: board._id,
        label: board.label,
        service_name: board.service_name,
        address: board.address,
    }
    if (board?.requests?.length !== 0) {
        boardData.join_requests = board.requests.length;
    }
    return boardData;
}

module.exports = {
    getListMemberData,
    getListOwnerData
}