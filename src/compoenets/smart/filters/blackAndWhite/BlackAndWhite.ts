import { Component, Newrow, Button, ComponentFormart, Slider } from 'juandac/ase-ui/components';
import { AseComponent, AseView, AseComponentMethodsProps } from 'juandac/ase-ui/window';
import type { ColorizeProps } from './BlackAndWhite.types';

export class BlackAndWhite extends AseComponent {
  percentage = 50;

  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialState(): void {}

  render({ view }: AseComponentMethodsProps & ColorizeProps): ComponentFormart[] {
    return Component({
      children: [
        Slider({
          id: 'BLACK_AND_WHITE_percentage',
          min: 0,
          max: 255,
          value: this.percentage,
        }),
        Newrow(),
        Button({
          id: 'BLACK_AND_WHITE_apply',
          text: 'Aplicar',
          onclick: () => this.update({ view }),
        }),
      ],
    });
  }

  update({ view }: { view: AseView }) {
    view.rebuild();
  }
}
