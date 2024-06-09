import styled from '@emotion/styled';

const Button = styled.button`
  //font-family: HSSanTokki20-Regular, serif;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid #dfdfdf;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  background: white;
  display: flex;
  align-items: center;
  text-decoration: none;
`.withComponent('a');

export default Button;
