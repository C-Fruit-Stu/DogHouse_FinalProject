import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Modal,
  FlatList,
  Button,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Post, Comment } from '../types/trainer_type';
import PostView from '../components/ViewPost';

type RouteParams = {
  clientType?: number;
  trainerEmail?: string;
};

export default function Posts() {
  const [modalVisible, setModalVisible] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentsVisible, setCommentsVisible] = useState<{ [key: string]: boolean }>({});
  
  const { currentTrainer, AddPost, GetTrainerPosts,AddLike } = useContext(TrainerContext);
  const { currentCoustumer } = useContext(CoustumerContext);
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const clientType = route.params?.clientType;

  useEffect(() => {
    const loadPosts = async () => {
      if (clientType === 2) {
        try {
          if (currentCoustumer?.HisTrainer?.length) {
            const fetchedPostsPromises = currentCoustumer.HisTrainer.map((email: string) =>
              GetTrainerPosts(email).catch(() => [])
            );

            const allFetchedPosts = await Promise.all(fetchedPostsPromises);
            const flattenedPosts = allFetchedPosts.flat();
            setPosts(flattenedPosts.filter((post: Post) => post.description !== ''));
          }
        } catch (error) {
          setPosts([]);
        }
      } else if (clientType === 1 && currentTrainer?.Posts) {
        setPosts(currentTrainer.Posts);
      }
    };

    loadPosts();
  }, [clientType, currentTrainer, currentCoustumer]);

  const toggleModal = () => setModalVisible(!modalVisible);
  
  const handleSubmit = () => {
    if (clientType === 1 && AddPost) {
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
      AddPost(newPost);
      setInput1('');
      setInput2('');
      setImageUri(null);
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
      setImageUri(result.assets[0].uri);
    }
  };

  const handleLike = (postId: string,title:string) => {
    const updatedPosts = posts.map((post: Post) =>
      post.id === postId
        ? {
            ...post,
            likedByUser: !post.likedByUser,
            likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
          }
        : post
    );
    setPosts(updatedPosts);
    posts.map(async (post: Post) => {
      if (post.id === postId) {
        console.log("title",post.likes);
        if(await AddLike(postId,post))
        {
          console.log("liked");
        }
      }
    })
  };

  const handleComment = (postId: string, newComment: Comment) => {
    const updatedPosts = posts.map((post: Post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    );
    setPosts(updatedPosts);
  };

  const toggleComments = (postId: string) => {
    setCommentsVisible((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    const updatedPosts = posts.map((post: Post) =>
      post.id === postId
        ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
        : post
    );
    setPosts(updatedPosts);
  };

  const modalOpacity = new Animated.Value(0);
  useEffect(() => {
    if (modalVisible) {
      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      {clientType === 1 && (
        <TouchableOpacity style={styles.addPostButton} onPress={toggleModal}>
          <Text style={styles.addPostText}>Add Post</Text>
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <Animated.View style={[styles.modalContainer, { opacity: modalOpacity }]}>
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
            />
            <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
              <Text style={styles.imageButtonText}>Pick an Image</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <PostView post={item} clientType={clientType!} isOwner={clientType === 1} />
            <View style={styles.postActions}>
              <Text style={styles.likesCount}>Likes: {item.likes}</Text>
              <TouchableOpacity onPress={() => handleLike(item.id,item.title)}>
                <Text style={styles.likeButton}>{item.likedByUser ? 'Unlike' : 'Like'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleComments(item.id)}>
                <Text style={styles.commentsCount}>Comments: {item.comments?.length || 0}</Text>
              </TouchableOpacity>
              {commentsVisible[item.id] && (
                <ScrollView style={styles.commentsSection}>
                  {item.comments?.map((comment: Comment) => (
                    <View key={comment.id} style={styles.commentContainer}>
                      <Text style={styles.commentText}>{comment.text}</Text>
                      {clientType === 1 && (
                        <TouchableOpacity
                          onPress={() => handleDeleteComment(item.id, comment.id)}
                          style={styles.deleteCommentButton}
                        >
                          <Text style={styles.deleteCommentText}>Delete</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                  <TextInput
                    placeholder="Add a comment"
                    onSubmitEditing={(event) =>
                      handleComment(item.id, {
                        id: Math.random().toString(),
                        text: event.nativeEvent.text,
                        userId: 'currentUserId',
                      })
                    }
                    style={styles.commentInput}
                  />
                </ScrollView>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noPostsText}>No posts available for this trainer</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f5' },
  addPostButton: {
    backgroundColor: '#1DBD7B',
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  addPostText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
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
  postActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  likesCount: { fontSize: 14, color: '#777' },
  likeButton: { color: '#1DBD7B', fontSize: 14, fontWeight: 'bold' },
  commentsCount: { fontSize: 14, color: '#777' },
  commentsSection: { marginTop: 15 },
  commentContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  commentText: { fontSize: 14, color: '#555' },
  deleteCommentButton: { backgroundColor: '#ff4d4d', padding: 5, borderRadius: 5 },
  deleteCommentText: { color: '#fff', fontSize: 12 },
  commentInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 40,
  },
  noPostsText: { fontSize: 16, color: '#777', textAlign: 'center' },
});
