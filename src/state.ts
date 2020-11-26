export const input = [4, 2, 1, 3, 5, 8, 7, 10, 8];
export const sorted = [...input].sort((a, z) => a - z);

export type FinalAnswer = string | null;

type State = {
  scene: Scene;
  finalAnswer: FinalAnswer;
};

type Scene = 'first' | 'second' | 'third' | 'fourth';

type Action =
  | { type: 'PLAY_TWO_POINTERS' }
  | { type: 'SCENE_END'; finalAnswer: FinalAnswer };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'PLAY_TWO_POINTERS':
      return {
        ...state,
        scene: 'third'
      };

    case 'SCENE_END':
      return {
        ...state,
        scene: 'fourth',
        finalAnswer: action.finalAnswer
      };
  }
};

export const initialState: State = {
  scene: 'first',
  finalAnswer: ''
};
