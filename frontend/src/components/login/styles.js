import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh; /* Magic here */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  background-color: #909090;
`;

export const Form = styled.div`
  display: flex;
  justify-content: row;
  align-items: row;
  flex-direction: column;
  text-align: center;
`;

export const Input = styled.input`
  background-color: #DCDCDC;
  height: 25px;
  width: 200px;
  display: flex;
  text-align: center;
`;

export const Label = styled.label`
  display: flex;
  padding: 5px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

export const Button = styled.button`
  background-color: #DCDCDC;
  height: 25px;
  width: 200px;
  cursor: pointer;
`;
