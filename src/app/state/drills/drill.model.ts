import { guid, ID } from '@datorama/akita';
import { Technique } from '../techniques';

export const NAME = "name";
export const DESCRIPTION = "description";

export interface Drill {
  id: ID;
  name: string;
  description: string;
}

export interface DenormalizedDrill {
  id: ID;
  name: string;
  description: string;
}

export function createDrillForm(params?: Partial<Drill>) {
  return {
    name: '',
    description: '',
    ...params
  } as Drill;
}


export function createDrill(params?: Partial<Drill>) {
  return {
    id: guid(),
    name: '',
    description: '',
    techniques: [],
    ...params
  } as Drill;
}




// const ODirection = {
//   id: Object.keys(new myDrill().id)[0],
//   name: 1,
//   description: 2,
//   techniques: 3,
// } as const;