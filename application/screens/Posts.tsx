import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Post, Comment } from '../types/trainer_type';
import PostView from '../components/ViewPost';
import { MediaType } from 'expo-image-picker';

type RouteParams = {
  clientType?: number,
  trainerEmail?: string
};

export default function Posts() {
  const [modalVisible, setModalVisible] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentsVisible, setCommentsVisible] = useState<{ [key: string]: boolean }>({});

  const { currentTrainer, AddPost, GetTrainerPosts } = useContext(TrainerContext);
  const { currentCoustumer } = useContext(CoustumerContext);
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const clientType = route.params?.clientType;
  const trainerEmail = route.params?.trainerEmail;

  useEffect(() => {
    const loadPosts = async () => {
      try {
        if (clientType === 2) {
          if (trainerEmail) {
            // Fetch posts for the specific trainer
            const fetchedPosts = await GetTrainerPosts(trainerEmail);
            const postsArray = Array.isArray(fetchedPosts) ? fetchedPosts : [fetchedPosts];
            setPosts(postsArray.filter((post: Post) => post.description !== ''));
          } else if (currentCoustumer?.HisTrainer?.length) {
            // Fetch posts from all trainers the customer is following
            const fetchedPostsPromises = currentCoustumer.HisTrainer.map((email: string) =>
              GetTrainerPosts(email).catch(() => [])
            );

            const allFetchedPosts = await Promise.all(fetchedPostsPromises);
            const flattenedPosts = allFetchedPosts.flat();
            setPosts(flattenedPosts.filter((post: Post) => post.description !== ''));
          } else {
            setPosts([]);
          }
        } else if (clientType === 1) {
          if (currentTrainer?.Posts) {
            setPosts(currentTrainer.Posts.filter((post: Post) => post.description !== ''));
          } else {
            setPosts([]);
          }
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts([]);
      }
    };

    loadPosts();
  }, [clientType, trainerEmail, currentTrainer, currentCoustumer, GetTrainerPosts]);



  const toggleModal = () => setModalVisible(!modalVisible);

  const handleSubmit = async () => {
    if (clientType === 1 && AddPost) {
      const currentPostCount =
        currentTrainer?.Posts && Array.isArray(currentTrainer.Posts)
          ? currentTrainer.Posts.length + 1
          : 1;
  
      const newPost: Post = {
        id: currentPostCount.toString(),
        title: input1.trim(),
        description: input2.trim(),
        image: imageUri || undefined,
        likes: 0,
        likedByUser: false,
        comments: [],
        isOwner: true,
      };
  
      console.log('newPost ====>>>', newPost);
  
      try {
        const response = await AddPost(newPost);
  
        if (response) {
          setPosts((prevPosts) => [...prevPosts, newPost]);
          setModalVisible(false);
          setInput1('');
          setInput2('');
          setImageUri(null);
        } else {
          console.error('Failed to save post to database');
        }
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  };
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImageUri(result.assets[0].uri);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <PostView post={item} clientType={clientType!} isOwner={clientType === 1} />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noPostsText}>No posts available for this trainer</Text>}
      />

      {clientType === 1 && (
        <TouchableOpacity style={styles.addPostButton} onPress={toggleModal}>
          <Text style={styles.addPostText}>Add Post</Text>
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <ScrollView
              contentContainerStyle={styles.modalContentContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.modalContent}>
                <TextInput
                  placeholder="Title"
                  value={input1}
                  onChangeText={setInput1}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Description"
                  value={input2}
                  onChangeText={setInput2}
                  style={styles.input}
                  multiline={true}
                />
                <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                  <Text style={styles.imageButtonText}>Pick an Image</Text>
                </TouchableOpacity>
                {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f5' },
  addPostButton: {
    backgroundColor: '#1DBD7B',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -75 }],
    width: 150,
  },
  addPostText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  modalContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  imageButton: {
    backgroundColor: '#1DBD7B',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  imageButtonText: { color: '#fff' },
  imagePreview: { width: '100%', height: 200, marginBottom: 15 },
  submitButton: {
    backgroundColor: '#1DBD7B',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  submitText: { color: '#fff', fontWeight: 'bold' },
  closeButton: { alignItems: 'center' },
  closeText: { color: '#999', fontSize: 16 },
  postContainer: { backgroundColor: '#fff', marginBottom: 20, borderRadius: 10, padding: 15 },
  noPostsText: { fontSize: 16, color: '#777', textAlign: 'center' },
});
