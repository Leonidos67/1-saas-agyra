// pages/UserProfile.tsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, MapPin, Link as LinkIcon, 
  MessageCircle, Repeat2, Heart,
  MoreHorizontal, Share,
  Search, Image, Smile, Send, X,
  Pin,
  Pen,
  Trash,
  Copy,
  Unlink,
  Unlink2
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api/users';
const POSTS_API_URL = 'http://localhost:5000/api/posts';

interface Post {
  _id: string;
  content: string;
  author: {
    _id?: string;
    username: string;
    fullName: string;
    avatar: string;
  };
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  viewsCount: number;
  createdAt: string;
  media: string[];
  isLiked?: boolean;
  isReposted?: boolean;
}

interface UserProfile {
  _id: string;
  username: string;
  fullName: string;
  bio: string;
  avatar: string;
  banner: string;
  location: string;
  website: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  createdAt: string;
  isFollowing: boolean;
}

interface FollowerUser {
  _id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followersCount: number;
}

const UserProfileComponent: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followers, setFollowers] = useState<FollowerUser[]>([]);
  const [following, setFollowing] = useState<FollowerUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'highlights' | 'media'>('posts');
  const [searchFollower, setSearchFollower] = useState('');

  const [newPostContent, setNewPostContent] = useState('');
  const [newPostMedia, setNewPostMedia] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [showPostCreator, setShowPostCreator] = useState(false);

  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [repostedPosts, setRepostedPosts] = useState<Set<string>>(new Set());
  const [menuOpenPostId, setMenuOpenPostId] = useState<string | null>(null);

  // Проверка владельца поста
  const isPostOwner = (post: Post) => {
    if (!user) return false;
    
    // Проверяем все возможные варианты
    if (user.username === post.author.username) return true;
    if (user.id && post.author._id && user.id === post.author._id) return true;
    if ((user as any)._id && post.author._id && (user as any)._id === post.author._id) return true;
    
    // Дополнительно: если это свой профиль и автор поста совпадает с профилем
    if (profile && user.username === profile.username && post.author.username === profile.username) return true;
    
    return false;
  };

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

  const handleLike = async (postId: string) => {
    if (!token) {
      window.dispatchEvent(new CustomEvent('openLogin'));
      return;
    }
    try {
      const res = await fetch(`${POSTS_API_URL}/${postId}/like`, {
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
      const res = await fetch(`${POSTS_API_URL}/${postId}/repost`, {
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

  const handleDeletePost = async (postId: string) => {
    setMenuOpenPostId(null);
    
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    if (!token) return;

    try {
      const res = await fetch(`${POSTS_API_URL}/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete post');
      }

      // Удаляем пост из списка
      setPosts(prev => prev.filter(p => p._id !== postId));
      
      // Обновляем счетчик
      setProfile(prev => prev ? {
        ...prev,
        postsCount: Math.max(0, (prev.postsCount || 1) - 1)
      } : null);
      
    } catch (err: any) {
      console.error('Delete post error:', err);
      alert(err.message || 'Failed to delete post');
    }
  };

  const handleEditPost = async (postId: string, content: string) => {
    setMenuOpenPostId(null);
    
    const newContent = prompt('Edit your post:', content);
    if (!newContent || !newContent.trim() || newContent === content || !token) return;

    try {
      const res = await fetch(`${POSTS_API_URL}/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newContent.trim() })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to update post');
      }

      const updatedPost = await res.json();
      
      // Обновляем пост в списке
      setPosts(prev => prev.map(p => 
        p._id === postId ? updatedPost : p
      ));
      
    } catch (err: any) {
      console.error('Edit post error:', err);
      alert(err.message || 'Failed to edit post');
    }
  };

  const fetchProfile = useCallback(async (cleanUsername: string) => {
    if (!cleanUsername || cleanUsername === 'undefined') return;
    try {
      setLoading(true);
      setError(null);
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      
      const res = await fetch(`${API_URL}/${cleanUsername}`, { headers });
      if (!res.ok) {
        setError(res.status === 404 ? 'User not found' : 'Failed to load profile');
        setLoading(false);
        return;
      }
      const data = await res.json();
      
      setProfile(data);
      setPosts(data.posts || []);
      setIsFollowing(data.isFollowing === true);
      
      // Загружаем начальное состояние лайков и репостов
      const likedIds = new Set<string>();
      const repostedIds = new Set<string>();
      
      (data.posts || []).forEach((post: any) => {
        if (post.isLiked) likedIds.add(post._id);
        if (post.isReposted) repostedIds.add(post._id);
      });
      
      setLikedPosts(likedIds);
      setRepostedPosts(repostedIds);
      
    } catch (err) {
      console.error('Fetch profile error:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchFollowers = useCallback(async (cleanUsername: string) => {
    if (!cleanUsername || cleanUsername === 'undefined') return;
    try {
      const res = await fetch(`${API_URL}/${cleanUsername}/followers`);
      if (res.ok) {
        const data = await res.json();
        setFollowers(data.followers || []);
      }
    } catch (err) {
      console.error('Fetch followers error:', err);
    }
  }, []);

  const fetchFollowing = useCallback(async (cleanUsername: string) => {
    if (!cleanUsername || cleanUsername === 'undefined') return;
    try {
      const res = await fetch(`${API_URL}/${cleanUsername}/following`);
      if (res.ok) {
        const data = await res.json();
        setFollowing(data.following || []);
      }
    } catch (err) {
      console.error('Fetch following error:', err);
    }
  }, []);

  useEffect(() => {
    const cleanUsername = username?.startsWith('@') ? username.substring(1) : username;
    if (cleanUsername && cleanUsername !== 'undefined') {
      fetchProfile(cleanUsername);
      fetchFollowers(cleanUsername);
      fetchFollowing(cleanUsername);
    }
  }, [username, fetchProfile, fetchFollowers, fetchFollowing]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [newPostContent]);

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !token || isPosting) return;
    try {
      setIsPosting(true);
      const res = await fetch(POSTS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newPostContent, media: newPostMedia })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create post');
      }
      const newPost = await res.json();
      
      console.log('New post created:', newPost); // Проверь что author заполнен
      
      setPosts(prev => [newPost, ...prev]);
      setProfile(prev => prev ? { ...prev, postsCount: (prev.postsCount || 0) + 1 } : null);
      setNewPostContent('');
      setNewPostMedia([]);
      setShowPostCreator(false);
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

  const handleFollow = async () => {
    if (!token) { window.dispatchEvent(new CustomEvent('openLogin')); return; }
    if (!profile) return;
    try {
      setFollowLoading(true);
      const action = isFollowing ? 'unfollow' : 'follow';
      const res = await fetch(`${API_URL}/${profile.username}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.message?.includes('Already following')) {
          setIsFollowing(true);
          if (data.followersCount !== undefined) setProfile(prev => prev ? { ...prev, followersCount: data.followersCount } : null);
          return;
        }
        if (data.message?.includes('Not following')) {
          setIsFollowing(false);
          if (data.followersCount !== undefined) setProfile(prev => prev ? { ...prev, followersCount: data.followersCount } : null);
          return;
        }
        throw new Error(data.message || 'Failed');
      }
      const newIsFollowing = action === 'follow';
      setIsFollowing(newIsFollowing);
      if (data.followersCount !== undefined) {
        setProfile(prev => prev ? { ...prev, followersCount: data.followersCount, isFollowing: newIsFollowing } : null);
      }
      const cleanUsername = username?.startsWith('@') ? username.substring(1) : username;
      if (cleanUsername) fetchFollowers(cleanUsername);
    } catch (err: any) {
      console.error('Follow error:', err);
      const cleanUsername = username?.startsWith('@') ? username.substring(1) : username;
      if (cleanUsername) fetchProfile(cleanUsername);
    } finally {
      setFollowLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
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

  const filteredFollowers = followers.filter(f => 
    f.fullName?.toLowerCase().includes(searchFollower.toLowerCase()) ||
    f.username?.toLowerCase().includes(searchFollower.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-neutral-300 border-t-black"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-xl text-neutral-500 mb-4">{error || 'Profile not found'}</p>
        <button onClick={() => navigate('/')} className="px-4 py-2 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors">Back to Home</button>
      </div>
    );
  }

  const isOwnProfile = user?.username === profile.username;

  return (
    <div className="flex gap-6 max-w-[1200px] mx-auto px-0 py-0">
      <div className="flex-1 max-w-[600px] border-x border-neutral-200 min-h-screen">
        {/* Profile Info */}
        <div className="px-4 pb-4 mt-4">
          <div className="flex justify-between items-start">
            <div className="relative">
              <img 
                src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.fullName}&background=000&color=fff&size=140&bold=true`}
                alt={profile.fullName}
                className="w-[80px] h-[80px] rounded-full border-4 border-white bg-white"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${profile.fullName}&background=000&color=fff&size=140&bold=true`; }}
              />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold">{profile.fullName}</h1>
            <p className="text-neutral-500">@{profile.username}</p>
          </div>
          <div className="flex gap-2 mt-2">
            {isOwnProfile ? (
              <button onClick={() => navigate('/settings')} className="px-5 py-2 border border-neutral-300 hover:bg-neutral-100 text-neutral-900 rounded-full font-semibold text-sm transition-colors">Edit profile</button>
            ) : (
              <>
                <button onClick={handleFollow} disabled={followLoading}
                  className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${isFollowing ? 'bg-white border border-neutral-300 text-neutral-900 hover:border-red-300 hover:text-red-600 hover:bg-red-50' : 'bg-black text-white hover:bg-neutral-800'} ${followLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {followLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className="p-2 border border-neutral-300 hover:bg-neutral-100 rounded-full transition-colors"><MessageCircle size={18} /></button>
                <button className="p-2 border border-neutral-300 hover:bg-neutral-100 rounded-full transition-colors"><MoreHorizontal size={18} /></button>
              </>
            )}
          </div>
          {profile.bio && <p className="mt-3 text-neutral-900 leading-relaxed">{profile.bio}</p>}
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-neutral-500">
            {profile.location && (<div className="flex items-center gap-1"><MapPin size={16} /><span>{profile.location}</span></div>)}
            {profile.website && (<div className="flex items-center gap-1"><LinkIcon size={16} /><a href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{profile.website.replace(/^https?:\/\//, '')}</a></div>)}
          </div>
          <div className="flex gap-5 mb-2 text-md">
            <button className="hover:underline"><span className="font-bold text-neutral-900">{formatCount(profile.followingCount || 0)}</span><span className="text-neutral-500 ml-1">Following</span></button>
            <button className="hover:underline"><span className="font-bold text-neutral-900">{formatCount(profile.followersCount || 0)}</span><span className="text-neutral-500 ml-1">Followers</span></button>
          </div>
          <div className="flex text-sm items-center gap-1"><Calendar size={14} /><span>Joined {formatDate(profile.createdAt)}</span></div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200">
          {[{ id: 'posts', label: 'Posts' }, { id: 'replies', label: 'Replies' }, { id: 'highlights', label: 'Highlights' }, { id: 'media', label: 'Media' }].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 text-sm font-medium text-center hover:bg-neutral-50 transition-colors relative ${activeTab === tab.id ? 'text-neutral-900 bg-neutral-50' : 'text-neutral-500'}`}>
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-14 h-0.5 bg-black rounded-full" />}
            </button>
          ))}
        </div>

        {/* Post Creator */}
        {isOwnProfile && activeTab === 'posts' && (
          <div className="p-4 border-b bg-neutral-50 border-neutral-200">
            {!showPostCreator ? (
              <button onClick={() => setShowPostCreator(true)} className="w-full text-left px-4 py-3 text-neutral-500 hover:bg-neutral-100 rounded-xl transition-colors">What's on your mind?</button>
            ) : (
              <div>
                <div className="flex gap-3">
                  <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName}&background=000&color=fff&size=40&bold=true`} alt="" className="w-10 h-10 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <textarea ref={textareaRef} value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="What's on your mind?" className="w-full resize-none outline-none text-neutral-900 bg-neutral-50 placeholder:text-neutral-500 min-h-[100px]" maxLength={2000} autoFocus />
                    {newPostMedia.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {newPostMedia.map((url, index) => (
                          <div key={index} className="relative">
                            <img src={url} alt={`media-${index}`} className="w-20 h-20 object-cover rounded-xl" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            <button onClick={() => handleRemoveMedia(index)} className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 hover:bg-neutral-800"><X size={12} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-200">
                      <div className="flex items-center gap-2">
                        <button onClick={handleAddMedia} className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500"><Image size={18} /></button>
                        <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500"><Smile size={18} /></button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setShowPostCreator(false); setNewPostContent(''); setNewPostMedia([]); }} className="px-4 py-2 rounded-full text-sm font-semibold hover:bg-neutral-100 transition-colors">Cancel</button>
                        <button onClick={handleCreatePost} disabled={!newPostContent.trim() || isPosting}
                          className="px-5 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                          {isPosting ? (<><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>Posting...</>) : (<><Send size={16} />Post</>)}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Posts */}
        {activeTab === 'posts' && (
          <div>
            {posts.length > 0 ? posts.map(post => (
              <article key={post._id} className="p-4 hover:bg-neutral-50 transition-colors border-b border-neutral-200 group/article">
                <div className="flex space-x-3" onClick={() => navigate(`/post/${post._id}`)}>
                  <img src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.fullName}&background=000&color=fff&size=40&bold=true`}
                    alt={post.author.fullName} className="w-10 h-10 rounded-full hover:opacity-90 transition-opacity cursor-pointer" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 flex-wrap">
                      <Link to={`/@${post.author.username}`} className="font-bold hover:underline truncate" onClick={(e) => e.stopPropagation()}>{post.author.fullName}</Link>
                      <span className="text-neutral-500 truncate">@{post.author.username}</span>
                      <span className="text-neutral-500">·</span>
                      <span className="text-neutral-500 whitespace-nowrap">{formatPostDate(post.createdAt)}</span>
                      
                      <div className="ml-auto relative" ref={menuOpenPostId === post._id ? menuRef : null}>
                        <button onClick={(e) => { e.stopPropagation(); setMenuOpenPostId(menuOpenPostId === post._id ? null : post._id); }}
                          className={`p-1 rounded-full transition-all ${menuOpenPostId === post._id ? 'bg-black/10 text-black opacity-100' : 'text-neutral-500 opacity-0 group-hover/article:opacity-100 hover:bg-black/5'}`}>
                          <MoreHorizontal size={16} />
                        </button>
                        {/* Выпадающее меню */}
                        {menuOpenPostId === post._id && (
                          <div 
                            className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg border border-neutral-200 p-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => {
                                copyPostLink(post._id);
                                setMenuOpenPostId(null);
                              }}
                              className="w-full text-left py-1 px-3 text-[14px] rounded hover:bg-black/5 transition-colors flex items-center gap-2"
                            >
                              <Unlink2 className='h-3 w-3' />
                              Copy link
                            </button>

                            {isPostOwner(post) && (
                              <>
                                <button
                                  onClick={() => handleEditPost(post._id, post.content)}
                                  className="w-full text-left py-1 px-3 text-[14px] rounded hover:bg-black/5 transition-colors flex items-center gap-2"
                                >
                                  <Pen className='h-3 w-3' />
                                  Edit
                                </button>
                                
                                <div className="h-px bg-neutral-100 my-1"></div>

                                <button
                                  onClick={() => handleDeletePost(post._id)}
                                  className="w-full text-left px-3 py-1 text-[14px] rounded hover:bg-red-50 transition-colors flex items-center gap-2 text-red-600"
                                >
                                  <Trash className='h-3 w-3' />
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="mt-1 text-neutral-900 leading-relaxed whitespace-pre-wrap break-words">{post.content}</p>
                    {post.media && post.media.length > 0 && (
                      <div className="mt-3 rounded-2xl overflow-hidden border border-neutral-200">
                        <img src={post.media[0]} alt="post media" className="w-full max-h-96 object-cover" />
                      </div>
                    )}
                    <div className="flex items-center gap-1 mt-3 max-w-md">
                      <button onClick={(e) => { e.stopPropagation(); navigate(`/post/${post._id}`); }} className="flex items-center gap-1 text-neutral-500 hover:text-blue-500 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors"><MessageCircle size={18} /></div>
                        <span className="text-sm">{formatCount(post.commentsCount || 0)}</span>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleRepost(post._id); }}
                        className={`flex items-center gap-1 transition-colors group ${repostedPosts.has(post._id) ? 'text-green-500' : 'text-neutral-500 hover:text-green-500'}`}>
                        <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors"><Repeat2 size={18} fill={repostedPosts.has(post._id) ? 'currentColor' : 'none'} /></div>
                        <span className="text-sm">{formatCount(post.repostsCount || 0)}</span>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleLike(post._id); }}
                        className={`flex items-center gap-1 transition-colors group ${likedPosts.has(post._id) ? 'text-red-500' : 'text-neutral-500 hover:text-red-500'}`}>
                        <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors"><Heart size={18} fill={likedPosts.has(post._id) ? 'currentColor' : 'none'} /></div>
                        <span className="text-sm">{formatCount(post.likesCount || 0)}</span>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); copyPostLink(post._id); }} className="flex items-center gap-1 text-neutral-500 hover:text-blue-500 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors"><Share size={18} /></div>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )) : (
              <div className="text-center py-20 px-4"><h2 className="text-2xl font-bold text-neutral-900 mb-2">No posts yet</h2><p className="text-neutral-500">When @{profile.username} posts, those posts will show up here.</p></div>
            )}
          </div>
        )}
        {activeTab !== 'posts' && (
          <div className="text-center py-20 px-4"><h2 className="text-2xl font-bold text-neutral-900 mb-2">No {activeTab} yet</h2><p className="text-neutral-500">When @{profile.username} has {activeTab}, they'll show up here.</p></div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-[350px] flex-shrink-0">
        <div className="sticky top-4 space-y-4">
          <div className="bg-neutral-50 rounded-2xl p-4">
            <h2 className="text-xl font-bold mb-4">Followers ({followers.length})</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input type="text" value={searchFollower} onChange={(e) => setSearchFollower(e.target.value)} placeholder="Search followers..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-all" />
            </div>
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {filteredFollowers.length > 0 ? filteredFollowers.map(follower => (
                <Link key={follower._id || follower.username} to={`/@${follower.username}`} className="flex items-center justify-between p-3 hover:bg-white rounded-xl transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={follower.avatar || `https://ui-avatars.com/api/?name=${follower.fullName || follower.username}&background=000&color=fff&size=40&bold=true`}
                      alt={follower.fullName || follower.username} className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm truncate group-hover:underline">{follower.fullName || follower.username}</p>
                      <p className="text-sm text-neutral-500 truncate">@{follower.username}</p>
                    </div>
                  </div>
                  {user?.username !== follower.username && (
                    <button className="px-4 py-1.5 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors flex-shrink-0 ml-2">Follow</button>
                  )}
                </Link>
              )) : (
                <div className="text-center py-8"><p className="text-neutral-500 text-sm">{searchFollower ? 'No followers found' : 'No followers yet'}</p></div>
              )}
            </div>
          </div>
          <div className="bg-neutral-50 rounded-2xl p-4">
            <h2 className="text-xl font-bold mb-4">Following ({following.length})</h2>
            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              {following.length > 0 ? following.slice(0, 5).map(follow => (
                <Link key={follow._id || follow.username} to={`/@${follow.username}`} className="flex items-center justify-between p-3 hover:bg-white rounded-xl transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={follow.avatar || `https://ui-avatars.com/api/?name=${follow.fullName || follow.username}&background=000&color=fff&size=40&bold=true`}
                      alt={follow.fullName || follow.username} className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm truncate group-hover:underline">{follow.fullName || follow.username}</p>
                      <p className="text-sm text-neutral-500 truncate">@{follow.username}</p>
                    </div>
                  </div>
                </Link>
              )) : (
                <div className="text-center py-8"><p className="text-neutral-500 text-sm">Not following anyone yet</p></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileComponent;