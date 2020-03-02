import React from 'react';
import { StyleSheet, InputAccessoryView, ScrollView } from 'react-native';

import { ToolbarProps } from '../componentTypes';

import ToolbarItem from './ToolbarItem';

const Toolbar = ({
  CustomToolbarItem,
  controls,
  handleItemPress,
  nativeID,
}: ToolbarProps) => {
  return (
    <InputAccessoryView nativeID={nativeID}>
      <ScrollView
        horizontal
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {controls.map(item =>
          CustomToolbarItem !== undefined ? (
            <CustomToolbarItem
              controlName={item}
              handleItemPress={handleItemPress}
              key={item}
              testID={`${item}Item`}
            />
          ) : (
            <ToolbarItem
              controlName={item}
              handleItemPress={handleItemPress}
              key={item}
              testID={`${item}Item`}
            />
          )
        )}
      </ScrollView>
    </InputAccessoryView>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
});