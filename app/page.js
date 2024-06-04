"use client";

import styled from 'styled-components';

const NavigateButton = styled.button`
display: flex;
justify-content: center;
  background-color: #0070f3;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #005bb5;
  }
`;
const Title = styled.div`
font-size: 40px;
font-weight: 600;
display: flex;
justify-content: center;
`
const ButtonWarpper = styled.div`
width: 100%;
display: flex;
  justify-content: center;
`
const WelcomeWrapper = styled.div`
`

const Welcome = () => {

  const handleNavigation = () => {
    window.location.href = '/home';
  };

  return( 
    <WelcomeWrapper>
    <Title>Hi Guest</Title>
  <ButtonWarpper><NavigateButton onClick={handleNavigation}>Go to Home</NavigateButton></ButtonWarpper>
  </WelcomeWrapper>
  )
};

export default Welcome;
