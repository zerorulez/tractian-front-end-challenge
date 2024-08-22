import Button from "./ui/Button";
import CriticalIcon from "./icons/Critical";
import ThunderIcon from "./icons/Thunder";

function FilterButtons({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (value: string) => void;
}) {
  return (
    <div className="flex gap-2">
      <Button
        label="Sensor de Energia"
        Icon={ThunderIcon}
        variant="outline"
        handleClick={() => setFilter("energy")}
        selected={filter === "energy"}
      />
      <Button
        label="Crítico"
        Icon={CriticalIcon}
        variant="outline"
        handleClick={() => setFilter("alert")}
        selected={filter === "alert"}
      />
    </div>
  );
}

export default FilterButtons;
