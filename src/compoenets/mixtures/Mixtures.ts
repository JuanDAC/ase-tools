import { Transforms } from 'juandac/ase-color/src/main';
import { Button, Check, Column, Component, Newrow, Shades, Slider } from 'juandac/ase-ui/src/AseUI/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent } from 'juandac/ase-ui/src/AseUI/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';
import { PickerColors } from '../pickerColors/PickerColors';
import { ContrastProps } from './Mixtures.types';

export class Mixtures extends AseComponent {
  colors: [Color?, Color?] = [];
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

    state.initial<Color[]>({
      id: 'MIXTURE_result',
      key: 'colors',
      initialValue: [],
      modify: false,
    });
  }

  render({ state, window, swapSection }: AseComponentMethodsProps & ContrastProps): ComponentFormart[] {
    print(this.balance);
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
              onChangeColor: (event) => {
                this.colors[0] = event?.color;
              },
              onPrimary: () => {
                print('onPrimary');
              },
              onSecondary: () => {
                print('onSecondary');
              },
            }),
            PickerColors({
              id: 'MIXTURE_two',
              color: this.colors[1],
              onChangeColor: (event) => {
                this.colors[1] = event?.color;
              },
              onPrimary: (event) => {
                print('onPrimary');
              },
              onSecondary: () => {
                print('onSecondary');
              },
            }),
            Shades({
              id: 'MIXTURE_result',
              colors: state.obtain<Color[]>({ id: 'MIXTURE_result', key: 'colors' }),
            }),
            Slider({
              id: 'MIXTURE_balance',
              min: 0,
              max: 100,
              value: this.balance,
              onchange: () => (this.balance = window.state['MIXTURE_balance'] as number),
            }),
            Button({
              id: 'MIXTURE_apply',
              text: 'Aplicar',
              onclick: () => this.updateColor({ state, window }),
            }),
          ],
        }),
      ],
    });
  }

  updateColor({ state, window }: AseComponentMethodsProps) {
    if (this.colors.length === 2) {
      state.update<[Color]>({
        id: 'MIXTURE_result',
        key: 'colors',
        update: () => [Transforms.blendColors(...(this.colors as [Color, Color]), window.state['MIXTURE_balance'])],
      });
    }
  }
}
