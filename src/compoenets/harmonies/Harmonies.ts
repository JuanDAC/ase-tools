import { ColorRGB } from 'juandac/ase-color/src/domain/color/types';
import { ColorModels } from 'juandac/ase-color/src/main';
import { JSON } from 'juandac/ase-json/src/main';
import { Check, Column, Combobox, Component, Newrow, Shades } from 'juandac/ase-ui/src/AseUI/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent } from 'juandac/ase-ui/src/AseUI/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';
import { PickerColors } from '../pickerColors/PickerColors';

export type SwapSection = ({ id }: { id: string }) => void;
export type ContrastProps = {
  swapSection: SwapSection;
};

export class Harmonies extends AseComponent {
  constructor() {
    super();
  }
  initialState({ state }: AseComponentMethodsProps): void {
    state.initial<boolean>({
      id: 'COLOR_harmonies',
      key: 'visible',
      initialValue: false,
      modify: false,
    });
  }

  render({ state, swapSection }: AseComponentMethodsProps & ContrastProps): ComponentFormart[] {
    return Component({
      children: [
        Check({
          id: 'COLOR_armonias',
          text: 'Armonías cromáticas',
          selected: state.obtain<boolean>({ id: 'COLOR_harmonies', key: 'visible' }),
          onclick: () => swapSection({ id: 'COLOR_harmonies' }),
        }),
        Newrow(),
        Column({
          visible: state.obtain<boolean>({ id: 'COLOR_harmonies', key: 'visible' }),
          children: [
            PickerColors({
              id: 'HARMONIES',
              state,
              onChangeColor: (event) => {
                print(JSON.stringify(ColorModels.RGB2XYZ(event?.color as ColorRGB)));
              },
              onPrimary: () => {
                print('onPrimary');
              },
              onSecondary: () => {
                print('onSecondary');
              },
            }),
            Combobox({
              id: 'HARMONIES_select_harmony',
              options: [
                'Analogos',
                'Complementarios',
                'Complementarios cercanos',
                'Compuestos',
                'Cuadrados',
                'Dobles complementarios',
                'Monocromaticos',
                'Tonos',
                'Sombra',
                'Triada',
                'Triada complementaria',
              ],
              onchange: (event) => {
                const { value } = event ?? {};
                print('Generate the color palette new harmony ' + value);
              },
            }),
            Shades({
              id: 'HARMONIES_palette',
              colors: [],
            }),
          ],
        }),
      ],
    });
  }
}
