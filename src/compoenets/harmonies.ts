import { Button, Color, Combobox, Component, Shades } from 'juandac/ase-ui/src/AseUI/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent } from 'juandac/ase-ui/src/AseUI/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';

export class Harmonies extends AseComponent {
  constructor() {
    super();
  }
  initialState({ state }: AseComponentMethodsProps): void {
    state.initialShare({
      group: 'COLOR_harmonies',
      ids: [
        'HARMONIES_picker_color',
        'HARMONIES_select_backgound',
        'HARMONIES_select_foregound',
        'HARMONIES_select_harmony',
        'HARMONIES_palette',
      ],
      key: 'visible',
      initialValue: false,
      modify: false,
    });
  }

  render({ state, window }: AseComponentMethodsProps): ComponentFormart[] {
    return Component({
      children: [
        Color({
          id: 'HARMONIES_picker_color',
          visible: state.obtainShare({ group: 'COLOR_harmonies', key: 'visible' }),
          onchange: (value: Color) => {
            print('Generate the color was selected is: ');
            print(value);
          },
        }),
        Button({
          id: 'HARMONIES_select_backgound',
          text: 'primario',
          visible: state.obtainShare({ group: 'COLOR_harmonies', key: 'visible' }),
        }),
        Button({
          id: 'HARMONIES_select_foregound',
          text: 'segundario',
          visible: state.obtainShare({ group: 'COLOR_harmonies', key: 'visible' }),
        }),
        Combobox({
          id: 'HARMONIES_select_harmony',
          visible: state.obtainShare({ group: 'COLOR_harmonies', key: 'visible' }),
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
          visible: state.obtainShare({ group: 'COLOR_harmonies', key: 'visible' }),
          colors: [],
        }),
      ],
    });
  }
}
