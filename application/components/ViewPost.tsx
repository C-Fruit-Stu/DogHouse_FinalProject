import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Post, Comment } from '../types/trainer_type';

interface PostViewProps {
  post: Post;
  clientType: number;
  isOwner: boolean;
  onLike?: () => void;
  onComment?: (newComment: Comment) => void;
  onDelete?: () => void;
  onEdit?: (updatedPost: Post) => void;
}

const PostView: React.FC<PostViewProps> = ({ post, clientType, isOwner, onLike, onComment, onDelete, onEdit }) => {
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedDescription, setEditedDescription] = useState(post.description);

  // Animation setup
  const [likeAnimation] = useState(new Animated.Value(1)); // For like button scaling

  const handleLike = () => {
    if (onLike) {
      onLike();
      // Start animation
      Animated.timing(likeAnimation, {
        toValue: 1.3, // Scale up
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        // Reset animation back to normal size
        Animated.timing(likeAnimation, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      });
    }
    console.log('Like button clicked',post);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing && onEdit) {
      onEdit({
        ...post,
        title: editedTitle,
        description: editedDescription,
      });
    }
  };

  if (post.description === '') {
    return null;
  }

  return (
    <View style={styles.postContainer}>
      {isOwner && isEditing ? (
        <View>
          <TextInput style={styles.input} value={editedTitle} onChangeText={setEditedTitle} />
          <TextInput style={styles.input} value={editedDescription} onChangeText={setEditedDescription} />
          <Button title="Save" onPress={handleEdit} />
        </View>
      ) : (
        <>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.description}>{post.description}</Text>
          {post.image && <Image source={{ uri: post.image }} style={styles.image} />}
        </>
      )}
      {!isOwner && (
        <View>
          <TouchableOpacity onPress={handleLike}>
            <Animated.Text style={[styles.likeText, { transform: [{ scale: likeAnimation }] }]}>
              {post.likedByUser ? 'Unlike' : 'Like'} ({post.likes})
            </Animated.Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Add a comment"
            value={newComment}
            onChangeText={setNewComment}
            style={styles.commentInput}
          />
          <Button title="Comment" onPress={() => onComment && onComment({ id: Math.random().toString(), text: newComment, userId: '' })} />
        </View>
      )}
      {isOwner && (
        <View style={styles.ownerButtons}>
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.commentsSection}>
        {(post.comments || []).map((comment) => (
          <Text key={comment.id} style={styles.commentText}>{comment.text}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 15,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2f4f4f',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f7f7f7',
  },
  likeText: {
    fontSize: 16,
    color: '#29a745',
    marginBottom: 10,
    textAlign: 'center',
  },
  ownerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  commentsSection: {
    marginTop: 15,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  commentText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  editButton: {
    backgroundColor: '#4CAF50', // Green for Edit
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF5733', // Red for Delete
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PostView;
