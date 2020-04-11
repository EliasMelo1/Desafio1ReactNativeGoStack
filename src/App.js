import React, { useState, useEffect } from "react";

import {SafeAreaView,View,FlatList,Text,StatusBar,StyleSheet,TouchableOpacity,} from "react-native";

import api from './services/api';


export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      console.log('resposta data: ', response.data);
      setRepositories(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
   
    const likedRepository = response.data;
    
    const repositoryUpdated = repositories.map(
      (repository) => {
        if(repository.id === id){
          return likedRepository;
        } else {
          return repository
        }
      }
    );
    setRepositories(repositoryUpdated);  
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({item: repository}) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                {repository.techs.map(tech => (
                  <Text key={tech} style={styles.tech}>{tech}</Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtida{repository.likes > 1 ? 's':''}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141D26",
  },

  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#243447",
    padding: 20,
  },

  repository: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#ffffff',
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#FFFF00",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#141d26",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color:'#ffffff',
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#ffffff",
    backgroundColor: "#141D26",
    padding: 15,
  },
});
