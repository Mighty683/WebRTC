import Styled from '@emotion/styled';

export default Styled.div`
  cursor: pointer;
  border: solid 2px #000;
  position: ${({position}) => position || 'absolute'};
  top: ${({top}) => `${top}px` || '0px'};
  left: ${({left}) => `${left}px` || '0px'};
  padding: 10px;
  text-align: center;
  width: ${({width}) => `${width}px` || '100%'};
  height: ${({height}) => `${height}px` || '100%'};
  border-radius: 50%;
  background-color: ${({color}) => color || '#fff'}
`;