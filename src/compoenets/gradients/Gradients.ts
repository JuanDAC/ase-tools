import { Transforms } from 'juandac/ase-color';
import { Button, Check, Column, Component, Newrow, Shades, Slider } from 'juandac/ase-ui/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent, AseView } from 'juandac/ase-ui/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';
import { PickerColors } from '../pickerColors/PickerColors';
import type { OnChangeColorProps } from './Gradients.types';

export class Gradients extends AseComponent {
  color: Color[] = [];
  colors: [Color?, Color?] = [];
  length = 3;
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
          id: 'COLOR_degradado',
          text: 'Generar degradado',
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
              id: 'GRADIENT_one',
              color: this.colors[0],
              onChangeColor: (event) => this.onChangeColor({ run: true, update: false, index: 0, value: event?.color, view }),
              onPrimary: this.onChangeColor({ index: 0, value: app.bgColor, view }),
              onSecondary: this.onChangeColor({ index: 0, value: app.fgColor, view }),
            }),
            PickerColors({
              id: 'GRADIENT_two',
              color: this.colors[1],
              onChangeColor: (event) => this.onChangeColor({ run: true, update: false, index: 1, value: event?.color, view }),
              onPrimary: this.onChangeColor({ index: 1, value: app.bgColor, view }),
              onSecondary: this.onChangeColor({ index: 1, value: app.fgColor, view }),
            }),
            Shades({
              id: 'GRADIENT_result',
              colors: this.color as Color[],
            }),
            Slider({
              id: 'GRADIENT_balance',
              min: 3,
              max: 13,
              value: this.length,
              onchange: (event) => (this.length = event?.value as number),
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
      if (update) view.rebuild();
    };
    if (run) execution();
    return execution;
  }

  updateColor({ view }: { view: AseView }) {
    if (this.colors.filter((color) => !!color).length === 2) {
      this.color = Transforms.gradientGenerator(...(this.colors as [Color, Color]), this.length);
      view.rebuild();
    }
  }
}
