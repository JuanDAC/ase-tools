import { Button, Combobox, Separator, Component } from 'juandac/ase-ui/src/AseUI/components';
import { ComponentFormart } from 'juandac/ase-ui/src/AseUI/components/interface';
import { AseComponent } from 'juandac/ase-ui/src/AseUI/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/src/AseUI/window/interface';

export class Header extends AseComponent {
  constructor() {
    super();
  }

  initialState({ state }: AseComponentMethodsProps): void {
    state.initial('ASEUI_languages', 'visible', false);
  }

  render({ state, window }: AseComponentMethodsProps): ComponentFormart[] {
    return Component({
      children: [
        Separator({
          id: 'ASEUI_separator_setting',
          text: 'settings',
        }),
        Combobox({
          id: 'ASEUI_languages',
          focus: true,
          visible: state.obtain('ASEUI_languages', 'visible'),
          option: 'es-ES',
          options: ['es-ES', 'en-US'],
          onchange: () => {
            print('change', JSON.stringify(window.state));
          },
        }),
        Button({
          id: 'ASEUI_languages_changes',
          text: 'language',
          selected: false,
          onclick: () => {
            state.update('ASEUI_languages', 'visible', (visible) => !visible);
          },
        }),
        Button({
          id: 'ASEUI_minimize',
          text: 'minimize',
          selected: false,
          visible: true,
          onclick: () => {
            window.onMinimize();
            window.hide();
          },
        }),
        Button({
          id: 'ASEUI_close',
          text: 'close',
          selected: false,
          visible: true,
          onclick: () => window.hide(),
        }),
      ],
    });
  }
}
