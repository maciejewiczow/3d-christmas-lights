import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button } from 'react-native';
import { RootStackParams } from '~/App';
import { Text } from '~/src/components/themed';
import { HomeViewWrapper } from './parts';

type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

export const HomeView: React.FC<Props> = ({ navigation }) => (
    <HomeViewWrapper>
        <Text>HomeView</Text>
        <Button onPress={() => navigation.navigate('Scan')} title="Scan something" />
    </HomeViewWrapper>
);
