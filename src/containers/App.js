import { useCallback, useState, memo } from "react";
import styled from "styled-components";
import { Form, Results } from "../components/index";

const App = () => {
  const [data, setData] = useState({
    quotation: 0,
    brand: "",
    year: "",
    plan: ""
  });

  const createQuotation = useCallback(
    newData => {
      setData(newData);
    },
    [setData]
  );

  return (
    <Container>
      <Title>Cotizador de Seguros</Title>
      <Content>
        <Form createQuotation={createQuotation} />
        <Results data={data} />
      </Content>
    </Container>
  );
};

const Container = memo(styled.div`
  width: 297px;
  position: relative;
  border-radius: 3px;
  background-color: #ffffff;

  @media screen and (min-width: 375px) {
    width: 350px;
  }

  @media screen and (min-width: 600px) {
    width: 500px;
  }
`);

const Content = memo(styled.div`
  padding: 20px;
`);

const Title = memo(styled.h1`
  left: 0;
  top: -21px;
  width: 100%;
  position: relative;

  margin: 0;
  color: #ffffff;
  padding: 10px 0;
  text-align: center;
  background-color: #50c2f9;
  border-radius: 3px 3px 0px 0px;
`);

export { App };
