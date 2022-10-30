import { Button, Color, Component, FC, Row } from 'juandac/ase-ui/components';
import { OnEvent } from 'juandac/ase-ui/components';

type PickerColorsProps = {
  id: string;
  onChangeColor: OnEvent<void, Color>;
  onPrimary: OnEvent;
  onSecondary: OnEvent;
  color?: Color;
};

export const PickerColors: FC<PickerColorsProps> = ({ id, onChangeColor, onPrimary, onSecondary, color }) =>
  Component({
    children: [
      Color({
        color: color,
        id: `${id}_picker_color`,
        onchange: onChangeColor,
      }),
      Row({
        children: [
          Button({
            id: `${id}_select_backgound`,
            text: 'primario',
            onclick: onPrimary,
          }),
          Button({
            id: `${id}_select_foregound`,
            text: 'segundario',
            onclick: onSecondary,
          }),
        ],
      }),
    ],
  });
