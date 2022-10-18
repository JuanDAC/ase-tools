import { Button, Color, Combobox, Component, Shades } from 'juandac/ase-ui/src/AseUI/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent } from 'juandac/ase-ui/src/AseUI/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';

export class Harmonies extends AseComponent {
  constructor() {
    super();
  }
  initialState({ state }: AseComponentMethodsProps): void {
    state.initialShare(
      'COLOR_harmonies',
      [
        'HARMONIES_picker_color',
        'HARMONIES_select_backgound',
        'HARMONIES_select_foregound',
        'HARMONIES_select_harmony',
        'HARMONIES_palette',
      ],
      'visible',
      false,
      false
    );
  }

  render({ state, window }: AseComponentMethodsProps): ComponentFormart[] {
    return Component({
      children: [
        Color({
          id: 'HARMONIES_picker_color',
          visible: state.obtainShare('COLOR_harmonies', 'visible'),
          onchange: () => {
            print('Generate the color palette new color');
          },
        }),
        Button({
          id: 'HARMONIES_select_backgound',
          text: 'primario',
          visible: state.obtainShare('COLOR_harmonies', 'visible'),
        }),
        Button({
          id: 'HARMONIES_select_foregound',
          text: 'segundario',
          visible: state.obtainShare('COLOR_harmonies', 'visible'),
        }),
        Combobox({
          id: 'HARMONIES_select_harmony',
          visible: state.obtainShare('COLOR_harmonies', 'visible'),
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
          onchange: () => {
            print('Generate the color palette new harmony');
          },
        }),
        Shades({
          id: 'HARMONIES_palette',
          visible: state.obtainShare('COLOR_harmonies', 'visible'),
          colors: [],
        }),
      ],
    });
  }
}
