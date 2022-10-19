import { Button, Color, Component, FC } from 'juandac/ase-ui/src/AseUI/components';

type PickerColorsProps = { id: string; onChangeColor: (color: Color) => void; onPrimary: () => void; onSecondary: () => void };

export const PickerColors: FC<PickerColorsProps> = ({ id, onChangeColor, onPrimary, onSecondary }) =>
  Component({
    children: [
      Color({
        id: `${id}_picker_color`,
        onchange: onChangeColor,
      }),
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
  });
