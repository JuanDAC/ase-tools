import { App, Button, Newrow, Separator } from 'juandac/ase-ui/components';
import { AseComponent, AseView } from 'juandac/ase-ui/window';
import { Header } from '../compoenets/header/Header';
import { ColorView } from './ColorView';

export class MenuView extends AseView {
  constructor() {
    super();
  }

  components(): { [name: string]: AseComponent } {
    return {
      Header: new Header(),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialState() {}

  render() {
    const Header = this.component('Header');

    return App({
      title: 'Menu',
      onclose: () => true,
      children: [
        Header,
        Separator({ id: 'COLOR_separator', text: 'menu' }),
        Button({
          id: 'MENU_utilities',
          text: 'Utilidades',
        }),
        Newrow(),
        Button({
          id: 'MENU_utilities',
          text: 'Color',
          onclick: () => new ColorView(),
        }),
        Newrow(),
        Button({
          id: 'MENU_utilities',
          text: 'Transformaciones',
        }),
        Newrow(),
        Button({
          id: 'MENU_utilities',
          text: 'Filtros',
        }),
        Newrow(),
        Button({
          id: 'MENU_utilities',
          text: 'Capa',
        }),
        Newrow(),
        Button({
          id: 'MENU_utilities',
          text: 'Animación',
        }),
        Newrow(),
        Button({
          id: 'MENU_utilities',
          text: '2D',
        }),
        Newrow(),
        Button({
          id: 'MENU_utilities',
          text: '3D',
        }),
        Newrow(),
      ],
    });
  }
}
