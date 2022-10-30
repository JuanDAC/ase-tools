import { App, Separator } from 'juandac/ase-ui/components';
import { AseComponent, AseView } from 'juandac/ase-ui/window';
import { Header } from '../compoenets/header/Header';
import { Contrast } from '../compoenets/smart/color/contrast/Contrast';
import { Gradients } from '../compoenets/smart/color/gradients/Gradients';
import { Harmonies } from '../compoenets/smart/color/harmonies/Harmonies';
import { Mixtures } from '../compoenets/smart/color/mixtures/Mixtures';

export class ColorView extends AseView {
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
    const Harmonies = this.functionalComponent('Harmonies');
    const Mixtures = this.functionalComponent('Mixtures');
    const Gradients = this.functionalComponent('Gradients');
    const Contrast = this.functionalComponent('Contrast');

    return App({
      title: 'Color',
      onclose: () => true,
      children: [
        Header,
        Separator({ id: 'COLOR_separator', text: 'color' }),
        Harmonies({ swapSection: this.swapSection() }),
        Mixtures({ swapSection: this.swapSection() }),
        Gradients({ swapSection: this.swapSection() }),
        Contrast({ swapSection: this.swapSection() }),
      ],
    });
  }

  swapSection() {
    return ({ id }: { id: string }) => {
      const sections = ['COLOR_contrasts', 'COLOR_gradients', 'COLOR_mixtures', 'COLOR_harmonies'];
      const others = sections.filter((section) => id !== section);
      const key = 'visible';
      this.state.update({
        id,
        key,
        update: (visible) => {
          others.forEach((id) => this.state.update({ id, key, update: () => false, rebuild: false }));
          return !visible;
        },
      });
    };
  }
}
