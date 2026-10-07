import { calculateBMI, parseDecimal } from './imc.js';

const form = document.querySelector('#calculator-form');
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const unit = document.querySelector('#height-unit');
const emptyState = document.querySelector('#empty-state');
const calculatedState = document.querySelector('#calculated-state');
const decimal = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });
const bmiFormat = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
let previousUnit = unit.value;

function clearResult() {
  emptyState.hidden = false;
  calculatedState.hidden = true;
  document.querySelectorAll('[data-category]').forEach(row => row.classList.remove('active'));
}

function clearErrors() {
  for (const field of [weight, height]) {
    field.removeAttribute('aria-invalid');
    const error = document.querySelector(`#${field.id}-error`);
    error.hidden = true;
    error.textContent = '';
  }
}

function updateUnit() {
  const centimeters = unit.value === 'cm';
  document.querySelector('#height-unit-label').textContent = unit.value;
  height.placeholder = centimeters ? 'Ex.: 175' : 'Ex.: 1,75';
  document.querySelector('#height-hint').textContent = centimeters
    ? 'Exemplo: 175 para cento e setenta e cinco centímetros.'
    : 'Exemplo: 1,75 para um metro e setenta e cinco.';
}

form.addEventListener('submit', event => {
  event.preventDefault();
  clearErrors();
  const result = calculateBMI(weight.value, height.value, unit.value);
  if (Object.keys(result.errors).length) {
    clearResult();
    for (const [field, message] of Object.entries(result.errors)) {
      const input = document.querySelector(`#${field}`);
      const error = document.querySelector(`#${field}-error`);
      input.setAttribute('aria-invalid', 'true');
      error.textContent = message;
      error.hidden = false;
    }
    document.querySelector('[aria-invalid="true"]').focus();
    return;
  }
  document.querySelector('#bmi-value').textContent = bmiFormat.format(result.bmi);
  document.querySelector('#bmi-category').textContent = result.category.label;
  document.querySelector('#result-measurements').textContent = `${decimal.format(result.weight)} kg · ${decimal.format(result.heightMeters)} m`;
  emptyState.hidden = true;
  calculatedState.hidden = false;
  document.querySelectorAll('[data-category]').forEach(row => {
    row.classList.toggle('active', row.dataset.category === result.category.id);
  });
});

for (const field of [weight, height]) {
  field.addEventListener('input', () => { clearErrors(); clearResult(); });
}

unit.addEventListener('change', () => {
  const value = parseDecimal(height.value);
  if (Number.isFinite(value) && value > 0) {
    const converted = previousUnit === 'm' ? value * 100 : value / 100;
    height.value = String(Number(converted.toFixed(6))).replace('.', ',');
  }
  previousUnit = unit.value;
  updateUnit();
  clearErrors();
  clearResult();
});

form.addEventListener('reset', () => {
  clearErrors();
  clearResult();
  // Native form reset restores field values after the reset event.
  queueMicrotask(() => { previousUnit = unit.value; updateUnit(); weight.focus(); });
});
