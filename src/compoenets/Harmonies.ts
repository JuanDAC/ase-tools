import { Button, Color, Combobox, Component, Shades } from 'juandac/ase-ui/src/AseUI/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent } from 'juandac/ase-ui/src/AseUI/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';

export class Harmonies extends AseComponent {
  constructor() {
    super();
  }
  initialState({ state }: AseComponentMethodsProps): void {
    state.initial({
      id: 'COLOR_harmonies',
      key: 'visible',
      initialValue: false,
      modify: false,
    });
  }

  render({ state, window }: AseComponentMethodsProps): ComponentFormart[] {
    return Component({
      visible: state.obtain({ id: 'COLOR_harmonies', key: 'visible' }),
      children: [
        Color({
          id: 'HARMONIES_picker_color',
          onchange: (value: Color) => {
            print('Generate the color was selected is: ');
            print(value);
          },
        }),
        Button({
          id: 'HARMONIES_select_backgound',
          text: 'primario',
        }),
        Button({
          id: 'HARMONIES_select_foregound',
          text: 'segundario',
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
          onchange: (value: string) => {
            print('Generate the color palette new harmony ' + value);
          },
        }),
        Shades({
          id: 'HARMONIES_palette',
          colors: [],
        }),
      ],
    });
  }
}
