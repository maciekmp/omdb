import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
`;
const InputStyled = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  border: solid 1px #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;
const ClearBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  onClear: () => void;
};

const Input = ({ onClear, ...props }: Props) => (
  <Wrapper>
    <InputStyled
      {...props}
    />
    <ClearBtn
      onClick={onClear}
    >
      &times;
    </ClearBtn>
  </Wrapper>
);

export default Input;