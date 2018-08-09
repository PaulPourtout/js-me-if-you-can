import * as React from "react";
import styled from "styled-components";

interface IDescription {
  description: { title: string; content: string };
}

export const KataDescription = ({ description }: IDescription) => (
  <Container>
    <Title>{description.title}</Title>
    <Content>{description.content}</Content>
  </Container>
);

const Container = styled.article`
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Content = styled.p`
  text-align: left;
`;
