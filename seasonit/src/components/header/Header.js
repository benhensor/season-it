import React from 'react'
import styled from 'styled-components'
import Logo from '../../assets/logo.png'

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  background-color: #eeeeee;
  padding: 0.5rem;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`

const LogoImg = styled.img`
  width: 7rem;
  height: 7rem;
  object-fit: cover;
`

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 1rem;
`

const Title = styled.h1`
  font-size: 2rem;
  
`

const Tagline = styled.h2`
  font-size: 1.4rem;
`

export default function Header() {
  return (
    <StyledHeader>
      <Container>
          <LogoImg src={Logo} alt="logo" />
          <Titles>
          <Title>SeasonIt!</Title>
          <Tagline>Eat more seasonal produce</Tagline>
          </Titles>
      </Container>
    </StyledHeader>
  )
}