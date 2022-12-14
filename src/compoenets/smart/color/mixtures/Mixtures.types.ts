import type { AseView } from 'juandac/ase-ui/window';

export type SwapSection = ({ id }: { id: string }) => void;
export type OnChangeColorProps = {
  index: number;
  value?: Color;
  run?: boolean;
  update?: boolean;
  view: AseView;
};
export type MixturesProps = {
  swapSection: SwapSection;
};
