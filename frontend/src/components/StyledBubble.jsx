import Styled from '@emotion/styled';

export default Styled.div`
  cursor: pointer;
  border: solid 2px #000;
  padding: 10px;
  text-align: center;
  width: ${({width}) => `${width}` || '100%'};
  height: ${({height}) => `${height}` || '100%'};
  border-radius: 50%;
  background-color: ${({color}) => color || '#fff'}
`;