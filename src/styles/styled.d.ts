import 'styled-components';
import { Theme } from '../types/theme.types';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

