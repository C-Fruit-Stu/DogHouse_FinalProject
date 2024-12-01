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
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Post } from '../types/trainer_type';
import PostView from '../components/ViewPost';

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
  const [loading, setLoading] = useState(false);

  const { currentTrainer, AddPost, GetTrainerPosts } = useContext(TrainerContext);
  const { currentCoustumer } = useContext(CoustumerContext);
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const clientType = route.params?.clientType;
  const trainerEmail = route.params?.trainerEmail;

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        if (clientType === 2) {
          if (trainerEmail) {
            const fetchedPosts = await GetTrainerPosts(trainerEmail);
            const postsArray = Array.isArray(fetchedPosts) ? fetchedPosts : [fetchedPosts];
            setPosts(postsArray.filter((post: Post) => post.description !== ''));
          } else if (currentCoustumer?.HisTrainer?.length) {
            const fetchedPostsPromises = currentCoustumer.HisTrainer.map((email: string) =>
              GetTrainerPosts(email).catch(() => [])
            );
            const allFetchedPosts = await Promise.all(fetchedPostsPromises);
            setPosts(allFetchedPosts.flat().filter((post: Post) => post.description !== ''));
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
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [clientType, trainerEmail, currentTrainer, currentCoustumer, GetTrainerPosts]);

  const toggleModal = () => setModalVisible(!modalVisible);

  const handleSubmit = async () => {
    if (clientType === 1 && AddPost) {
      const currentPostCount = currentTrainer?.Posts?.length ?? 0;
      const newPost: Post = {
        id: (currentPostCount + 1).toString(),
        title: input1.trim(),
        description: input2.trim(),
        image: imageUri || undefined,
        likes: 0,
        likedByUser: false,
        comments: [],
        isOwner: true,
      };

      setLoading(true);

      try {
        const response = await AddPost(newPost);

        if (response) {
          setPosts((prevPosts) => [...prevPosts, newPost]);
          setModalVisible(false);
          setInput1('');
          setInput2('');
          setImageUri(null);
        } else {
          console.error('Failed to save post');
        }
      } catch (error) {
        console.error('Error adding post:', error);
      } finally {
        setLoading(false);
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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#1DBD7B" style={styles.loadingIndicator} />
      ) : (
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
      )}

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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.modalContentContainer} keyboardShouldPersistTaps="handled">
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
  loadingIndicator: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  modalContentContainer: { flex: 1, justifyContent: 'center' },
  modalContent: { backgroundColor: '#fff', margin: 20, borderRadius: 10, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  imageButton: { backgroundColor: '#1DBD7B', padding: 10, borderRadius: 5, alignItems: 'center' },
  imageButtonText: { color: '#fff', fontSize: 16 },
  imagePreview: { width: 100, height: 100, marginTop: 10, borderRadius: 5 },
  submitButton: { backgroundColor: '#1DBD7B', padding: 15, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  closeButton: { marginTop: 10, alignItems: 'center' },
  closeText: { fontSize: 16, color: '#1DBD7B' },
  postContainer: { marginBottom: 10 },
  noPostsText: { textAlign: 'center', color: '#999' },
});
