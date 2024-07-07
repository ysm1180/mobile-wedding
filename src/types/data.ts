export interface BrideAndGroom {
  name: string;
  relation: string;
  parents: Parent[];
}

interface Parent {
  relation: string;
  isDeceased?: boolean;
  name: string;
}
