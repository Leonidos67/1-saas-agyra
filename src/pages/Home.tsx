import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  MessageCircle, Repeat2, Heart, 
  Image, Smile, Send, X,
  MoreHorizontal, Pen, Trash, Unlink2,
  Calendar, MapPin, Link as LinkIcon,
  ArrowLeft,
  ChevronLeft
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api/posts';
const USERS_API_URL = 'http://localhost:5000/api/users';

interface Post {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
    fullName: string;
    avatar: string;
  };
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  viewsCount: number;
  media: string[];
  createdAt: string;
  isLiked?: boolean;
  isReposted?: boolean;
}

const Home: React.FC = () => {
  const { user, token } = useAuth();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [repostedPosts, setRepostedPosts] = useState<Set<string>>(new Set());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostMedia, setNewPostMedia] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [menuOpenPostId, setMenuOpenPostId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpenPostId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Загрузка постов
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(API_URL, { headers });
      if (!res.ok) throw new Error('Failed to fetch posts');

      const data = await res.json();
      setPosts(data);
      
      const likedIds = new Set<string>();
      const repostedIds = new Set<string>();
      data.forEach((post: Post) => {
        if (post.isLiked) likedIds.add(post._id);
        if (post.isReposted) repostedIds.add(post._id);
      });
      setLikedPosts(likedIds);
      setRepostedPosts(repostedIds);
    } catch (err) {
      console.error('Fetch posts error:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [newPostContent]);

  const handleLike = async (postId: string) => {
    if (!token) {
      window.dispatchEvent(new CustomEvent('openLogin'));
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${postId}/like`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLikedPosts(prev => {
          const newSet = new Set(prev);
          data.liked ? newSet.add(postId) : newSet.delete(postId);
          return newSet;
        });
        setPosts(prev => prev.map(post => 
          post._id === postId ? { ...post, likesCount: data.likesCount } : post
        ));
        if (selectedPost?._id === postId) {
          setSelectedPost(prev => prev ? { ...prev, likesCount: data.likesCount } : null);
        }
      }
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleRepost = async (postId: string) => {
    if (!token) {
      window.dispatchEvent(new CustomEvent('openLogin'));
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${postId}/repost`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRepostedPosts(prev => {
          const newSet = new Set(prev);
          data.reposted ? newSet.add(postId) : newSet.delete(postId);
          return newSet;
        });
        setPosts(prev => prev.map(post => 
          post._id === postId ? { ...post, repostsCount: data.repostsCount } : post
        ));
        if (selectedPost?._id === postId) {
          setSelectedPost(prev => prev ? { ...prev, repostsCount: data.repostsCount } : null);
        }
      }
    } catch (err) {
      console.error('Repost error:', err);
    }
  };

  const copyPostLink = (postId: string) => {
    const link = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      prompt('Copy this link:', link);
    });
  };

  const isPostOwner = (post: Post) => {
    if (!user) return false;
    return user.username === post.author.username || user.id === post.author._id;
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to delete post');

      setPosts(prev => prev.filter(p => p._id !== postId));
      if (selectedPost?._id === postId) setSelectedPost(null);
      setMenuOpenPostId(null);
    } catch (err: any) {
      console.error('Delete post error:', err);
      alert(err.message || 'Failed to delete post');
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !token || isPosting) return;
    try {
      setIsPosting(true);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newPostContent, media: newPostMedia })
      });
      if (!res.ok) throw new Error('Failed to create post');
      
      const newPost = await res.json();
      setPosts(prev => [newPost, ...prev]);
      setNewPostContent('');
      setNewPostMedia([]);
      setIsCreateOpen(false);
    } catch (err: any) {
      console.error('Create post error:', err);
      alert(err.message || 'Failed to create post');
    } finally {
      setIsPosting(false);
    }
  };

  const handleAddMedia = () => {
    const url = prompt('Enter image URL:');
    if (url && url.trim()) setNewPostMedia(prev => [...prev, url.trim()]);
  };

  const handleRemoveMedia = (index: number) => {
    setNewPostMedia(prev => prev.filter((_, i) => i !== index));
  };

  const formatPostDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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

  return (
    <div className="max-w-[1200px] mx-auto flex gap-6 px-0 py-0">
      {/* Центральная колонка */}
      <div className="flex-1 max-w-[600px] border-x border-neutral-200 min-h-screen py-4">
        {/* Табы */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-200">
          <div className="flex">
            <button className="flex-1 py-4 text-sm font-semibold text-black border-b-2 border-black">For You</button>
            <button className="flex-1 py-4 text-sm font-semibold text-neutral-500 hover:bg-neutral-50">Following</button>
          </div>
        </div>

        {/* Create Post */}
        {!isCreateOpen ? (
          <div 
            onClick={() => setIsCreateOpen(true)}
            className="border-b border-neutral-200 p-4 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <div className="flex gap-3">
              <img 
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=000&color=fff&size=40&bold=true`}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="text-neutral-500 text-base">What's on your mind?</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-b border-neutral-200 p-4 bg-neutral-50">
            <div className="flex gap-3">
              <img 
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=000&color=fff&size=40&bold=true`}
                alt=""
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <textarea 
                  ref={textareaRef}
                  value={newPostContent} 
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="What's on your mind?" 
                  className="w-full resize-none outline-none text-neutral-900 bg-transparent placeholder:text-neutral-500 min-h-[100px] text-base"
                  maxLength={2000} 
                  autoFocus 
                />
                {newPostMedia.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {newPostMedia.map((url, index) => (
                      <div key={index} className="relative">
                        <img src={url} alt={`media-${index}`} className="w-20 h-20 object-cover rounded-xl" />
                        <button onClick={() => handleRemoveMedia(index)} className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 hover:bg-neutral-800">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-200">
                  <div className="flex items-center gap-2">
                    <button onClick={handleAddMedia} className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500">
                      <Image size={18} />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500">
                      <Smile size={18} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setIsCreateOpen(false); setNewPostContent(''); setNewPostMedia([]); }} 
                      className="px-4 py-2 rounded-full text-sm font-semibold hover:bg-neutral-100 transition-colors">
                      Cancel
                    </button>
                    <button onClick={handleCreatePost} disabled={!newPostContent.trim() || isPosting}
                      className="px-5 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                      {isPosting ? (
                        <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>Posting...</>
                      ) : (
                        <>Post</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div>
          {posts.length > 0 ? posts.map(post => (
            <article 
              key={post._id}
              className={`p-4 hover:bg-neutral-50 transition-all border-b border-neutral-200 group/article
                ${selectedPost?._id === post._id ? 'bg-neutral-50' : ''}
              `}
            >
              <div className="flex space-x-3">
                <Link to={`/@${post.author.username}`} onClick={(e) => e.stopPropagation()}>
                  <img 
                    src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.fullName}&background=000&color=fff&size=40&bold=true`}
                    alt={post.author.fullName} 
                    className="w-8 h-8 rounded-full hover:opacity-90 transition-opacity"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <Link 
                      to={`/@${post.author.username}`} 
                      className="font-bold hover:underline truncate text-neutral-900"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {post.author.fullName}
                    </Link>
                    <span className="text-neutral-500 truncate">@{post.author.username}</span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-neutral-500 whitespace-nowrap">{formatPostDate(post.createdAt)}</span>
                    
                    {/* Троеточие при наведении */}
                    <div className="ml-auto relative" ref={menuOpenPostId === post._id ? menuRef : null}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMenuOpenPostId(menuOpenPostId === post._id ? null : post._id); }}
                        className={`p-1 rounded-full transition-all ${
                          menuOpenPostId === post._id 
                            ? 'bg-black/10 text-black opacity-100' 
                            : 'text-neutral-500 opacity-0 group-hover/article:opacity-100 hover:bg-black/5'
                        }`}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      
                      {/* Выпадающее меню */}
                      {menuOpenPostId === post._id && (
                        <div 
                          className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg border border-neutral-200 p-1 z-50 shadow-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              copyPostLink(post._id);
                              setMenuOpenPostId(null);
                            }}
                            className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2"
                          >
                            <Unlink2 size={14} />
                            Copy link
                          </button>

                          {isPostOwner(post) && (
                            <>
                              <div className="h-px bg-neutral-100 my-1"></div>
                              <button
                                onClick={() => {
                                  // Edit functionality
                                  setMenuOpenPostId(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2"
                              >
                                <Pen size={14} />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeletePost(post._id)}
                                className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2 text-red-600"
                              >
                                <Trash size={14} />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedPost(post)}
                    className="cursor-pointer"
                  >
                    <p className="mt-1 text-neutral-900 leading-relaxed whitespace-pre-wrap break-words text-[15px]">
                      {post.content}
                    </p>

                    {post.media && post.media.length > 0 && (
                      <div className="mt-3 rounded-2xl overflow-hidden border border-neutral-200">
                        <img src={post.media[0]} alt="post media" className="w-full max-h-96 object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mt-3 max-w-md">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleLike(post._id); }}
                      className={`flex items-center gap-1 transition-colors group ${likedPosts.has(post._id) ? 'text-red-500' : 'text-neutral-500 hover:text-red-500'}`}
                    >
                      <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                        <Heart size={18} fill={likedPosts.has(post._id) ? 'currentColor' : 'none'} />
                      </div>
                      <span className="text-sm">{formatCount(post.likesCount || 0)}</span>
                    </button>

                    <button 
                      onClick={(e) => { e.stopPropagation(); }} 
                      className="flex items-center gap-1 text-neutral-500 hover:text-blue-500 transition-colors group"
                    >
                      <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                        <MessageCircle size={18} />
                      </div>
                      <span className="text-sm">{formatCount(post.commentsCount || 0)}</span>
                    </button>

                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRepost(post._id); }}
                      className={`flex items-center gap-1 transition-colors group ${repostedPosts.has(post._id) ? 'text-green-500' : 'text-neutral-500 hover:text-green-500'}`}
                    >
                      <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                        <Repeat2 size={18} fill={repostedPosts.has(post._id) ? 'currentColor' : 'none'} />
                      </div>
                      <span className="text-sm">{formatCount(post.repostsCount || 0)}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )) : (
            <div className="text-center py-20 px-4">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">No posts yet</h2>
              <p className="text-neutral-500">Be the first to create a post!</p>
            </div>
          )}
        </div>
      </div>

      {/* Правый блок - детали выбранного поста */}
      <div className="w-[380px] hidden lg:block">
        <div className="sticky top-4">
          {selectedPost ? (
            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-neutral-200 sticky top-0 bg-white/80 backdrop-blur-md">
                <button 
                  onClick={() => setSelectedPost(null)} 
                  className="flex items-center gap-1 text-neutral-500 hover:text-black transition-colors font-medium group"
                >
                  <ChevronLeft size={18} className="transition-transform" />
                  <span>Back</span>
                </button>
              </div>
              <div className="p-5 max-h-[calc(100vh-80px)] overflow-y-auto">
                {/* Автор */}
                <div className="flex items-center gap-3 mb-4">
                  <Link to={`/@${selectedPost.author.username}`}>
                    <img
                      src={selectedPost.author.avatar || `https://ui-avatars.com/api/?name=${selectedPost.author.fullName}&background=000&color=fff&size=48`}
                      alt={selectedPost.author.fullName}
                      className="w-12 h-12 rounded-full"
                    />
                  </Link>
                  <div>
                    <p className="font-bold">
                      {selectedPost.author.fullName}
                    </p>
                    <Link to={`/@${selectedPost.author.username}`} className="hover:underline">
                      <p className="text-neutral-500">@{selectedPost.author.username}</p>
                    </Link>
                  </div>
                </div>

                {/* Контент */}
                <p className="text-lg text-neutral-900 leading-relaxed whitespace-pre-wrap break-words mb-4">
                  {selectedPost.content}
                </p>

                {/* Медиа */}
                {selectedPost.media && selectedPost.media.length > 0 && (
                  <div className="rounded-2xl overflow-hidden border border-neutral-200 mb-4">
                    <img src={selectedPost.media[0]} alt="post media" className="w-full object-cover" />
                  </div>
                )}

                {/* Дата */}
                <div className="text-neutral-500 text-sm mb-4 pb-4 border-b border-neutral-200">
                  {new Date(selectedPost.createdAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>

                {/* Статистика */}
                <div className="flex items-center gap-4 text-sm py-4 border-b border-neutral-200">
                  <span>
                    <span className="font-bold text-neutral-900">{formatCount(selectedPost.repostsCount)}</span>
                    <span className="text-neutral-500 ml-1">Reposts</span>
                  </span>
                  <span>
                    <span className="font-bold text-neutral-900">{formatCount(selectedPost.likesCount)}</span>
                    <span className="text-neutral-500 ml-1">Likes</span>
                  </span>
                </div>

                {/* Кнопки действий */}
                <div className="flex justify-around items-center py-4">
                  <button 
                    onClick={() => handleLike(selectedPost._id)}
                    className={`flex items-center gap-2 transition-colors ${likedPosts.has(selectedPost._id) ? 'text-red-500' : 'text-neutral-500 hover:text-red-500'}`}
                  >
                    <div className="p-2 rounded-full hover:bg-red-50 transition-colors">
                      <Heart size={20} fill={likedPosts.has(selectedPost._id) ? 'currentColor' : 'none'} />
                    </div>
                    <span className="text-sm">Like</span>
                  </button>
                  <button 
                    onClick={() => handleRepost(selectedPost._id)}
                    className={`flex items-center gap-2 transition-colors ${repostedPosts.has(selectedPost._id) ? 'text-green-500' : 'text-neutral-500 hover:text-green-500'}`}
                  >
                    <div className="p-2 rounded-full hover:bg-green-50 transition-colors">
                      <Repeat2 size={20} fill={repostedPosts.has(selectedPost._id) ? 'currentColor' : 'none'} />
                    </div>
                    <span className="text-sm">Repost</span>
                  </button>
                  <button className="flex items-center gap-2 text-neutral-500 hover:text-blue-500 transition-colors">
                    <div className="p-2 rounded-full hover:bg-blue-50 transition-colors">
                      <MessageCircle size={20} />
                    </div>
                    <span className="text-sm">Comment</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-neutral-200 rounded-2xl h-[400px] flex items-center justify-center text-neutral-500">
              <p className="text-center">Select a post to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;