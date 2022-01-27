import styled from 'styled-components/native';
import { ThemeProps } from '~/theme';

export const View = styled.View<ThemeProps>`
    background: ${({ theme }) => theme.bgPrimary};
    color: ${({ theme }) => theme.text};
`;

export const Text = styled.Text<ThemeProps>`
    color: ${({ theme }) => theme.text};
`;
