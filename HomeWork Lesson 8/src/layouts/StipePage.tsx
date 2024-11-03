import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';

const BASE_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com:3000';

const StripePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/exhibits?page=1&limit=10`);
        console.log(response.data); // Логируем данные
        setPosts(response.data); // Предполагается, что ваш API возвращает массив постов
      } catch (err) {
        setError('Ошибка при загрузке постов');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          imageUrl={post.imageUrl} // Здесь передаем imageUrl напрямую
          description={post.description}
          username={post.user.username}
          commentCount={post.commentCount}
        />
      ))}
    </div>
  );
};

export default StripePage;
