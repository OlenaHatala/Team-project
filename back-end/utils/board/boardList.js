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
        join_requests_num: board.requests.length,
        ticket_requests_num: board.unconfirmed_tickets.length
    }
    return boardData;
}

module.exports = {
    getListMemberData,
    getListOwnerData
}