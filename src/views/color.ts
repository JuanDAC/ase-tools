import { App, Check, Newrow, Separator } from 'juandac/ase-ui/src/AseUI/components';
import { AseComponent, AseView } from 'juandac/ase-ui/src/AseUI/window';
import { Contrast } from '../compoenets/Contrast';
import { Gradients } from '../compoenets/Gradients';
import { Harmonies } from '../compoenets/Harmonies';
import { Header } from '../compoenets/Header';
import { Mixtures } from '../compoenets/Mixtures';

export class Color extends AseView {
  constructor() {
    super();
  }

  components(): { [name: string]: AseComponent } {
    return {
      Header: new Header(),
      Harmonies: new Harmonies(),
      Mixtures: new Mixtures(),
      Gradients: new Gradients(),
      Contrast: new Contrast(),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialState() {}

  render() {
    const Header = this.component('Header');
    const Harmonies = this.component('Harmonies');
    const Mixtures = this.component('Mixtures');
    const Gradients = this.component('Gradients');
    const Contrast = this.component('Contrast');

    return App({
      title: 'Color',
      onclose: () => {
        return;
      },
      children: [
        Header,
        Separator({
          id: 'COLOR_separator',
          text: 'color',
        }),
        Check({
          id: 'COLOR_armonias',
          text: 'Armonías cromáticas',
          selected: this.state.obtain({ id: 'COLOR_harmonies', key: 'visible' }),
          onclick: () => this.state.update({ id: 'COLOR_harmonies', key: 'visible', update: (visible) => !visible }),
        }),
        Newrow(),
        Harmonies,
        Check({
          id: 'COLOR_mezclas',
          text: 'Mezclador de colores',
          selected: this.state.obtain({ id: 'COLOR_mixtures', key: 'visible' }),
          onclick: () => this.state.update({ id: 'COLOR_mixtures', key: 'visible', update: (visible) => !visible }),
        }),
        Newrow(),
        Mixtures,
        Check({
          id: 'COLOR_degradado',
          text: 'Generar degradado',
          selected: this.state.obtain({ id: 'COLOR_gradients', key: 'visible' }),
          onclick: () => this.state.update({ id: 'COLOR_gradients', key: 'visible', update: (visible) => !visible }),
        }),
        Newrow(),
        Gradients,
        Check({
          id: 'COLOR_contraste',
          text: 'Contraste idoneo',
          selected: this.state.obtain({ id: 'COLOR_contrasts', key: 'visible' }),
          onclick: () => this.state.update({ id: 'COLOR_contrasts', key: 'visible', update: (visible) => !visible }),
        }),
        Newrow(),
        Contrast,
      ],
    });
  }
}
