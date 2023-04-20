import { useEffect, useState } from "react";
import { useGetBoardsQuery } from "../../api";
import classes from "./BoardList.module.css";
import MemberTable from "../member_table/MemberTable";
import TableInfo from "../table_info/TableInfo";
import AddTable from "../add_table/AddTable";

export const BoardList = () => {
  const [showBoardType, setShowBoardType] = useState("owner");
  const {
    data: allBoards,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBoardsQuery();

  let boards = [];
  let content;
  const noBoardsParagraph =
    showBoardType === "member" ? (
      <p className={classes["noboards-p"]}>
        You haven't joined any board yet. You can join board with the link given
        by the board owner.
      </p>
    ) : (
      <p className={classes["noboards-p"]}>
        You haven't created any board yet.
      </p>
    );

  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    boards = allBoards.filter((board) => {
      return board.userStatus === showBoardType;
    });

    boards.sort((a, b) => {
      return Object.keys(b.counters).length - Object.keys(a.counters).length;
    });

    content = (
      <div className={classes.inner} >
        <nav className={classes.listnav}>
          <button
            className={
              showBoardType === "member"
                ? `${classes["noactive-button"]} ${classes.button}`
                : classes.button
            }
            onClick={() => {
              setShowBoardType("owner");
            }}
            disabled={showBoardType === "owner"}
          >
            My boards
          </button>
          <button
            className={
              showBoardType === "owner"
                ? `${classes["noactive-button"]} ${classes.button}`
                : classes.button
            }
            onClick={() => {
              setShowBoardType("member");
            }}
            disabled={showBoardType === "member"}
          >
            Joined boards
          </button>
        </nav>
        <ul>
          {showBoardType === "owner" &&
            boards.map((board) => {
              return (
                <div key={board.id} className={classes["table-list-item"]}>
                  <TableInfo
                    boardName={board.label}
                    servName={board.servname}
                    address={board.address}
                    counters={board.counters}
                  />
                </div>
              );
            })}

          {showBoardType === "member" &&
            boards.map((board) => {
              return (
                <div key={board.id} className={classes["table-list-item"]}>
                  <MemberTable boardName={board.label} />
                </div>
              );
            })}
        </ul>
        {boards?.length === 0 ? noBoardsParagraph : null}
        {showBoardType === "owner" && <AddTable />}
      </div>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};
