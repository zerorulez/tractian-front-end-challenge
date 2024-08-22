import SearchIcon from "../icons/Search";

function Main({
  textFilter,
  setTextFilter,
}: {
  textFilter: string;
  setTextFilter: (value: string) => void;
}) {
  return (
    <div className="flex border-b border-gray-200">
      <input
        type="text"
        name="filter"
        id="filter"
        placeholder="Buscar Ativo ou Local"
        className="h-[45px] w-full p-3"
        value={textFilter}
        onChange={(e) => setTextFilter(e.target.value)}
      />
      <div className="flex justify-center items-center min-w-[44px] h-[44px]">
        <SearchIcon />
      </div>
    </div>
  );
}

export default Main;
