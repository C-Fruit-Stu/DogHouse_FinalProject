import React, { useContext, useState, useEffect } from 'react';
import { View, Modal, FlatList, Button, StyleSheet, TextInput, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [galleryImg, setGalleryImg] = useState<string[]>([]);
  const [commentsVisible, setCommentsVisible] = useState<{ [key: string]: boolean }>({}); // For managing comment visibility

  const { currentTrainer, AddPost } = useContext(TrainerContext);
  const { currentCoustumer } = useContext(CoustumerContext);
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const clientType = route.params?.clientType;

  // Refresh the screen when a new post is added
  const [refresh, setRefresh] = useState(false);

  // Get the correct posts based on client type
  const posts = clientType === 1
    ? currentTrainer?.Posts || []
    : currentCoustumer?.HisTrainer.flatMap((trainer: TrainerType) => trainer.Posts || []) || [];

  useEffect(() => {
    if (refresh) {
      // Trigger re-render when refresh is true
      setRefresh(false);
    }
  }, [refresh]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSubmit = () => {
    if (clientType === 1 && AddPost) {
      const newPost: Post = {
        id: Math.random().toString() + "11",
        title: input1,
        description: input2,
        image: imageUri || undefined,
        likes: 0,
        likedByUser: false,
        comments: [],
        isOwner: true,
      };

      AddPost(newPost);
      setInput1('');
      setInput2('');
      setImageUri(null);
      setModalVisible(false);
      setRefresh(true); // Trigger refresh after adding a post
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setGalleryImg([...galleryImg, result.assets[0].uri]);
      setImageUri(result.assets[0].uri);
    }
  };

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
      // Update context with new likes count (pseudo-code)
      // updatePosts(updatedPosts);
      setRefresh(true); // Refresh to update likes
    }
  };

  const handleComment = (postId: string, newComment: Comment) => {
    if (clientType === 2) {
      const updatedPosts = posts.map((post: Post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      );
      // Update context with new comment (pseudo-code)
      // updatePosts(updatedPosts);
      setRefresh(true); // Refresh to update comments
    }
  };

  const toggleComments = (postId: string) => {
    setCommentsVisible((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleDelete = (postId: string) => {
    if (clientType === 1) {
      // Call context function to delete post
    }
  };

  const handleEdit = (postId: string, updatedPost: Post) => {
    if (clientType === 1) {
      // Call context function to edit post
    }
  };

  // Display posts and include like and comment functionalities
  return (
    <View style={styles.container}>
      {clientType === 1 && (
        <Button title="Add Post" onPress={toggleModal} color="#1DBD7B" />
      )}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput placeholder="Title" value={input1} onChangeText={setInput1} style={styles.input} />
            <TextInput placeholder="Description" value={input2} onChangeText={setInput2} style={styles.input} />
            <Button title="Pick an Image" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={posts.filter((post: Post) => post.title)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <PostView post={item} clientType={clientType!} isOwner={clientType === 1} />
            <Text style={styles.likesCount}>Likes: {item.likes}</Text>
            <TouchableOpacity onPress={() => handleLike(item.id)}>
              <Text style={styles.likeButton}>{item.likedByUser ? 'Unlike' : 'Like'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleComments(item.id)}>
              <Text style={styles.commentsCount}>Comments: {item.comments.length}</Text>
            </TouchableOpacity>
            {commentsVisible[item.id] && (
              <ScrollView style={styles.commentsSection}>
                {item.comments.map((comment: Comment, index: number) => (
                  <Text key={index} style={styles.commentText}>{comment.text}</Text>
                ))}
                <TextInput
                  placeholder="Add a comment"
                  onSubmitEditing={(event) => handleComment(item.id, { id: Math.random().toString(), text: event.nativeEvent.text, userId: 'currentUserId' })}
                  style={styles.commentInput}
                />
              </ScrollView>
            )}
          </View>
        )}
      />
    </View>
  );
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
  postContainer: {
    marginBottom: 20,
  },
  likesCount: {
    fontSize: 16,
    marginBottom: 5,
  },
  likeButton: {
    color: 'blue',
    marginBottom: 10,
  },
  commentsCount: {
    fontSize: 16,
    marginBottom: 5,
  },
  commentsSection: {
    maxHeight: 100,
    marginTop: 10,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 10,
  },
});
