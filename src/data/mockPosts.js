import { getMockUserById } from './mockUsers'

export const fascinatingCatsContent = `Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string, these furry companions bring warmth and joy to millions of homes. But what makes cats so special? Let’s dive into the unique traits, behaviors, and quirks that make cats endlessly fascinating.

1. Independent Yet Affectionate

One of the most remarkable traits of cats is their balance between independence and affection. Unlike dogs, who are often eager for constant attention, cats enjoy their alone time. They can spend hours grooming themselves, exploring the house, or napping in quiet corners. However, when they want affection, they know how to seek it out with a soft purr, a gentle nuzzle, or by curling up on your lap.

This duality makes cats appealing to many people who appreciate the fact that their feline companions are low-maintenance but still loving. It’s like having a roommate who enjoys your company but doesn’t demand too much of your time!

2. Playful Personalities

Cats are naturally curious and playful. From kittens to adults, they enjoy engaging with toys, climbing furniture, or chasing after imaginary prey. Their play often mimics hunting behavior, which is a nod to their wild ancestors. Whether they’re pouncing on a feather toy or darting across the room after a laser pointer, their agility and energy are mesmerizing to watch.

This playfulness also serves as mental stimulation for cats. Providing toys and opportunities to climb or explore helps them stay active and reduces boredom, which is important for indoor cats.
3. Communication Through Body Language
Cats are master communicators, though they do so in subtle ways. Understanding a cat's body language can deepen the bond between you and your pet. Here are some common signals:

Purring: Usually a sign of contentment, though cats may also purr when anxious or in pain.
Tail Position: A tail held high usually indicates a happy and confident cat, while a puffed-up tail suggests fear or aggression.
Slow Blinks: Cats often use slow blinking as a way to express trust and affection. If your cat slow blinks at you, try returning the gesture to strengthen your bond.

Learning to read these cues can help you respond to your cat’s needs and emotions more effectively.

4. Health Benefits of Having a Cat

Did you know that owning a cat can be good for your health? Studies have shown that petting a cat can reduce stress and lower blood pressure. The calming sound of a cat’s purr is often associated with relaxation and well-being. Additionally, the companionship of a cat can help combat loneliness, providing emotional support to their owners.

People who live with cats may also experience reduced feelings of anxiety and depression, thanks to the comfort and companionship these animals provide.

5. A History with Humans

Cats were first domesticated in the Near East around 9,000 years ago, likely because they were excellent at catching rodents that threatened food supplies. Over time, their relationship with humans evolved from pest control to companionship.

In ancient Egypt, cats were revered and even worshipped. Killing a cat, even accidentally, was punishable by death, and families often mummified their cats to honor them after death. Today, while not seen as divine figures, cats remain cherished members of the family.`

export const mockCategories = [
  { id: 1, name: 'Cat' },
  { id: 2, name: 'Inspiration' },
  { id: 3, name: 'General' },
]

const rawMockPosts = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
    category: 'Cat',
    title:
      'Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do',
    description:
      'Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey. This article helps you decode your feline friend\'s actions.',
    authorId: 2,
    date: '2024-09-11',
    content:
      'Cats communicate in many ways—some are obvious, and some are subtle.\n\nIn this article, we break down common behaviors like kneading, purring, and zoomies. You’ll learn what each behavior can mean and how to respond with patience.\n\nWhether you’re a new cat owner or an experienced caregiver, this guide will help you understand your feline friend a little better.',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop',
    category: 'Cat',
    title: 'The Fascinating World of Cats: Why We Love Them',
    description:
      'Cats have captivated human hearts for thousands of years. From their graceful movements to their playful antics, discover what makes these enigmatic creatures so irresistible.',
    authorId: 2,
    date: '2024-09-10',
    content: fascinatingCatsContent,
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&h=600&fit=crop',
    category: 'Inspiration',
    title: 'Finding Motivation: Tips for Overcoming Procrastination',
    description:
      'Procrastination is a common challenge that can hinder productivity and personal growth. Learn practical strategies to break the cycle and stay motivated.',
    authorId: 2,
    date: '2024-09-09',
    content:
      'Procrastination rarely comes from laziness. Most of the time, it’s fear—fear of starting, fear of failing, or fear of not doing it perfectly.\n\nTry smaller steps: define a “first action” that takes less than five minutes. Then make momentum your goal.\n\nOver time, motivation becomes a habit, not a mood.',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800&h=600&fit=crop',
    category: 'Cat',
    title: "The Science of the Cat's Purr: How It Benefits Cats and Humans Alike",
    description:
      "Explore the fascinating science behind a cat's purr, from its healing properties to the emotional bond it creates between cats and their human companions.",
    authorId: 2,
    date: '2024-09-08',
    content:
      "A cat’s purr is more than a cute sound. Researchers have studied purring patterns and connected them to relaxation and stress reduction.\n\nIn this article, we explore what a purr might signal, how to tell when it’s a comfort purr vs. a “something feels off” purr, and why the bond matters.\n\nIf you want a calmer routine, start by noticing the small cues your cat gives every day.",
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800&h=600&fit=crop',
    category: 'General',
    title: 'Creating a Cozy Home for Your Cat: Tips and Tricks',
    description:
      'Transform your living space into a cat-friendly haven. From choosing the right furniture to setting up cozy nooks, make your home the perfect environment for your feline friend.',
    authorId: 2,
    date: '2024-09-07',
    content:
      'A cozy home doesn’t need to be complicated. It needs to feel safe, predictable, and enriching.\n\nStart with warm spots, vertical spaces, and a few “choice points” where your cat can decide what they want to do next.\n\nThen add interactive toys and comfortable resting areas—your cat will discover their favorite rhythm in no time.',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
    category: 'Inspiration',
    title: 'Embracing Change: How to Thrive in Times of Transition',
    description:
      'Change is inevitable, but it doesn\'t have to be overwhelming. Discover how to navigate life\'s transitions with confidence and turn challenges into opportunities for growth.',
    authorId: 2,
    date: '2024-09-06',
    content:
      'Transitions can feel uncomfortable—but they’re also opportunities to rebuild.\n\nInstead of trying to “control everything,” focus on what you can influence today: your habits, your environment, and your mindset.\n\nWhen you treat change as a new chapter, growth becomes natural rather than forced.',
  },
]

function hydratePost(post) {
  const author = getMockUserById(post.authorId)

  return {
    ...post,
    author: author?.name || 'Unknown author',
    authorAvatar: author?.profilePic || '/author-image.jpeg',
    authorBio: author?.bio || [],
  }
}

function hydrateComment(comment) {
  const user = getMockUserById(comment.userId)

  return {
    ...comment,
    name: user?.name || 'Anonymous',
    profile_pic: user?.profilePic || '/author-image.jpeg',
  }
}

export const mockPosts = rawMockPosts.map(hydratePost)

export function getMockPostsByCategory(category, page = 1, limit = 6) {
  const filtered =
    category === 'Highlight'
      ? mockPosts
      : mockPosts.filter((post) => post.category === category)

  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return {
    posts: paginated,
    currentPage: page,
    totalPages: Math.ceil(filtered.length / limit) || 1,
  }
}

export function searchMockPosts(keyword) {
  const lower = keyword.toLowerCase()
  return mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lower) ||
      post.description.toLowerCase().includes(lower) ||
      post.category.toLowerCase().includes(lower),
  )
}

export function getMockPostById(id) {
  const numericId = typeof id === 'string' ? Number(id) : id
  return mockPosts.find((p) => p.id === numericId) || null
}

export const mockLikesByPostId = {
  1: 128,
  2: 84,
  3: 63,
  4: 91,
  5: 73,
  6: 57,
}

const rawMockCommentsByPostId = {
  1: [
    {
      id: 101,
      userId: 4,
      comment_text:
        'This explains my cat perfectly. The “purr during kneading” part was super helpful!',
      created_at: '2024-09-11T10:30:00Z',
    },
    {
      id: 102,
      userId: 5,
      comment_text:
        'I never connected zoomies with stress relief. Great breakdown and easy to follow.',
      created_at: '2024-09-11T14:15:00Z',
    },
    {
      id: 103,
      userId: 6,
      comment_text:
        'Love the tone. I shared this with my friend who just adopted a kitten.',
      created_at: '2024-09-12T09:00:00Z',
    },
  ],
  2: [
    {
      id: 201,
      userId: 3,
      comment_text:
        'I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.',
      created_at: '2024-09-12T18:30:00Z',
    },
    {
      id: 202,
      userId: 8,
      comment_text:
        'The section about gentle routines helped a lot. My cat seems calmer now.',
      created_at: '2024-09-10T16:45:00Z',
    },
  ],
  3: [
    {
      id: 301,
      userId: 9,
      comment_text:
        '“First action under five minutes” is exactly what I needed today.',
      created_at: '2024-09-09T08:30:00Z',
    },
    {
      id: 302,
      userId: 10,
      comment_text:
        'Good reminder that motivation is a habit. I’m trying this step-by-step.',
      created_at: '2024-09-09T13:10:00Z',
    },
  ],
  4: [
    {
      id: 401,
      userId: 11,
      comment_text:
        'The difference between comfort purr and “something feels off” is eye-opening.',
      created_at: '2024-09-08T12:00:00Z',
    },
    {
      id: 402,
      userId: 12,
      comment_text:
        'Beautifully written. I love how you connect science with daily care.',
      created_at: '2024-09-08T17:30:00Z',
    },
  ],
  5: [
    {
      id: 501,
      userId: 13,
      comment_text:
        'I added vertical spaces and my cat immediately found new favorites.',
      created_at: '2024-09-07T10:15:00Z',
    },
    {
      id: 502,
      userId: 14,
      comment_text:
        'Choice points are such a good idea. Thanks for the practical tips!',
      created_at: '2024-09-07T15:40:00Z',
    },
  ],
  6: [
    {
      id: 601,
      userId: 15,
      comment_text:
        'This reads like a pep talk. “Treat change as a new chapter” really hits.',
      created_at: '2024-09-06T09:50:00Z',
    },
    {
      id: 602,
      userId: 16,
      comment_text:
        'Focus on what you can influence today is a great approach. Saved!',
      created_at: '2024-09-06T18:20:00Z',
    },
  ],
}

export const mockCommentsByPostId = Object.fromEntries(
  Object.entries(rawMockCommentsByPostId).map(([postId, comments]) => [
    postId,
    comments.map(hydrateComment),
  ]),
)

export function getMockLikesAmount(postId) {
  const numericId = typeof postId === 'string' ? Number(postId) : postId
  return mockLikesByPostId[numericId] || 0
}

export function getMockCommentsByPostId(postId) {
  const numericId = typeof postId === 'string' ? Number(postId) : postId
  return mockCommentsByPostId[numericId] || []
}
