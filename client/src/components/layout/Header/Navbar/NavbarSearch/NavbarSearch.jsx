import { useState } from "react";

import "./navbarSearch.css";

const NavbarSearch = () => {
  const [searchString, setSearchString] = useState("");

  const handleSearch = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <form>
      <div className="navbar-search">
        <div className="form-group">
          <input
            type="text"
            onChange={() => handleSearch}
            value={searchString}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-secondary">
          Search
        </button>
      </div>
    </form>
  );
};

export default NavbarSearch;
