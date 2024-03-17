

export default function CompetitionPage(params: any) {

const slug = params.params.slug

  // useEffect(() => {
  //   async function fetchData() {
  //     const competitions = await axios.get(
  //       getCompetitionByNameUrl(competitionId),
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     setCompetitions(competitions.data.content);
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="flex flex-col text-7xl min-h-screen items-center justify-between p-24">
      {slug}
    </div>
  );
}
