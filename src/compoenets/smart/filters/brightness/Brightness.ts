import { Component, Newrow, Button, ComponentFormart, Slider } from 'juandac/ase-ui/components';
import { AseComponent, AseView, AseComponentMethodsProps } from 'juandac/ase-ui/window';
import type { ColorizeProps } from './Brightness.types';

export class Brightness extends AseComponent {
  color?: Color;
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
          id: 'BRIGHTNESS_percentage',
          min: 1,
          max: 100,
          value: this.percentage,
        }),
        Newrow(),
        Button({
          id: 'BRIGHTNESS_apply',
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
