import { IMeasurementType } from '../interfaces/IMeasurementType';
import { IIngredientType } from '../interfaces/IIngredient';

export const PAGE_SIZE = 10;

export const API_URL = `https://localhost:7059`;

export const IngredientTypes: IIngredientType[] = [
  { id: 0, name: 'Wybierz typ' },
  { id: 1, name: 'Zbożowe' },
  { id: 2, name: 'Mleczne' },
  { id: 3, name: 'Mięso' },
  { id: 4, name: 'Ryby' },
  { id: 5, name: 'Tłuszcze' },
  { id: 6, name: 'Warzywa' },
  { id: 7, name: 'Owoce' },
  { id: 8, name: 'Słodycze' },
  { id: 9, name: 'Napoje' },
  { id: 11, name: 'Bakalie' },
  { id: 10, name: 'Inne' },
];

export const MeasurementTypes: IMeasurementType[] = [
  { id: 0, name: 'Wybierz typ' },
  { id: 1, name: 'Kilogramy' },
  { id: 2, name: 'Gramy' },
  { id: 3, name: 'Litry' },
  { id: 4, name: 'Mililitry' },
  { id: 5, name: 'Łyżka' },
  { id: 6, name: 'Łyżeczka' },
  { id: 7, name: 'Szklanka' },
  { id: 8, name: 'Sztuki' },
];
