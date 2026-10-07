export const categories = Object.freeze([
  { id: 'underweight', label: 'Abaixo do peso', upper: 18.5 },
  { id: 'healthy', label: 'Peso adequado', upper: 25 },
  { id: 'overweight', label: 'Sobrepeso', upper: 30 },
  { id: 'obesity1', label: 'Obesidade grau I', upper: 35 },
  { id: 'obesity2', label: 'Obesidade grau II', upper: 40 },
  { id: 'obesity3', label: 'Obesidade grau III', upper: Infinity },
].map(Object.freeze));

export function parseDecimal(value) {
  const text = String(value).trim();
  if (!/^\d+(?:[.,]\d+)?$/.test(text)) return NaN;
  return Number(text.replace(',', '.'));
}

export function calculateBMI(weightInput, heightInput, unit = 'm') {
  const weight = parseDecimal(weightInput);
  const height = parseDecimal(heightInput);
  const heightMeters = unit === 'cm' ? height / 100 : height;
  const errors = {};
  if (!Number.isFinite(weight) || weight <= 0 || weight > 700) {
    errors.weight = 'Informe um peso maior que zero e de até 700 kg.';
  }
  if (!['m', 'cm'].includes(unit) || !Number.isFinite(heightMeters) || heightMeters < 0.5 || heightMeters > 2.8) {
    errors.height = unit === 'cm'
      ? 'Informe uma altura entre 50 e 280 cm.'
      : 'Informe uma altura entre 0,50 e 2,80 m. Para usar centímetros, altere a unidade.';
  }
  if (Object.keys(errors).length) return { errors };
  const bmi = weight / (heightMeters * heightMeters);
  // Classify the original value, before rounding the displayed result.
  const category = categories.find(({ upper }) => bmi < upper);
  return { bmi, category, weight, heightMeters, errors };
}
