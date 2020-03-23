import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, Button, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default function App() {
  const tokenAPI = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBblpEc3JCOERhVWg4Y1FDQ3hLYlR1VmZNQmkxIiwibmFtZSI6IkVkdWFyZG8gVWdoaW5pIiwiZW1haWwiOiJldWdoaW5pQGdtYWlsLmNvbSIsImV4cCI6MzgwMzkzNDgxNDYuNzA0LCJpYXQiOjE1ODQ5NzI2ODl9.I65PtfhMzcMuWmp3jVs1v56riDbxlyL7ukw6N3lkLTI';
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  };
  const createFormData = (photo) => {
    const data = new FormData();
    data.append('file', photo);
    return data;
  };
  const handleUploadPhoto = () => {    

    const urlApi = 'http://192.168.0.10:3030/api/upload';

    const fetConfig = {
      method: 'POST',
      data: createFormData(photo),
      headers: {        
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      }
    };

    console.log('------------------------');
    console.log('fetConfig', fetConfig);
    console.log('------------------------');
    fetch(urlApi, fetConfig)
      .then(response => {
        console.log(JSON.stringify(response));
      })
      .then(response => {
        console.log('upload succes', response);
        alert('Upload success!');
        setPhoto(null);
      })
      .catch(error => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

  return (
    <>    
      <Text>upload</Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <React.Fragment>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
            <Button title="Upload" onPress={handleUploadPhoto} />
          </React.Fragment>
        )}
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
      </View>
    </>
  );
};
