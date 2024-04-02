import React from "react";
import * as LuIcons from "react-icons/lu";
import styled from "styled-components";

const AddIcon= styled.div`
width: 100px;
`;
const Budgets = () => {
  return (
    <>
      <AddIcon>
        <FaIcons.FaCirclePlus />
      </AddIcon>
    </>
  );
};

export default Budgets;
