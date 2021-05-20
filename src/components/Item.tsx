import styled from "styled-components";

const Item = styled.div`
  padding: 10px;
  border-bottom: solid 1px #ccc;
  ul &:last-of-type {
    border-bottom: none;
  }
  a {
    color: #53b1ce;
  }
`;

export default Item;
