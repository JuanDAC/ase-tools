import { Transforms } from 'juandac/ase-color/src/main';
import { Button, Check, Column, Component, Newrow, Shades, Slider } from 'juandac/ase-ui/src/AseUI/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent, AseView } from 'juandac/ase-ui/src/AseUI/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';
import { PickerColors } from '../pickerColors/PickerColors';
import { ContrastProps, OnChangeColorProps } from './Mixtures.types';

export class Mixtures extends AseComponent {
  colors: [Color?, Color?] = [];
  color: [Color?] = [];
  balance = 50;
  constructor() {
    super();
  }

  initialState({ state }: AseComponentMethodsProps): void {
    state.initial<boolean>({
      id: 'COLOR_mixtures',
      key: 'visible',
      initialValue: false,
      modify: false,
    });
  }

  render({ state, window, view, swapSection }: AseComponentMethodsProps & ContrastProps): ComponentFormart[] {
    return Component({
      children: [
        Check({
          id: 'COLOR_mezclas',
          text: 'Mezclador de colores',
          selected: state.obtain<boolean>({ id: 'COLOR_mixtures', key: 'visible' }),
          onclick: () => swapSection({ id: 'COLOR_mixtures' }),
        }),
        Newrow(),
        Column({
          visible: state.obtain<boolean>({ id: 'COLOR_mixtures', key: 'visible' }),
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
      if (update) view.rebuild();
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
