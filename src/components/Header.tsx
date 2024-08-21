import useFetch from "../hooks/useFetch";
import TractianLogo from "@/assets/tractian.svg";
import GoldIcon from "@/assets/icons/gold.svg";
import { useState } from "react";
import { clsx } from "clsx";

function Header() {
  const [selectedCompany, setSelectedCompany] = useState({});

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
                <button
                  className={clsx(
                    selectedCompany.id === company.id
                      ? "bg-primary"
                      : "bg-secondary",
                    "py-1 px-2 rounded-sm flex items-center gap-2 font-semibold text-xs hover:bg-primary"
                  )}
                  key={company.id}
                  onClick={() => setSelectedCompany(company)}
                >
                  <img src={GoldIcon} alt="Gold Icon" />
                  {`${company.name} Unit`}
                </button>
              ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
