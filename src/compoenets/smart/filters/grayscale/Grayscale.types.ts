import { AseView } from 'juandac/ase-ui/window';

export type SwapSection = ({ id }: { id: string }) => void;
export type ColorizeProps = {
  swapSection: SwapSection;
};

export type OnChangeColorProps = {
  value?: Color;
  run?: boolean;
  update?: boolean;
  view: AseView;
};
