import type { AseView } from 'juandac/ase-ui/src/AseUI/window';

export type SwapSection = ({ id }: { id: string }) => void;
export type OnChangeColorProps = {
  index: number;
  value?: Color;
  run?: boolean;
  update?: boolean;
  view: AseView;
};
export type ContrastProps = {
  swapSection: SwapSection;
};
