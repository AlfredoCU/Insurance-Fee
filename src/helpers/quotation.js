//* Function diff years.
export const diffYears = year => new Date().getFullYear() - year; // 3%

//* Function calc brands.
export const calcBrands = marca => {
  let incremento = 0;

  switch (marca) {
    case "Europeo":
      incremento = 1.3; // 30%
      break;
    case "Americano":
      incremento = 1.15; // 15%
      break;
    case "Asiatico":
      incremento = 1.05; // 5%
      break;
    default:
      break;
  }

  return incremento;
};

//* Function calc plan.
export const calcPlans = plan => (plan === "Básico" ? 1.2 : 1.5); // 20% o 50%
