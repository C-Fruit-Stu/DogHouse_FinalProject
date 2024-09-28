import React, { useContext, useState } from 'react';
import { View, Modal, FlatList, Button, StyleSheet, TextInput, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Assuming you're using Expo
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Post, Comment, TrainerType } from '../types/trainer_type';
import PostView from '../components/ViewPost';

type RouteParams = {
  clientType?: number;
};

export default function Posts() {
  const [modalVisible, setModalVisible] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null); // To store selected image URI
  const [galleryImg, setGalleryImg] = useState<string[]>([]); // To store images for preview

  const { currentTrainer, AddPost } = useContext(TrainerContext); // Use AddPost from context
  const { currentCoustumer } = useContext(CoustumerContext);
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const clientType = route.params?.clientType;

  // Show all posts from trainers in HisTrainer for customers
  const posts = clientType === 1
    ? currentTrainer?.Posts || []
    : currentCoustumer?.HisTrainer.flatMap((trainer: TrainerType) => trainer.Posts || []) || [];

  // Toggle modal for adding a new post (trainers only)
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Handler to add a new post using AddPost function (only for trainers)
  const handleSubmit = () => {
    if (clientType === 1 && AddPost) {
      const newPost: Post = {
        id: Math.random().toString()+"11",
        title: input1,
        description: input2,
        image: imageUri || undefined, // Include selected image URI
        likes: 0,
        likedByUser: false,
        comments: [],
        isOwner: true,
      };

      AddPost(newPost); // Call the AddPost function from TrainerContext
      setInput1('');
      setInput2('');
      setImageUri(null); // Clear selected image
      setModalVisible(false);
    }
  };

  // Image Picker to allow users to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setGalleryImg([...galleryImg, result.assets[0].uri]);
      setImageUri(result.assets[0].uri); // Set the selected image URI for preview
    }
  };

  // Handler to like/unlike posts (only for customers)
  const handleLike = (postId: string) => {
    if (clientType === 2) {
      const updatedPosts = posts.map((post: Post) =>
        post.id === postId
          ? {
            ...post,
            likedByUser: !post.likedByUser,
            likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
          }
          : post
      );
      // Update posts in the context instead of using setState
    }
  };

  // Handler to comment on posts (only for customers)
  const handleComment = (postId: string, newComment: Comment) => {
    if (clientType === 2) {
      const updatedPosts = posts.map((post: Post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      );
      // Update posts in the context instead of using setState
    }
  };

  // Handler to delete posts (only for trainers)
  const handleDelete = (postId: string) => {
    if (clientType === 1) {
      // Call context function to delete post
    }
  };

  // Handler to edit posts (only for trainers)
  const handleEdit = (postId: string, updatedPost: Post) => {
    if (clientType === 1) {
      // Call context function to edit post
    }
  };

  if (clientType === 2) {
    // For Customers (Show posts from all trainers in HisTrainer)
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
    // For Trainers (Show their own posts)
    return (
      <View style={styles.container}>
        <Button
          title="Add Post"
          onPress={toggleModal}
          color="#1DBD7B" // Set color for button
        />

        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput placeholder="Title" value={input1} onChangeText={setInput1} style={styles.input} />
              <TextInput placeholder="Description" value={input2} onChangeText={setInput2} style={styles.input} />
              <Button title="Pick an Image" onPress={pickImage} />
              {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              )}
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

        <FlatList
          data={posts.filter((post: Post) => post.title)} // Filter out posts with empty title
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
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});
