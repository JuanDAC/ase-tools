import { Check, Column, Component, Newrow, Shades, Slider } from 'juandac/ase-ui/src/AseUI/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent } from 'juandac/ase-ui/src/AseUI/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';
import { PickerColors } from './PickerColors';

type SwapSection = ({ id }: { id: string }) => void;
type ContrastProps = {
  swapSection: SwapSection;
};

export class Gradients extends AseComponent {
  constructor() {
    super();
  }

  initialState({ state }: AseComponentMethodsProps): void {
    state.initial<boolean>({
      id: 'COLOR_gradients',
      key: 'visible',
      initialValue: false,
      modify: false,
    });
  }

  render<T>({ state, swapSection }: AseComponentMethodsProps & ContrastProps & T): ComponentFormart[] {
    return Component({
      children: [
        Check({
          id: 'COLOR_degradado',
          text: 'Generar degradado',
          selected: state.obtain<boolean>({ id: 'COLOR_gradients', key: 'visible' }),
          onclick: () => swapSection({ id: 'COLOR_gradients' }),
        }),
        Newrow(),
        Column({
          visible: state.obtain<boolean>({ id: 'COLOR_gradients', key: 'visible' }),
          children: [
            PickerColors({
              id: 'GRADIENT_one',
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
              id: 'GRADIENT_two',
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
            Shades({
              id: 'GRADIENT_result',
              colors: [],
            }),
            Slider({
              id: 'GRADIENT_balance',
              min: 3,
              max: 13,
            }),
          ],
        }),
      ],
    });
  }
}
