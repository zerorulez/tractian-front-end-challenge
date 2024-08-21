import useFetch from "../hooks/useFetch";
import TractianLogo from "@/assets/tractian.svg";
import GoldIcon from "@/assets/icons/gold.svg";
import { useState } from "react";
import { clsx } from "clsx";
import useCompanyStore from "../hooks/useCompanyStore";
import Button from "./ui/Button";

function Header() {
  const selectedCompany = useCompanyStore((state) => state.selectedCompany);
  const updateSelectedCompany = useCompanyStore(
    (state) => state.updateSelectedCompany
  );

  const { data, isLoading, error } = useFetch(
    `${import.meta.env.VITE_API_URL}/companies`
  );

  return (
    <header>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className="flex justify-between py-3 px-4 bg-dark-blue text-[#fff]">
        <img src={TractianLogo} alt="Tractian Logo" />
        <nav className="flex gap-2">
          {data &&
            data
              .slice(0)
              .reverse()
              .map((company: { id: string; name: string }) => (
                <Button
                  label={`${company.name} Unit`}
                  icon={GoldIcon}
                  handleClick={() => {
                    updateSelectedCompany(company);
                  }}
                  key={company.id}
                  selected={selectedCompany.id === company.id}
                />
              ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
