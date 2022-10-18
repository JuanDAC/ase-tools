import { App, Check, Newrow, Separator } from 'juandac/ase-ui/src/AseUI/components';
import { AseComponent, AseView } from 'juandac/ase-ui/src/AseUI/window';
import { Harmonies } from '../compoenets/harmonies';
import { Header } from '../compoenets/header';

export class Color extends AseView {
  constructor() {
    super();
  }

  components(): { [name: string]: AseComponent } {
    return {
      Header: new Header(),
      Harmonies: new Harmonies(),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialState() {}

  run() {
    this.window.template = App({
      title: 'Color',
      onclose: () => {
        return;
      },
      children: [
        ...this.component('Header'),
        Separator({
          id: 'COLOR_separator',
          text: 'color',
        }),
        Check({
          id: 'COLOR_armonias',
          text: 'Armonías cromáticas',
          selected: this.state.obtainShare('COLOR_harmonies', 'visible'),
          onclick: () => {
            this.state.updateShare('COLOR_harmonies', 'visible', (visible) => !visible);
          },
        }),
        Newrow(),
        ...this.component('Harmonies'),
        Check({
          id: 'COLOR_mezclas',
          text: 'Mezclador de colores',
        }),
        Newrow(),
        Check({
          id: 'COLOR_degradado',
          text: 'Generar degradado',
        }),
        Newrow(),
        Check({
          id: 'COLOR_contraste',
          text: 'Contraste idoneo',
        }),
        Newrow(),
      ],
    });
  }
}
