import { MeasurementTypes } from './constants';

export function formatIngredients(items: string[], slice: number): string {
  if (items.length === 0) return '';
  if (items.length <= slice) return items.join(', ');

  const firstThreeIngredients = items.slice(0, slice).join(', ');
  const remainingIngredientsCount = items.length - slice;
  return `${firstThreeIngredients} + ${remainingIngredientsCount} inne`;
}

export function formatMeasurement(amount: number, name: string): string {
  const measurementFormats: Record<string, [string, string, string]> = {
    Łyżka: ['Łyżka', 'Łyżki', 'Łyżek'],
    Łyżeczka: ['Łyżeczka', 'Łyżeczki', 'Łyżeczek'],
    Sztuk: ['Sztuka', 'Sztuki', 'Sztuk'],
    Szklanka: ['Szklanka', 'Szklanki', 'Szklanek'],
    Kilogram: ['Kilogram', 'Kilogramy', 'Kilogramów'],
    Gram: ['Gram', 'Gramy', 'Gramów'],
    Litr: ['Litr', 'Litry', 'Litrów'],
    Mililitr: ['Mililitr', 'Mililitry', 'Mililitrów'],
  };

  if (name === 'Sztuk') return formatPieces(amount, name);

  const [singular, plural2to4, plural5Plus] = measurementFormats[name] || [
    name,
    name,
    name,
  ];

  return formatNoun(amount, singular, plural2to4, plural5Plus);
}

function formatPieces(amount: number, name: string): string {
  if (amount === 1) {
    return `${name}a`;
  }

  if (
    amount % 10 >= 2 &&
    amount % 10 <= 4 &&
    (amount % 100 < 10 || amount % 100 >= 20)
  ) {
    return `${name}i`;
  }

  return `${name}`;
}

function formatNoun(
  amount: number,
  singular: string,
  plural2to4: string,
  plural5Plus: string
): string {
  if (amount === 1) {
    return singular;
  }

  if (
    (amount % 10 >= 2 &&
      amount % 10 <= 4 &&
      (amount % 100 < 10 || amount % 100 >= 20)) ||
    (amount % 10 >= 5 && amount % 10 <= 9)
  ) {
    return plural2to4;
  }

  return plural5Plus;
}

export const mapMeasurementToId = (measurementName: string): number => {
  const measurementType = MeasurementTypes.find((type) =>
    type.name.includes(measurementName)
  );

  return measurementType ? measurementType.id : 0;
};
