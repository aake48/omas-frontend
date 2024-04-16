"use client";

import useHasJoinedClub from "@/lib/hooks/has-joined-club";
import useIsLoggedIn from "@/lib/hooks/is-logged-in";

export default function JoinClubTip() {
  const isLoggedIn = useIsLoggedIn();
  const hasJoinedClub = useHasJoinedClub();

  return (
    isLoggedIn &&
    !hasJoinedClub && (
      <div className="w-full rounded-md shadow-md border mb-8 py-2">
        <div className="flex items-baseline p-4 mx-4">
          <h2 className="text-2xl">Et kuulu vielä mihinkään seuraan!</h2>
        </div>
        <div className="mx-4 border-b-2 last:border-b-0 cursor-pointer hover:bg-slate-100">
          <p className="p-2">
            Liittymällä seuraan voit osallistua joukkueisiin ja ilmoittaa
            tuloksiasi järjestelmään. Liittyä voit yläpalkin
            Seurat-välilehdeltä.
          </p>
        </div>
      </div>
    )
  );
}
