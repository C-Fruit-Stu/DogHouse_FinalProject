import React, { useContext, useState } from 'react';
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

  // Get the correct posts based on client type
  const posts = clientType === 1
    ? currentTrainer?.Posts || []
    : currentCoustumer?.HisTrainer.flatMap((trainer: TrainerType) => trainer.Posts || []) || [];

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
      setImageUri(null); // Clear image input
      setModalVisible(false);
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

  // Like/unlike posts for trainers and customers
  const handleLike = (postId: string) => {
    const updatedPosts = posts.map((post: Post) =>
      post.id === postId
        ? {
            ...post,
            likedByUser: !post.likedByUser,
            likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
          }
        : post
    );
  };

  // Comment handler for posts (trainers and customers)
  const handleComment = (postId: string, newComment: Comment) => {
    const updatedPosts = posts.map((post: Post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    );
  };

  // Toggle comment visibility for posts
  const toggleComments = (postId: string) => {
    setCommentsVisible((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Delete any comment (trainers only)
  const handleDeleteComment = (postId: string, commentId: string) => {
    const updatedPosts = posts.map((post: Post) =>
      post.id === postId
        ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
        : post
    );
    // Update context with new comments after deletion
  };

  // Restore delete handler for trainers
  const handleDelete = (postId: string) => {
    if (clientType === 1) {
      // Implement delete post logic later
    }
  };

  // Restore edit handler for trainers
  const handleEdit = (postId: string, updatedPost: Post) => {
    if (clientType === 1) {
      // Implement edit post logic later
    }
  };

  // Facebook-like post view for customers and trainers
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <PostView post={item} clientType={clientType!} isOwner={clientType === 1} />
            <View style={styles.postActions}>
              <Text style={styles.likesCount}>Likes: {item.likes}</Text>
              <TouchableOpacity onPress={() => handleLike(item.id)}>
                <Text style={styles.likeButton}>{item.likedByUser ? 'Unlike' : 'Like'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleComments(item.id)}>
                <Text style={styles.commentsCount}>Comments: {item.comments.length}</Text>
              </TouchableOpacity>
              {commentsVisible[item.id] && (
                <ScrollView style={styles.commentsSection}>
                  {item.comments.map((comment: Comment) => (
                    <View key={comment.id} style={styles.commentContainer}>
                      <Text style={styles.commentText}>{comment.text}</Text>
                      {clientType === 1 && (
                        <TouchableOpacity onPress={() => handleDeleteComment(item.id, comment.id)}>
                          <Text style={styles.deleteComment}>Delete</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                  <TextInput
                    placeholder="Add a comment"
                    onSubmitEditing={(event) =>
                      handleComment(item.id, { id: Math.random().toString(), text: event.nativeEvent.text, userId: 'currentUserId' })
                    }
                    style={styles.commentInput}
                  />
                </ScrollView>
              )}
            </View>
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
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likesCount: {
    fontSize: 16,
  },
  likeButton: {
    color: 'blue',
    marginBottom: 10,
  },
  commentsCount: {
    fontSize: 16,
  },
  commentsSection: {
    maxHeight: 100,
    marginTop: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
  },
  deleteComment: {
    color: 'red',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginTop: 10,
  },
});
