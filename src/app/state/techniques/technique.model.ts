import { guid, ID } from "@datorama/akita";

export const DRILL_ID = "drillId";
export const CALLOUT = "callout";
export const DELAY = "delay";
export const PROBABILITY = "probability";

export interface Technique {
  id: ID;
  drillId: ID;
  callout: string;
  delay: number;
  probability: number;
}

export function createTechniqueForm(params?: Partial<Technique>) {
  return {
    ...params,
    callout: [params.callout || '', {updateOn: 'blur'}],
    delay: [params.delay || 5, {updateOn: 'blur'}],
    probability: [params.probability || 1, {updateOn: 'blur'}],
  };
}

export function createTechnique(params?: Partial<Technique>) {
  return {
    id: guid(),
    drillId: null,
    callout: "",
    delay: 5,
    probability: 1,
    ...params,
  } as Technique;
}
