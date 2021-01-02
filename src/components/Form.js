import { useState, memo } from "react";
import { func } from "prop-types";
import styled from "styled-components";
import { useForm } from "../hooks/useForm";
import { diffYears, calcBrands, calcPlans } from "../helpers/quotation";

export const Form = ({ createQuotation }) => {
  const [inputs, handleInputChange, reset] = useForm({
    brand: "",
    year: "",
    plan: ""
  });

  const [error, setError] = useState(false);

  const { brand, year, plan } = inputs;

  const submit = ev => {
    ev.preventDefault();

    if (brand.trim() === "" || year === "" || plan === "") {
      setError(true);
      return;
    }

    // Una base de 2000 para iniciar.
    let price = 2000;

    // Diferencia de años del actual y el año seleccionado.
    const calcDiffYear = diffYears(year);

    // Porcentaje de valor de la marca.
    const calcBrand = calcBrands(brand);

    // Porcentaje de valor del plan.
    const calcPlan = calcPlans(plan);

    // Por cada año hay que restar el 3%
    price -= (calcDiffYear * 3 * price) / 100;

    // Multiplicar la marca por el precio.
    price *= calcBrand;

    // Multiplicar el plan por el precio.
    price *= calcPlan;

    // Se agrega dos decimales al precio y se asegura que se mantenga un número.
    // Ya que toFixed retorna un string y con parseFloat se convierte a un número.
    price = parseFloat(price.toFixed(2));

    // Data completa para enviar.
    const data = {
      quotation: price,
      ...inputs
    };

    createQuotation(data);
    setError(false);
    reset();
  };

  return (
    <>
      <FormQuotation onSubmit={submit}>
        <Label htmlFor="brand" id="label-brand">
          Marca:
        </Label>
        <Select
          id="brand"
          name="brand"
          value={brand}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Seleccione marca
          </option>
          <option value="Americano">Americano</option>
          <option value="Europeo">Europeo</option>
          <option value="Asiatico">Asiatico</option>
        </Select>

        <Label htmlFor="year" id="label-year">
          Año:
        </Label>
        <Select id="year" name="year" value={year} onChange={handleInputChange}>
          <option value="" disabled>
            Seleccione año
          </option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>

        <GroupRadio>
          <strong>Plan: </strong>
          <Radio
            id="basic"
            name="plan"
            type="radio"
            value="Básico"
            checked={plan === "Básico"}
            onChange={handleInputChange}
          />
          <Label htmlFor="basic" id="label-basic">
            Básico
          </Label>

          <Radio
            id="pro"
            name="plan"
            value="Pro"
            type="radio"
            checked={plan === "Pro"} // name: value | plan: pro -> pro === pro -> true
            onChange={handleInputChange}
          />
          <Label htmlFor="pro" id="label-pro">
            Pro
          </Label>
        </GroupRadio>

        <Button type="submit">Cotizar</Button>
      </FormQuotation>

      {error && (
        <Error>Los campos están vacíos, es necesario seleccionarlos</Error>
      )}
    </>
  );
};

const FormQuotation = memo(styled.form`
  display: flex;
  flex-direction: column;
`);

const Label = memo(styled.label`
  font-weight: bold;
  margin-right: 10px;
`);

const Select = memo(styled.select`
  width: 100%;
  padding: 10px;
  margin: 15px 0;
`);

const GroupRadio = memo(styled.div`
  padding: 5px 0 15px;
  border-bottom: 1px solid #50c2f9;
`);

const Radio = memo(styled.input.attrs(() => ({ type: "radio" }))`
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin: 0px 10px 5px 10px;
`);

const Button = memo(styled.button`
  border: none;
  padding: 10px;
  margin: 10px 0;
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  border-radius: 3px;
  background-color: #50c2f9;

  &:hover {
    background-color: #81e0ef;
    transition: background-color 0.5s ease-in-out;
  }
`);

const Error = memo(styled.p`
  padding: 10px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  border-radius: 3px;
  background-color: #f95050;
`);

Form.propTypes = {
  createQuotation: func.isRequired
};
