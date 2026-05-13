// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');

// POST /api/posts - Создать пост
router.post('/', auth, async (req, res) => {
  try {
    const { content, media } = req.body;
    const authorId = req.userId.toString(); // КОНВЕРТИРУЕМ В СТРОКУ

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Content is required' });
    }

    // Находим автора
    const author = await User.findById(authorId).select('username fullName avatar');
    
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const post = new Post({
      author: authorId, // СОХРАНЯЕМ КАК СТРОКУ
      content: content.trim(),
      media: media || []
    });

    await post.save();

    // Возвращаем пост с заполненным автором
    const postData = {
      _id: post._id,
      content: post.content,
      author: {
        _id: author._id.toString(),
        username: author.username,
        fullName: author.fullName || author.username,
        avatar: author.avatar || ''
      },
      media: post.media || [],
      likesCount: 0,
      commentsCount: 0,
      repostsCount: 0,
      viewsCount: 0,
      createdAt: post.createdAt,
      isLiked: false,
      isReposted: false
    };

    console.log('Post created with author:', postData.author);

    res.status(201).json(postData);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/posts/:id - Получить конкретный пост
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username fullName avatar followersCount');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Добавляем просмотр
    const userId = req.userId || req.query.viewer;
    if (userId) {
      await post.addView(userId);
    }

    const postData = {
      ...post.toJSON(),
      isLiked: req.userId ? post.likes.includes(req.userId) : false,
      isReposted: req.userId ? post.reposts.includes(req.userId) : false,
      isBookmarked: req.userId ? post.bookmarks.includes(req.userId) : false
    };

    res.json(postData);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/posts/:id - Обновить пост
router.put('/:id', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;
    const userId = req.userId.toString();

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Проверяем что пользователь - автор поста
    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to edit this post' });
    }

    post.content = content.trim();
    await post.save();

    // Возвращаем обновленный пост с автором
    const author = await User.findById(userId).select('username fullName avatar');
    
    const updatedPost = {
      _id: post._id,
      content: post.content,
      author: author ? {
        _id: author._id.toString(),
        username: author.username,
        fullName: author.fullName || author.username,
        avatar: author.avatar || ''
      } : null,
      media: post.media || [],
      likesCount: post.likesCount || 0,
      commentsCount: post.commentsCount || 0,
      repostsCount: post.repostsCount || 0,
      viewsCount: post.viewsCount || 0,
      createdAt: post.createdAt,
      isLiked: post.likes.includes(userId),
      isReposted: post.reposts.includes(userId)
    };

    res.json(updatedPost);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/posts/:id/like - Лайкнуть/анлайкнуть пост
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const liked = await post.toggleLike(req.userId);
    
    // Обновляем populated post
    const updatedPost = await Post.findById(post._id)
      .populate('author', 'username fullName avatar');

    const postData = {
      ...updatedPost.toJSON(),
      isLiked: liked,
      isReposted: req.userId ? updatedPost.reposts.includes(req.userId) : false,
      isBookmarked: req.userId ? updatedPost.bookmarks.includes(req.userId) : false
    };

    res.json({ 
      liked,
      likesCount: post.likesCount,
      post: postData
    });
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/posts/:id/repost - Репостнуть
router.post('/:id/repost', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const index = post.reposts.indexOf(req.userId);
    if (index === -1) {
      post.reposts.push(req.userId);
      post.repostsCount = post.reposts.length;
    } else {
      post.reposts.splice(index, 1);
      post.repostsCount = post.reposts.length;
    }
    
    await post.save();

    res.json({ 
      reposted: index === -1,
      repostsCount: post.repostsCount
    });
  } catch (error) {
    console.error('Repost error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/posts/:id/bookmark - В закладки
router.post('/:id/bookmark', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const index = post.bookmarks.indexOf(req.userId);
    if (index === -1) {
      post.bookmarks.push(req.userId);
    } else {
      post.bookmarks.splice(index, 1);
    }
    post.bookmarksCount = post.bookmarks.length;
    await post.save();

    res.json({ 
      bookmarked: index === -1,
      bookmarksCount: post.bookmarksCount
    });
  } catch (error) {
    console.error('Bookmark error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/posts - Получить все посты
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('author', 'username fullName avatar');

    const postsData = posts.map(post => ({
      ...post.toJSON(),
      isLiked: req.userId ? post.likes.includes(req.userId) : false,
      isReposted: req.userId ? post.reposts.includes(req.userId) : false,
      isBookmarked: req.userId ? post.bookmarks.includes(req.userId) : false
    }));

    res.json(postsData);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/posts/:id - Удалить пост
router.delete('/:id', auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId.toString();

    console.log('DELETE post:', postId, 'by user:', userId);

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Проверяем что пользователь - автор поста
    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(postId);

    // Обновляем счетчик постов у пользователя
    await User.findByIdAndUpdate(userId, {
      $inc: { postsCount: -1 }
    });

    console.log('Post deleted successfully');

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;