import { useEffect } from "react";
import useRequest from "../../hooks/request";
import Router from 'next/router'

export default () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest()
  }, []) // Run this one time
  return <div> Signing you out </div>;
};

