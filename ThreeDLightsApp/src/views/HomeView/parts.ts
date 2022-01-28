import styled, { ThemeProps } from 'styled-components/native';
import { View } from '~/src/components/themed';
import { Theme } from '~/theme';

export const HomeViewWrapper = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: stretch;
    padding-top: 12px;
`;

export const EffectListItem = styled.View<{ isCurrent: boolean }>`
    align-items: center;
    justify-content: center;
    padding: 24px 12px;

    background: ${({ isCurrent }) => (isCurrent ? '#444' : 'transparent')};
`;
