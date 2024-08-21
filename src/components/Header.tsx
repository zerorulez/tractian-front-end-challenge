import useFetch from "../hooks/useFetch";
import TractianLogo from "@/assets/tractian.svg";
import useCompanyStore from "../hooks/useCompanyStore";
import Button from "./ui/Button";
import GoldIcon from "./icons/Gold";

function Header() {
  const selectedCompany = useCompanyStore((state) => state.selectedCompany);
  const setSelectedCompany = useCompanyStore(
    (state) => state.setSelectedCompany
  );

  const { data, isLoading, error } = useFetch("/companies");

  return (
    <header>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
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
