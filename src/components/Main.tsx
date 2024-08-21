import useFetch from "../hooks/useFetch";

function Main() {
  // const { data, isLoading, error } = useFetch(
  //   `${import.meta.env.VITE_API_URL}/companies`
  // );

  return (
    <main className="bg-light-gray h-[calc(100vh-48px)] p-2">
      {/* {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data &&
        data.map((company: { id: string; name: string }) => (
          <h1 className="text-3xl font-bold underline" key={company.id}>
            {company.name}
          </h1>
        ))} */}
      <div className="flex bg-[#ffffff] rounded-[4px] px-4 py-[18px] border border-[#D8DFE6]">
        Ativos
      </div>
    </main>
  );
}

export default Main;
