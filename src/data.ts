export interface Algorithm {
  name: string;
  implementations: Implementation[];
  category: Category;
}

interface Implementation {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  externalLink: string | null;
  animation: Animation;
  // TODO: Where does sampleInput belong—on the implementation or animation?
}

type Category = 'array' | 'string' | 'linkedList';

// TODO: What type should this eventually be?
type Animation = any;
