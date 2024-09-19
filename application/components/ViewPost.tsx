import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
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

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing && onEdit) {
      onEdit({
        ...post,
        title: editedTitle,
        description: editedDescription
      });
    }
  };

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
          <TouchableOpacity onPress={onLike}>
            <Text>{post.likedByUser ? 'Unlike' : 'Like'} ({post.likes})</Text>
          </TouchableOpacity>
          <TextInput placeholder="Add a comment" value={newComment} onChangeText={setNewComment} />
          <Button title="Comment" onPress={() => onComment && onComment({ id: Math.random().toString(), text: newComment, userId: '' })} />
        </View>
      )}

      {isOwner && (
        <View style={styles.ownerButtons}>
          <Button title="Edit" onPress={handleEdit} />
          <Button title="Delete" onPress={onDelete} />
        </View>
      )}

      <View>
        {post.comments.map(comment => (
          <Text key={comment.id}>{comment.text}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
  },
  ownerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default PostView;
