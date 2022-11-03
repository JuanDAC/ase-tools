import { HarmoniesColor } from 'juandac/ase-color/';
import { Check, Column, Combobox, Component, Div, Newrow, Shades } from 'juandac/ase-ui/components';
import { ComponentFormart, OnEvent } from 'juandac/ase-ui/components';
import { Text } from 'juandac/ase-ui/src/AseUI/components/label';
import { AseComponent, AseView, AseComponentMethodsProps } from 'juandac/ase-ui/window';
import { PickerColors } from '../../../fools/pickerColors/PickerColors';
import type { HarmoniesProps } from './Harmonies.types';

const harmonyHandlers = {
  Analogos: (color: Color) => HarmoniesColor.analogs(color),
  Complementarios: (color: Color) => HarmoniesColor.complementary(color),
  'Complementarios cercanos': (color: Color) => HarmoniesColor.split_complementary(color),
  Compuestos: (color: Color) => HarmoniesColor.compounds(color),
  Cuadrados: (color: Color) => HarmoniesColor.squares(color),
  'Dobles complementarios': (color: Color) => HarmoniesColor.complementary_doubles(color),
  Monocromaticos: (color: Color) => HarmoniesColor.monochromaticos(color),
  Tonos: (color: Color) => HarmoniesColor.tones(color),
  Sombra: (color: Color) => HarmoniesColor.shades(color),
  Triada: (color: Color) => HarmoniesColor.triad(color),
  'Triada complementaria': (color: Color) => HarmoniesColor.complementary_triad(color),
};

export class Harmonies extends AseComponent {
  color?: Color;
  harmonyPalette: Color[] = [];
  tryShow = false;
  harmonySelected?: string;
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

  render({ state, view, swapSection }: AseComponentMethodsProps & HarmoniesProps): ComponentFormart[] {
    const visible = state.obtain<boolean>({ id: 'COLOR_harmonies', key: 'visible' });
    return Component({
      children: [
        Check({
          id: 'COLOR_armonias',
          text: 'Armonías cromáticas',
          selected: visible,
          onclick: () => swapSection({ id: 'COLOR_harmonies' }),
        }),
        Newrow(),
        Column({
          visible: visible,
          children: [
            PickerColors({
              color: this.color,
              id: 'HARMONIES',
              onChangeColor: (event) => {
                this.color = event?.color;
              },
              onPrimary: () => {
                this.color = app.bgColor;
                view.update();
              },
              onSecondary: () => {
                this.color = app.fgColor;
                view.update();
              },
            }),
            Combobox({
              id: 'HARMONIES_select_harmony',
              option: this.harmonySelected,
              options: ['Selecciona una', ...Object.keys(harmonyHandlers).sort()],
              onchange: this.executeHarmony({ view }),
            }),
            Shades({
              id: 'HARMONIES_palette',
              colors: this.harmonyPalette,
            }),
            Div({
              visible: !this.color && this.harmonySelected !== 'Selecciona una',
              children: [
                Text({
                  id: 'HARMONIES_warning_select_color',
                  text: '⚠︎ | Escoja un color |',
                }),
                Newrow(),
              ],
            }),
          ],
        }),
      ],
    });
  }

  executeHarmony({ view }: { view: AseView }): OnEvent {
    return (event) => {
      const { value } = event ?? {};
      this.harmonySelected = value as string;
      if (this.color) {
        const handler: (color: Color) => Color[] = harmonyHandlers[value as keyof typeof harmonyHandlers];
        if (typeof handler === 'function') this.harmonyPalette = handler(this.color);
        if (typeof handler !== 'function') this.harmonyPalette = [];
        view.update();
      }
    };
  }
}
