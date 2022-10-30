import { Button, Combobox, Separator, Component } from 'juandac/ase-ui/components';
import { ComponentFormart } from 'juandac/ase-ui/components';
import { AseComponent } from 'juandac/ase-ui/window';
import { AseComponentMethodsProps } from 'juandac/ase-ui/window';

export class Header extends AseComponent {
  constructor() {
    super();
  }

  initialState({ state }: AseComponentMethodsProps): void {
    state.initial<boolean>({ id: 'ASEUI_languages', key: 'visible', initialValue: false });
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
          visible: state.obtain<boolean>({ id: 'ASEUI_languages', key: 'visible' }),
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
            state.update<boolean>({ id: 'ASEUI_languages', key: 'visible', update: (visible) => !visible });
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
