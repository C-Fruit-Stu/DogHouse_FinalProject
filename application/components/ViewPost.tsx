import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, Button, Alert } from 'react-native';
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';

type Comment = {
    id: string;
    text: string;
    userId: string; // to associate the comment with a user
};

type Post = {
    id: string;
    title: string;
    description: string;
    image?: string;
    likes: number;
    likedByUser: boolean;
    comments: Comment[];
    isOwner: boolean; // This indicates if the current user is the owner of the post
};
const PostView = () => {
    const { currentTrainer } = useContext(TrainerContext);
    const { currentCoustumer } = useContext(CoustumerContext);

    const [posts, setPosts] = useState<Post[]>(currentTrainer?.Posts || []);
    const [commentText, setCommentText] = useState<string>('');

    const handleLike = (postId: string) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
                        likedByUser: !post.likedByUser,
                    }
                    : post
            )
        );
    };

    const handleAddComment = (postId: string) => {
        if (commentText.trim() === '') return;
        const newComment: Comment = {
            id: Math.random().toString(), // unique id for the comment
            text: commentText,
            userId: currentCoustumer ? currentCoustumer.email : '', // or trainer ID if the user is a trainer
        };

        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: [...post.comments, newComment],
                    }
                    : post
            )
        );
        setCommentText('');
    };

    const handleDeleteComment = (postId: string, commentId: string) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: post.comments.filter((comment) => comment.id !== commentId),
                    }
                    : post
            )
        );
    };

    const handleDeletePost = (postId: string) => {
        Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
            { text: 'Cancel' },
            { text: 'Delete', onPress: () => setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId)) },
        ]);
    };

    const renderPost = ({ item: post }: { item: Post }) => {
        const isOwner = post.isOwner; // For trainers to check if they own the post
        return (
            <View style={styles.postContainer}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDescription}>{post.description}</Text>
                {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}

                <View style={styles.interactionRow}>
                    <TouchableOpacity onPress={() => handleLike(post.id)}>
                        <Text style={styles.likeButton}>{post.likedByUser ? 'Unlike' : 'Like'} ({post.likes})</Text>
                    </TouchableOpacity>

                    {isOwner && (
                        <TouchableOpacity onPress={() => handleDeletePost(post.id)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <FlatList
                    data={post.comments}
                    keyExtractor={(comment) => comment.id}
                    renderItem={({ item: comment }) => (
                        <View style={styles.commentContainer}>
                            <Text style={styles.commentText}>{comment.text}</Text>
                            {comment.userId === (currentCoustumer ? currentCoustumer.email : currentTrainer?.email) && (
                                <TouchableOpacity onPress={() => handleDeleteComment(post.id, comment.id)}>
                                    <Text style={styles.deleteCommentButton}>Delete</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                />

                <View style={styles.addCommentContainer}>
                    <TextInput
                        style={styles.commentInput}
                        value={commentText}
                        onChangeText={setCommentText}
                        placeholder="Add a comment..."
                    />
                    <Button title="Post" onPress={() => handleAddComment(post.id)} />
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={posts}
            keyExtractor={(post) => post.id}
            renderItem={renderPost}
            contentContainerStyle={styles.postsList}
        />
    );
};

const styles = StyleSheet.create({
    postsList: {
        padding: 20,
    },
    postContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    postDescription: {
        fontSize: 14,
        marginVertical: 10,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    interactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    likeButton: {
        fontSize: 16,
        color: 'blue',
    },
    deleteButton: {
        fontSize: 16,
        color: 'red',
    },
    commentContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    commentText: {
        fontSize: 14,
    },
    deleteCommentButton: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
    },
    addCommentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});

export default PostView;
