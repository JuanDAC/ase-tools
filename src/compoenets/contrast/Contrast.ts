import { Transforms } from 'juandac/ase-color';
import { Check, Component, Label, Newrow, Column, Button } from 'juandac/ase-ui/components';
import { ComponentFormart } from 'juandac/ase-ui/components';
import { AseComponent, AseView } from 'juandac/ase-ui/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/window';
import { PickerColors } from '../pickerColors/PickerColors';
import { ContrastProps, OnChangeColorProps } from './Contrast.types';

export class Contrast extends AseComponent {
  colors: [Color?, Color?] = [];
  contrast = 0;
  text = false;
  textBest = false;
  colorBlind = false;
  visible = false;
  check = '√';
  unCheck = 'ⓧ';

  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialState(): void {}

  render({ view }: AseComponentMethodsProps & ContrastProps): ComponentFormart[] {
    return Component({
      children: [
        Check({
          id: 'COLOR_contraste',
          text: 'Contraste idoneo',
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
              id: 'CONTRAST_one',
              color: this.colors[0],
              onChangeColor: (event) => this.onChangeColor({ run: true, update: false, index: 0, value: event?.color, view }),
              onPrimary: this.onChangeColor({ index: 0, value: app.bgColor, view }),
              onSecondary: this.onChangeColor({ index: 0, value: app.fgColor, view }),
            }),
            PickerColors({
              id: 'CONTRAST_two',
              color: this.colors[1],
              onChangeColor: (event) => this.onChangeColor({ run: true, update: false, index: 1, value: event?.color, view }),
              onPrimary: this.onChangeColor({ index: 1, value: app.bgColor, view }),
              onSecondary: this.onChangeColor({ index: 1, value: app.fgColor, view }),
            }),
            Newrow(),
            Label({
              id: 'CONTRAST_general',
              text: `Contraste ${this.contrast}`,
            }),
            Newrow(),
            Label({
              id: 'CONTRAST_text',
              text: `Contraste para textos: ${this.obtainCheck(this.text)}`,
            }),
            Newrow(),
            Label({
              id: 'CONTRAST_high',
              text: `Alto contraste ${this.obtainCheck(this.textBest)}`,
            }),
            Newrow(),
            Label({
              id: 'CONTRAST_high',
              text: `Contraste mejorado ${this.obtainCheck(this.colorBlind)}`,
            }),
            Newrow(),
            Button({
              id: 'MIXTURE_apply',
              visible: this.colors.filter((color) => !!color).length === 2,
              text: 'Clacular',
              onclick: () => this.update({ view }),
            }),
          ],
        }),
      ],
    });
  }

  obtainCheck(value: boolean): string {
    return value ? this.check : this.unCheck;
  }

  onChangeColor({ view, index, value, run = false, update = true }: OnChangeColorProps) {
    const execution = () => {
      this.colors[index] = value;
      if (update) view.rebuild();
    };
    if (run) execution();
    return execution;
  }

  update({ view }: { view: AseView }) {
    if (this.colors.filter((color) => !!color).length === 2) {
      const [contrast, { text, textBest, colorBlind }] = Transforms.contrast(...(this.colors as [Color, Color]));
      this.contrast = contrast;
      this.text = text;
      this.textBest = textBest;
      this.colorBlind = colorBlind;

      view.rebuild();
    }
  }
}
