import useFetch from "../hooks/useFetch";
import TractianLogo from "@/assets/tractian.svg";
import useStore from "../hooks/useStore";
import Button from "./ui/Button";
import GoldIcon from "./icons/Gold";

function Header() {
  const selectedCompany = useStore((state) => state.selectedCompany);
  const setSelectedCompany = useStore((state) => state.setSelectedCompany);

  const { data } = useFetch("/companies");

  return (
    <header>
      <div className="flex justify-between py-3 px-4 bg-dark-blue text-[#fff]">
        <img src={TractianLogo} alt="Tractian Logo" />
        <nav className="flex gap-2">
          {data &&
            data.map((company: { id: string; name: string }) => (
              <Button
                label={`${company.name} Unit`}
                handleClick={() => {
                  setSelectedCompany(company);
                }}
                key={company.id}
                selected={selectedCompany.id === company.id}
                variant="nav"
                Icon={GoldIcon}
              />
            ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
