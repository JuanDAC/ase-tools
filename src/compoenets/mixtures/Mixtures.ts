import { Transforms } from 'juandac/ase-color';
import { Button, Check, Column, Component, Newrow, Shades, Slider } from 'juandac/ase-ui/components';
import { ComponentFormart } from 'juandac/ase-ui/components';
import { AseComponent, AseView } from 'juandac/ase-ui/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/window';
import { PickerColors } from '../pickerColors/PickerColors';
import type { OnChangeColorProps } from './Mixtures.types';

export class Mixtures extends AseComponent {
  colors: [Color?, Color?] = [];
  color: [Color?] = [];
  balance = 50;
  visible = false;

  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialState(): void {}

  render({ view }: AseComponentMethodsProps): ComponentFormart[] {
    return Component({
      children: [
        Check({
          id: 'COLOR_mezclas',
          text: 'Mezclador de colores',
          selected: this.visible,
          onclick: (event) => {
            this.visible = !!event?.value;
            view.update();
          },
        }),
        Newrow(),
        Column({
          visible: this.visible,
          children: [
            PickerColors({
              id: 'MIXTURE_one',
              color: this.colors[0],
              onChangeColor: (event) => this.onChangeColor({ run: true, update: false, index: 0, value: event?.color, view }),
              onPrimary: this.onChangeColor({ index: 0, value: app.bgColor, view }),
              onSecondary: this.onChangeColor({ index: 0, value: app.fgColor, view }),
            }),
            PickerColors({
              id: 'MIXTURE_two',
              color: this.colors[1],
              onChangeColor: (event) => this.onChangeColor({ run: true, update: false, index: 1, value: event?.color, view }),
              onPrimary: this.onChangeColor({ index: 1, value: app.bgColor, view }),
              onSecondary: this.onChangeColor({ index: 1, value: app.fgColor, view }),
            }),
            Shades({
              id: 'MIXTURE_result',
              colors: this.color as Color[],
            }),
            Slider({
              id: 'MIXTURE_balance',
              min: 0,
              max: 100,
              value: this.balance,
              onchange: (event) => (this.balance = event?.value as number),
            }),
            Button({
              id: 'MIXTURE_apply',
              visible: this.colors.filter((color) => !!color).length === 2,
              text: 'Aplicar',
              onclick: () => this.updateColor({ view }),
            }),
          ],
        }),
      ],
    });
  }

  onChangeColor({ view, index, value, run = false, update = true }: OnChangeColorProps) {
    const execution = () => {
      this.colors[index] = value;
      if (update) view.update();
    };
    if (run) execution();
    return execution;
  }

  updateColor({ view }: { view: AseView }) {
    if (this.colors.filter((color) => !!color).length === 2) {
      this.color = [Transforms.blendColors(...(this.colors as [Color, Color]), this.balance)];
      view.rebuild();
    }
  }
}
