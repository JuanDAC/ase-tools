import { JSON } from 'juandac/ase-json/src/main';
import { Check, Component, Label, Newrow, Column } from 'juandac/ase-ui/src/AseUI/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent } from 'juandac/ase-ui/src/AseUI/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';
import { PickerColors } from './PickerColors';

type SwapSection = ({ id }: { id: string }) => void;
type ContrastProps = {
  swapSection: SwapSection;
};

export class Contrast extends AseComponent {
  constructor() {
    super();
  }

  initialState({ state }: AseComponentMethodsProps): void {
    state.initial<boolean>({
      id: 'COLOR_contrasts',
      key: 'visible',
      initialValue: false,
      modify: false,
    });
  }

  render<T>({ state, swapSection }: AseComponentMethodsProps & ContrastProps & T): ComponentFormart[] {
    return Component({
      children: [
        Check({
          id: 'COLOR_contraste',
          text: 'Contraste idoneo',
          selected: state.obtain<boolean>({ id: 'COLOR_contrasts', key: 'visible' }),
          onclick: () => swapSection({ id: 'COLOR_contrasts' }),
        }),
        Newrow(),
        Column({
          visible: state.obtain<boolean>({ id: 'COLOR_contrasts', key: 'visible' }),
          children: [
            PickerColors({
              id: 'CONTRAST_one',
              onChangeColor: (color) => {
                print(color);
              },
              onPrimary: (event) => {
                print('onPrimary');
                print(JSON.stringify(event));
              },
              onSecondary: () => {
                print('onSecondary');
              },
            }),
            PickerColors({
              id: 'CONTRAST_two',
              onChangeColor: (event) => {
                print(event?.color);
              },
              onPrimary: () => {
                print('onPrimary');
              },
              onSecondary: () => {
                print('onSecondary');
              },
            }),
            Newrow(),
            Label({
              id: 'CONTRAST_general',
              text: 'Contraste',
            }),
            Newrow(),
            Label({
              id: 'CONTRAST_text',
              text: 'Contraste para textos',
            }),
            Newrow(),
            Label({
              id: 'CONTRAST_high',
              text: 'Alto contraste',
            }),
          ],
        }),
      ],
    });
  }
}
