import { contact } from './contact';

export interface saveVehicle {
  id: number;
  makeId: number;
  modelId: number;
  isRegistered: boolean;
  features: number[];
  contact: contact;
}
