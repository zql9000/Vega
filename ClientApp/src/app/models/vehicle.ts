import { keyValuePair } from './keyValuePair';
import { contact } from './contact';

export interface vehicle {
  id: number,
  make: keyValuePair,
  model: keyValuePair,
  isRegistered: boolean,
  features: keyValuePair[],
  contact: contact,
  lastUpdate: string
}
