import { App, ComponentFormart, Select, Separator } from 'juandac/ase-ui/components';
import { AseComponent, AseView } from 'juandac/ase-ui/window';
import { Header } from '../compoenets/header/Header';
import { Brightness } from '../compoenets/smart/filters/brightness/Brightness';
import { Colorize } from '../compoenets/smart/filters/colorize/Colorize';

export class FiltersView extends AseView {
  option = '';
  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialState() {}

  components(): { [name: string]: AseComponent } {
    return {
      Header: new Header(),
      Brightness: new Brightness(),
      Colorize: new Colorize(),
    };
  }

  render() {
    const Header = this.component('Header');
    const options = {
      Brillo: this.component('Brightness'),
      Colorizar: this.component('Colorize'),
    };
    const OptionsFilter = this.OptionSelected(options);

    return App({
      title: 'Filters',
      onclose: () => true,
      children: [
        Header,
        Separator({ id: 'FILTERS_title', text: 'filters' }),
        Select({
          option: this.option,
          id: 'FILTERS_chose',
          options: ['Seleciona una', ...Object.keys(options)],
          onchange: (event) => {
            this.option = event?.value ?? '';
            this.update();
          },
        }),
        OptionsFilter,
      ],
    });
  }
  OptionSelected(options: { [key: string]: ComponentFormart[] }) {
    if (!Object.keys(options).find((value) => value === this.option)) return [];

    return options[this.option as keyof typeof options];
  }
}
