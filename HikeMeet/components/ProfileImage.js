import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const ProfileImage = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Image
        source={require('../assets/profile.jpg')}
        style={styles.profileImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    marginTop: 29,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default ProfileImage;
