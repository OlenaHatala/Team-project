import { Link } from "react-router-dom";

import { default as PageContent } from "../../../common/UI/PageContent/index";
import { useSelectUser } from "../../../auth";

export function HomeIndexPage() {
  const user = useSelectUser();
  const welcome = user ? `Welcome ${user.email}!` : "";
  return (
    <PageContent>
      <h1>{welcome}</h1>
      {!user ? (
        <>
          <Link to={"/login"}>
            <button>log in</button>
          </Link>
          <div>
            {<p>Don't have an account? Create one</p>}
            <Link to={"/register"} state={{ from: "/" }}>
              here
            </Link>
          </div>
        </>
      ) : null}
    </PageContent>
  );
}
