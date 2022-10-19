import { Component, Label, Newrow } from 'juandac/ase-ui/src/AseUI/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent } from 'juandac/ase-ui/src/AseUI/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';
import { PickerColors } from './PickerColors';

export class Contrast extends AseComponent {
  constructor() {
    super();
  }

  initialState({ state }: AseComponentMethodsProps): void {
    state.initial({
      id: 'COLOR_contrasts',
      key: 'visible',
      initialValue: false,
      modify: false,
    });
  }

  render({ state, window }: AseComponentMethodsProps): ComponentFormart[] {
    return Component({
      visible: state.obtain({ id: 'COLOR_contrasts', key: 'visible' }),
      children: [
        PickerColors({
          id: 'CONTRAST_one',
          state,
          onChangeColor: (color) => {
            print(color);
          },
          onPrimary: () => {
            print('onPrimary');
          },
          onSecondary: () => {
            print('onSecondary');
          },
        }),
        PickerColors({
          id: 'CONTRAST_two',
          state,
          onChangeColor: (color) => {
            print(color);
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
    });
  }
}
