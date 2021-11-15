import React, { ReactNode, useState } from "react";
import classes from "./dropdown.module.scss";

type DropdownProps = {
  title: string;
  children: ReactNode;
};

const Dropdown = ({ title, children }: DropdownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className={`${classes.dropdown}`}>
      <div
        className={`${classes.dropdown_header}`}
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <h3>{title}</h3>
      </div>
      <ul
        className={`${
          openDropdown ? classes.dropdown_body_open : classes.dropdown_body
        }`}
      >
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;
