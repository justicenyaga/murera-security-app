import { useState } from "react";

import casesApi from "../api/cases";

export default function () {
  const [cases, setCases] = useState({
    all: [],
    ongoing: [],
    closed: [],
  });

  const getCases = async () => {
    const { data, ok } = await casesApi.getCases();
    if (ok) {
      setCases({
        all: data,
        ongoing: data.filter((c) => c.status !== "Closed"),
        closed: data.filter((c) => c.status === "Closed"),
      });
    }
  };

  return { cases, getCases };
}
