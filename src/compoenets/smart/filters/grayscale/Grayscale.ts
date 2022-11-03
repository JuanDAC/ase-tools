import { Component, Button, Select, ComponentFormart } from 'juandac/ase-ui/components';
import { AseComponent, AseView, AseComponentMethodsProps } from 'juandac/ase-ui/window';
import type { ColorizeProps } from './Grayscale.types';

export class Grayscale extends AseComponent {
  mode?: string;

  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialState(): void {}

  render({ view }: AseComponentMethodsProps & ColorizeProps): ComponentFormart[] {
    return Component({
      children: [
        Select({
          id: 'GRAYSCALE_chose',
          options: ['Seleciona una', 'Maximo', 'Promedio', 'Media', 'Minimo'],
          onchange: (event) => {
            this.mode = event?.value;
          },
        }),
        Button({
          id: 'GRAYSCALE_apply',
          text: 'Aplicar',
          onclick: () => this.update({ view }),
        }),
      ],
    });
  }

  update({ view }: { view: AseView }) {
    if (this.mode && this.mode !== 'Seleciona una') {
      view.rebuild();
    }
  }
}
