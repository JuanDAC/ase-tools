import { HarmoniesColor } from 'juandac/ase-color/';
import { Button, Check, Column, Combobox, Component, Newrow, Shades } from 'juandac/ase-ui/components';
import { ComponentFormart, OnEvent } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent, AseView } from 'juandac/ase-ui/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';
import { PickerColors } from '../pickerColors/PickerColors';
import { ContrastProps } from './Harmonies.types';

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
  visible = false;
  harmonySelected?: string;
  constructor() {
    super();
  }
  initialState(): void {
    /*     state.initial<boolean>({
      id: 'COLOR_harmonies',
      key: 'visible',
      initialValue: false,
      modify: false,
    }); */
  }

  render({ view }: AseComponentMethodsProps & ContrastProps): ComponentFormart[] {
    return Component({
      children: [
        Check({
          id: 'COLOR_armonias',
          text: 'Armonías cromáticas',
          selected: this.visible,
          onclick: (event) => {
            this.visible = !!event?.value;
            view.update();
          },
        }),
        Newrow(),
        Column({
          visible: this.visible,
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
            /*
            Div({
              visible: (!this.harmonySelected && this.tryShow) || this.harmonySelected === 'Selecciona una',
              children: [
                Text({
                  id: 'HARMONIES_warning_select_harmony',
                  text: '⚠︎ | Ingrese una armonia cromatica |',
                }),
                Newrow(),
              ],
            }),
            */
            Button({
              id: 'HARMONIES_apply',
              visible: !!this.color && !!this.harmonySelected && this.harmonySelected !== 'Selecciona una',
              text: 'Aplicar',
              onclick: () => {
                this.tryShow = !this.color || !this.harmonySelected;
                view.rebuild();
              },
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
        view.rebuild();
      }
    };
  }
}
