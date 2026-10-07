import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBMI, parseDecimal } from '../imc.js';

test('accepts Brazilian decimal input and calculates kilograms / meters squared', () => {
  const result = calculateBMI('70,5', '1,75');
  assert.ok(Math.abs(result.bmi - 23.020408163265305) < 1e-10);
  assert.equal(result.category.id, 'healthy');
  assert.equal(parseDecimal(' 70.5 '), 70.5);
});

test('meters and centimeters give the same result', () => {
  assert.equal(calculateBMI('70', '1.75').bmi, calculateBMI('70', '175', 'cm').bmi);
});

test('classifies all exact boundaries and values just below them without rounding first', () => {
  const boundaries = [[18.5, 'underweight', 'healthy'], [25, 'healthy', 'overweight'], [30, 'overweight', 'obesity1'], [35, 'obesity1', 'obesity2'], [40, 'obesity2', 'obesity3']];
  for (const [bmi, below, at] of boundaries) {
    assert.equal(calculateBMI(String(bmi - .0001), '1').category.id, below);
    assert.equal(calculateBMI(String(bmi), '1').category.id, at);
  }
});

test('rejects missing, zero, negative, non-finite, malformed or implausible values', () => {
  for (const invalid of ['', ' ', '0', '-10', 'NaN', 'Infinity', '1e3', '70kg', '70,5.2', '701']) {
    assert.ok(calculateBMI(invalid, '1.75').errors.weight, invalid);
  }
  for (const invalid of ['', '0', '-1', '175', '0,49', '2,81', 'abc']) {
    assert.ok(calculateBMI('70', invalid).errors.height, invalid);
  }
  assert.ok(calculateBMI('70', '1.75', 'unsupported').errors.height);
  assert.deepEqual(calculateBMI('0', '0').errors, {
    weight: 'Informe um peso maior que zero e de até 700 kg.',
    height: 'Informe uma altura entre 0,50 e 2,80 m. Para usar centímetros, altere a unidade.',
  });
});
