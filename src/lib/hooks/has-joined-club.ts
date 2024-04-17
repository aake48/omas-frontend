"use client";

import { useEffect, useState } from "react";

const useHasJoinedClub = () => {
  const [hasJoinedClub, setHasJoinedClub] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo !== null) {
      const userInfoJSON = JSON.parse(userInfo);
      setHasJoinedClub(userInfoJSON.club !== null);
    }
  }, []);

  return hasJoinedClub;
};

export default useHasJoinedClub;
