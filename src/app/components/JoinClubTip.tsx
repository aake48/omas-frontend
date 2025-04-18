"use client";

interface JoinClubTipProps {
  joinedClub: string | null;
}

export default function JoinClubTip({ joinedClub }: Readonly<JoinClubTipProps>) {
  return (
    <div className="w-full rounded-md shadow-md border mb-8 py-6 flex flex-col items-center text-center min-h-[130px]">
      {joinedClub ? (
        <>
          <h2 className="mt-2 text-md max-w-md">Seurasi on </h2>
          <p className="mt-1 text-xl font-semibold min-h-[32px]">{joinedClub}</p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold">Et ole liittynyt mihinkään seuraan!</h2>
          <p className="mt-2 text-md max-w-md">
            Hae oma seurasi hakupalkista tai etsi se listauksesta.
          </p>
        </>
      )}
    </div>
  );
}