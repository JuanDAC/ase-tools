import { JSON } from 'juandac/ase-json/src/main';
import { Check, Column, Component, Newrow, Shades, Slider } from 'juandac/ase-ui/src/AseUI/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent } from 'juandac/ase-ui/src/AseUI/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';
import { PickerColors } from './PickerColors';

type SwapSection = ({ id }: { id: string }) => void;
type ContrastProps = {
  swapSection: SwapSection;
};

export class Mixtures extends AseComponent {
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

  render<T>({ state, swapSection }: AseComponentMethodsProps & ContrastProps & T): ComponentFormart[] {
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
              onChangeColor: (event) => {
                print('Generate the color was selected is: ');
                print(event);
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
              onChangeColor: (event) => {
                print('Generate the color was selected is: ');
                print(JSON.stringify(event));
              },
              onPrimary: (event) => {
                print('onPrimary');
                print(JSON.stringify(event));
              },
              onSecondary: () => {
                print('onSecondary');
              },
            }),
            Shades({
              id: 'MIXTURE_result',
              colors: [],
            }),
            Slider({
              id: 'MIXTURE_balance',
              min: 0,
              max: 100,
            }),
          ],
        }),
      ],
    });
  }
}
