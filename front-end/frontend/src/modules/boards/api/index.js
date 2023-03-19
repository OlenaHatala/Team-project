import { apiSlice } from "../../../app/api/apiSlice";

export const boardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
        query: () => "/board/boardlist",
        keepUnusedDataFor: 5,
        transformResponse: responseData => {
            const memberedBoards = responseData.membered_boards_arr.map(boardData => {
                let board = {
                    userStatus: "member",
                    id: boardData._id,
                    label: boardData.label,
                    servname: boardData.service_name,
                    address: boardData.address,
                    counters: {}
                }
                return board;
            });
            const createdBoards = responseData.created_boards_arr.map(boardData => {
                let board = {
                    userStatus: "owner",
                    id: boardData._id,
                    label: boardData.label,
                    servname: boardData.service_name,
                    address: boardData.address,
                    counters: {}
                }
                if (boardData.join_requests_num !== 0) {
                    board.counters.requests = boardData.join_requests_num
                }
                return board;
            });
            return memberedBoards.concat(createdBoards);
        },
      }),
  }),
});

export const {
    useGetBoardsQuery,
} = boardsApiSlice 