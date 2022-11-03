import { Component, Newrow, Button, Select, ComponentFormart } from 'juandac/ase-ui/components';
import { AseComponent, AseView, AseComponentMethodsProps } from 'juandac/ase-ui/window';
import { PickerColors } from '../../../fools/pickerColors/PickerColors';
import type { ColorizeProps, OnChangeColorProps } from './Colorize.types';

export class Colorize extends AseComponent {
  color?: Color;
  mode?: string;

  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialState(): void {}

  render({ view }: AseComponentMethodsProps & ColorizeProps): ComponentFormart[] {
    return Component({
      children: [
        PickerColors({
          id: 'COLORIZE_one',
          color: this.color,
          onChangeColor: (event) => this.onChangeColor({ run: true, update: false, value: event?.color, view }),
          onPrimary: this.onChangeColor({ value: app.bgColor, view }),
          onSecondary: this.onChangeColor({ value: app.fgColor, view }),
        }),
        Newrow(),
        Select({
          id: 'COLORIZE_chose',
          options: ['Seleciona una', 'Maximo', 'Promedio', 'Media', 'Minimo'],
          onchange: (event) => {
            this.mode = event?.value;
          },
        }),
        Button({
          id: 'COLORIZE_apply',
          visible: !!this.color,
          text: 'Aplicar',
          onclick: () => this.update({ view }),
        }),
      ],
    });
  }

  onChangeColor({ view, value, run = false, update = true }: OnChangeColorProps) {
    const execution = () => {
      this.color = value;
      if (update) view.rebuild();
    };
    if (run) execution();
    return execution;
  }

  update({ view }: { view: AseView }) {
    if (this.color && this.mode && this.mode !== 'Seleciona una') {
      view.rebuild();
    }
  }
}
