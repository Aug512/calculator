import { ButtonModel } from '../components/BasicButtons/BasicButtons'

export enum ButtonVisual {
  light = 'btn__light',
  dark = 'btn__dark',
  colored = 'btn__colored',
}

export interface ButtonProps {
  model: ButtonModel,
  //callback: Function
}
