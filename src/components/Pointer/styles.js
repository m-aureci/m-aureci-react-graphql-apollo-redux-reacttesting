import styled from 'styled-components';

export const PointerContainer = styled.div`
color: #000;
background-color: #fff;
border: 2px solid #fff;

position: absolute;
width: 50px;
height: 50px;
top: 50%;
left: 50%;  
  
border-radius: 100%;
user-select: none;
transform: translate(-50%, -50%);
cursor: pointer;
font-weight: bold;
display: flex;
justify-content: center;
align-items: center;

&:hover {

  z-index: 1;    

}
`;