import { useSearchParams } from "react-router-dom";

import PageContent from '../modules/common/UI/PageContent';

function SuccessPage() {
  const [searchParams] = useSearchParams();
  let message = searchParams.get("message");

  message = message.replace(/-/g, " ");

  return (
    <>
      <PageContent title="Success!">
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default SuccessPage;
