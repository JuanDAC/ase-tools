import { Component, Button, ComponentFormart } from 'juandac/ase-ui/components';
import { AseComponent, AseView, AseComponentMethodsProps } from 'juandac/ase-ui/window';
import type { ColorizeProps } from './Negative.types';

export class Negative extends AseComponent {
  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialState(): void {}

  render({ view }: AseComponentMethodsProps & ColorizeProps): ComponentFormart[] {
    return Component({
      children: [
        Button({
          id: 'NEGATIVE_apply',
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
