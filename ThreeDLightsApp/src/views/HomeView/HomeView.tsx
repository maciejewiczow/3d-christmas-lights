import React from 'react';
import { FlatList, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParams } from '~/App';
import { Text } from '~/src/components/themed';
import { EffectListItem, HomeViewWrapper } from './parts';
import { currentEffect, effects as effectsSelector } from '~/src/store/devices/selectors';
import { capitalize } from '~/src/utils/capitalize';
import { setEffect } from '~/src/store/devices/actions';

export const HeaderTitle = 'Effects';

export const HomeView: React.FC = () => {
    const dispatch = useDispatch();
    const effects = useSelector(effectsSelector());
    const current = useSelector(currentEffect());

    return (
        <HomeViewWrapper>
            {effects ? (
                <FlatList
                    data={effects}
                    renderItem={({ item }) => (
                        <TouchableNativeFeedback onPress={() => dispatch(setEffect(item))}>
                            <EffectListItem isCurrent={item === current}>
                                <Text>{capitalize(item)}</Text>
                            </EffectListItem>
                        </TouchableNativeFeedback>
                    )}
                />) : (
                <Text>No device found</Text>
            )}
        </HomeViewWrapper>
    );
};

interface HeaderProps {
    tintColor?: string;
}

export const HeaderRight: React.FC<HeaderProps> = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams, 'Home'>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
            <Icon name="cube-scan" size={30} />
        </TouchableOpacity>
    );
};
