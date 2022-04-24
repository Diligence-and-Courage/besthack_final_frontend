import { Depths, getTheme, SharedColors } from '@fluentui/react';
import { FontSizes, FontWeights } from '@fluentui/theme';

const { palette } = getTheme();

export const COLORS = {
  RED: SharedColors.redOrange10,
  GREEN: SharedColors.greenCyan10,
  DEFAULT: palette.themePrimary,
  GREY_TEXT: palette.neutralSecondary,
};

export const GRADIENT = `linear-gradient(220deg, ${palette.themePrimary}, ${palette.themeDark})`;

export const HEADER_GRADIENT = `
  background: -webkit-linear-gradient(300deg, ${palette.themePrimary}, ${palette.themeDark});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  `;

export const FONTS = {
  header: `font-size: ${FontSizes.size68}; font-weight: ${FontWeights.semibold};`,
  mobileHeader: `font-size: ${FontSizes.size42}; font-weight: ${FontWeights.semibold};`,
  localHeader: `font-size: ${FontSizes.size32}; font-weight: ${FontWeights.regular};`,
  localHeaderBold: `font-size: ${FontSizes.size32}; font-weight: ${FontWeights.semibold};`,
  text: `font-size: ${FontSizes.size20}; font-weight: ${FontWeights.regular};`,
  smallText: `font-size: ${FontSizes.size16};
        font-weight: ${FontWeights.regular};
        color: ${palette.neutralSecondary};
    `,
};

export const MOBILE_WIDTH = '500px';
export const TABLET_WIDTH = '1100px';

export const GAP = {
  xxl: '60px',
  xl: '30px',
  l: '20px',
  m: '15px',
  s: '10px',
};

export const DEPTH = {
  l: Depths.depth64,
  s: Depths.depth4,
};
