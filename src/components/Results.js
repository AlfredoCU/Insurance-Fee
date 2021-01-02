import { memo } from "react";
import styled from "styled-components";
import { shape, number, string } from "prop-types";

const Results = ({ data }) => {
  return (
    <ResultsContent>
      {data.quotation === 0 ? (
        <Info>
          <strong>Cargando la data...</strong>
        </Info>
      ) : (
        <>
          <SubTitle>Resultado de Cotización</SubTitle>
          <Info>Marca del auto: {data.brand}</Info>
          <Info>Año del auto: {data.year}</Info>
          <Info>Plan: {data.plan}</Info>
          <Info total>El total es: $ {data.quotation}</Info>
        </>
      )}
    </ResultsContent>
  );
};

const ResultsContent = memo(styled.div`
  padding: 10px;
  color: #ffffff;
  text-align: center;
  border-radius: 3px;
  background-color: #092837;
`);

const SubTitle = memo(styled.h2`
  margin: 0px 0px 20px;
`);

const Info = memo(styled.p`
  margin: 5px;

  ${props =>
    props.total &&
    `
    padding: 10px;
    border: 2px solid #ffffff;
    border-radius: 10px 0px 10px 0px;
  `}
`);

Results.propTypes = {
  data: shape({
    quotation: number.isRequired,
    brand: string.isRequired,
    year: string.isRequired,
    plan: string.isRequired
  }).isRequired
};

const ResultsMemo = memo(Results);
export { ResultsMemo as Results };
