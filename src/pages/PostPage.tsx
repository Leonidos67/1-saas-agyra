// pages/PostPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  MessageCircle, Repeat2, Heart, Share,
  ArrowLeft, MoreHorizontal, BarChart3,
  Calendar, MapPin, Link as LinkIcon
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api/posts';

interface Post {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
    fullName: string;
    avatar: string;
    followersCount: number;
  };
  likes: string[];
  likesCount: number;
  comments: any[];
  commentsCount: number;
  reposts: string[];
  repostsCount: number;
  viewsCount: number;
  bookmarksCount: number;
  media: string[];
  createdAt: string;
  isLiked: boolean;
  isReposted: boolean;
  isBookmarked: boolean;
}

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);

  const fetchPost = async (id: string) => {
    try {
      setLoading(true);
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_URL}/${id}`, { headers });
      
      if (!res.ok) {
        if (res.status === 404) {
          setError('Post not found');
        } else {
          setError('Failed to load post');
        }
        return;
      }

      const data = await res.json();
      setPost(data);
      setIsLiked(data.isLiked);
      setIsReposted(data.isReposted);
    } catch (err) {
      console.error('Fetch post error:', err);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!token || !post) return;
    
    try {
      const res = await fetch(`${API_URL}/${post._id}/like`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setIsLiked(data.liked);
        setPost(prev => prev ? { ...prev, likesCount: data.likesCount } : null);
      }
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleRepost = async () => {
    if (!token || !post) return;
    
    try {
      const res = await fetch(`${API_URL}/${post._id}/repost`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setIsReposted(data.reposted);
        setPost(prev => prev ? { ...prev, repostsCount: data.repostsCount } : null);
      }
    } catch (err) {
      console.error('Repost error:', err);
    }
  };

  const copyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied!');
    }).catch(() => {
      prompt('Copy this link:', link);
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-neutral-300 border-t-black"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-neutral-500 mb-4">{error || 'Post not found'}</p>
        <button onClick={() => navigate('/')} className="px-4 py-2 bg-black text-white rounded-full">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto border-x border-neutral-200 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="flex items-center gap-4 px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-neutral-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold">Post</h1>
        </div>
      </div>

      {/* Post Content */}
      <article className="p-4">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <Link to={`/@${post.author.username}`}>
            <img
              src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.fullName}&background=000&color=fff&size=48`}
              alt={post.author.fullName}
              className="w-12 h-12 rounded-full"
            />
          </Link>
          <div>
            <Link to={`/@${post.author.username}`} className="font-bold hover:underline">
              {post.author.fullName}
            </Link>
            <p className="text-neutral-500">@{post.author.username}</p>
          </div>
          <button className="ml-auto p-1 hover:bg-neutral-100 rounded-full">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Content */}
        <p className="text-lg text-neutral-900 leading-relaxed whitespace-pre-wrap break-words mb-4">
          {post.content}
        </p>

        {/* Media */}
        {post.media && post.media.length > 0 && (
          <div className="rounded-2xl overflow-hidden border border-neutral-200 mb-4">
            <img
              src={post.media[0]}
              alt="post media"
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Timestamp & Views */}
        <div className="flex items-center gap-2 text-neutral-500 text-sm mb-4 pb-4 border-b border-neutral-200">
          <span>{formatDate(post.createdAt)}</span>
          <span>·</span>
          <span>{formatCount(post.viewsCount)} Views</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm py-4 border-b border-neutral-200">
          <button className="hover:underline">
            <span className="font-bold">{formatCount(post.repostsCount)}</span>
            <span className="text-neutral-500 ml-1">Reposts</span>
          </button>
          <button className="hover:underline">
            <span className="font-bold">{formatCount(post.likesCount)}</span>
            <span className="text-neutral-500 ml-1">Likes</span>
          </button>
          <button className="hover:underline">
            <span className="font-bold">{formatCount(post.bookmarksCount)}</span>
            <span className="text-neutral-500 ml-1">Bookmarks</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-around items-center py-3 border-b border-neutral-200">
          <button className="flex items-center gap-2 text-neutral-500 hover:text-blue-500 transition-colors">
            <MessageCircle size={20} />
          </button>
          <button 
            onClick={handleRepost}
            className={`flex items-center gap-2 transition-colors ${
              isReposted ? 'text-green-500' : 'text-neutral-500 hover:text-green-500'
            }`}
          >
            <Repeat2 size={20} fill={isReposted ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${
              isLiked ? 'text-red-500' : 'text-neutral-500 hover:text-red-500'
            }`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <button className="flex items-center gap-2 text-neutral-500 hover:text-blue-500 transition-colors">
            <BarChart3 size={20} />
          </button>
          <button 
            onClick={copyLink}
            className="flex items-center gap-2 text-neutral-500 hover:text-blue-500 transition-colors"
          >
            <Share size={20} />
          </button>
        </div>
      </article>
    </div>
  );
};

export default PostPage;