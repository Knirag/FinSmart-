import react,{useState} from 'react';
import "../../App.css"
import styled from "styled-components";

export const Content = styled.div`
max-width: 40 rem;
margin: 4rem auto;
`;

const AccountManagement = () => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div>
      <Content>
        <h5>What is an Account</h5>
        <p>
          An Account is a record used to classify & store Information about
          Individual transactions
        </p>
      </Content>
      <Content>
<h5>How to Create An Account in Finsmart</h5>
      </Content>
      <Content>
        <h5>Types of Accounts</h5>
      </Content>
      <Content>
        <h5> Managing Subscriptions & Bills</h5>
      </Content>

    </div>
  );
}

export default AccountManagement