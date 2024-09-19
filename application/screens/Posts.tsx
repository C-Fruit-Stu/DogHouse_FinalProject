import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Modal, FlatList, Button, StyleSheet, TextInput, Image, Text } from 'react-native';
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Post, Comment } from '../types/trainer_type';
import PostView from '../components/ViewPost';

type RouteParams = {
  clientType?: number;
};

export default function Posts() {
  const [modalVisible, setModalVisible] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const { currentTrainer } = useContext(TrainerContext);
  const { currentCoustumer } = useContext(CoustumerContext);
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const clientType = route.params?.clientType;

  // State to manage posts
  const [posts, setPosts] = useState<Post[]>(clientType === 1 ? currentTrainer?.Posts || [] : currentCoustumer?.HisTrainer.flatMap( () => currentCoustumer.HisTrainer || []) || []);

  // Toggle modal for adding new post (trainers only)
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Handler to add a new post (only for trainers)
  const handleSubmit = () => {
    if (clientType === 1) {
      const newPost: Post = {
        id: Math.random().toString(),
        title: input1,
        description: input2,
        image: imageUri || undefined,
        likes: 0,
        likedByUser: false,
        comments: [],
        isOwner: true,
      };

      setPosts([...posts, newPost]); // Add post to state
      setInput1('');
      setInput2('');
      setImageUri(null);
      setModalVisible(false);
    }
  };

  // Handler to like/unlike posts (only for customers)
  const handleLike = (postId: string) => {
    if (clientType === 2) {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
                ...post,
                likedByUser: !post.likedByUser,
                likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
              }
            : post
        )
      );
    }
  };

  // Handler to comment on posts (only for customers)
  const handleComment = (postId: string, newComment: Comment) => {
    if (clientType === 2) {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
    }
  };

  // Handler to delete posts (only for trainers)
  const handleDelete = (postId: string) => {
    if (clientType === 1) {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    }
  };

  // Handler to edit posts (only for trainers)
  const handleEdit = (postId: string, updatedPost: Post) => {
    if (clientType === 1) {
      setPosts(prevPosts =>
        prevPosts.map(post => (post.id === postId ? updatedPost : post))
      );
    }
  };

  if (clientType === 2) {
    // For Customers
    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PostView
              post={item}
              clientType={clientType!}
              isOwner={false}
              onLike={() => handleLike(item.id)}
              onComment={(newComment: Comment) => handleComment(item.id, newComment)}
              onDelete={undefined} // Customers can't delete posts
              onEdit={undefined} // Customers can't edit posts
            />
          )}
        />
      </View>
    );
  } else {
    // For Trainers
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput placeholder="Title" value={input1} onChangeText={setInput1} style={styles.input} />
              <TextInput placeholder="Description" value={input2} onChangeText={setInput2} style={styles.input} />
              <Button title="Pick an Image" onPress={() => {}} />
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PostView
              post={item}
              clientType={clientType!}
              isOwner={true} // Trainers are the owners of their posts
              onLike={undefined} // Trainers can't like their own posts
              onComment={undefined} // Trainers can't comment on their own posts
              onDelete={() => handleDelete(item.id)}
              onEdit={(updatedPost) => handleEdit(item.id, updatedPost)}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1DBD7B',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});
