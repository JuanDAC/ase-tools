import { Button, Color, Component, Shades, Slider } from 'juandac/ase-ui/src/AseUI/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent } from 'juandac/ase-ui/src/AseUI/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';

export class Mixtures extends AseComponent {
  constructor() {
    super();
  }

  initialState({ state }: AseComponentMethodsProps): void {
    state.initial({
      id: 'COLOR_mixtures',
      key: 'visible',
      initialValue: false,
      modify: false,
    });
  }

  render({ state, window }: AseComponentMethodsProps): ComponentFormart[] {
    return Component({
      visible: state.obtain({ id: 'COLOR_mixtures', key: 'visible' }),
      children: [
        Color({
          id: 'MIXTURE_picker_color_one',
          onchange: (value: Color) => {
            print('Generate the color was selected is: ');
            print(value);
          },
        }),
        Button({
          id: 'MIXTURE_select_backgound_one',
          text: 'primario',
        }),
        Button({
          id: 'MIXTURE_select_foregound_one',
          text: 'segundario',
        }),
        Color({
          id: 'MIXTURE_picker_color_two',
          onchange: (value: Color) => {
            print('Generate the color was selected is: ');
            print(value);
          },
        }),
        Button({
          id: 'MIXTURE_select_backgound_two',
          text: 'primario',
        }),
        Button({
          id: 'MIXTURE_select_foregound_two',
          text: 'segundario',
        }),
        Shades({
          id: 'MIXTURE_result',
          colors: [],
        }),
        Slider({
          id: 'MIXTURE_balance',
          min: 0,
          max: 100,
        }),
      ],
    });
  }
}
