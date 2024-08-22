import { useState, useEffect } from "react";
import TractianLogo from "../assets/tractian.svg";
import useStore from "../hooks/useStore";
import Button from "./ui/Button";
import GoldIcon from "./icons/Gold";
import { Company } from "../types";

function Header() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const selectedCompany = useStore((state) => state.selectedCompany);
  const setSelectedCompany = useStore((state) => state.setSelectedCompany);

  // Fetch companies data on component mount
  useEffect(() => {
    const loadData = async () => {
      const response = await fetchCompanies();
      if (response) {
        // Reverse the array and update state
        setCompanies(response.slice(0).reverse());
      }
    };

    loadData();
  }, []);

  // Fetch companies from API
  const fetchCompanies = async (): Promise<Company[] | undefined> => {
    try {
      const response = await fetch("https://fake-api.tractian.com/companies");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Company[] = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <header>
      <div className="flex justify-between py-3 px-4 bg-dark-blue text-[#fff]">
        <img src={TractianLogo} alt="Tractian Logo" />
        <nav className="flex gap-2">
          {companies.map((company) => (
            <Button
              label={`${company.name} Unit`}
              handleClick={() => setSelectedCompany(company)}
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
