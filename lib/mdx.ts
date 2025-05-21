export type BlogStatus = "pending" | "approved" | "rejected"

export interface Post {
  id: string
  slug: string
  title: string
  date: string
  coverImage: string
  excerpt: string
  category: string
  readingTime: string
  content: string
  status: BlogStatus
  authorId: string
}

// Mock data for trading-related blog posts
const tradingPosts: Post[] = [
  {
    id: "post_1",
    slug: "day-trading-strategies",
    title: "5 Effective Day Trading Strategies for Beginners",
    date: "2023-05-15",
    coverImage: "/placeholder.svg?height=300&width=500",
    excerpt:
      "Learn the most effective day trading strategies that can help beginners navigate the volatile markets with confidence.",
    category: "TRADING STRATEGIES",
    readingTime: "5 MIN READ",
    content:
      "# 5 Effective Day Trading Strategies for Beginners\n\nDay trading requires discipline, focus, and a solid strategy. Here are five effective approaches for beginners:\n\n## 1. Trend Following\n\nThis strategy involves identifying the direction of market momentum and entering trades that align with that direction.\n\n## 2. Breakout Trading\n\nBreakout traders capitalize on moments when price moves outside an established range with increased volume.\n\n## 3. Reversal Trading\n\nThis approach focuses on identifying when a trend is about to change direction and positioning accordingly.\n\n## 4. Gap and Go\n\nThis strategy targets stocks that gap up or down at market open, entering in the direction of the gap.\n\n## 5. Scalping\n\nScalping involves making numerous trades throughout the day, aiming to profit from small price movements.",
    status: "approved",
    authorId: "user_123",
  },
  {
    id: "post_2",
    slug: "technical-analysis-basics",
    title: "Technical Analysis Fundamentals Every Trader Should Know",
    date: "2023-06-20",
    coverImage: "/placeholder.svg?height=300&width=500",
    excerpt:
      "Master the essential technical analysis tools and indicators that form the foundation of successful trading strategies.",
    category: "TECHNICAL ANALYSIS",
    readingTime: "7 MIN READ",
    content:
      "# Technical Analysis Fundamentals Every Trader Should Know\n\nTechnical analysis is a trading discipline that evaluates investments and identifies trading opportunities by analyzing statistical trends gathered from trading activity.\n\n## Support and Resistance\n\nThese are price levels where a stock has historically had difficulty falling below (support) or rising above (resistance).\n\n## Moving Averages\n\nMoving averages smooth out price data to create a single flowing line, making it easier to identify the direction of the trend.\n\n## Relative Strength Index (RSI)\n\nRSI is a momentum oscillator that measures the speed and change of price movements on a scale from 0 to 100.\n\n## MACD (Moving Average Convergence Divergence)\n\nMACD is a trend-following momentum indicator that shows the relationship between two moving averages of a security's price.\n\n## Candlestick Patterns\n\nCandlestick patterns are visual representations of price movements that can indicate potential market reversals or continuations.",
    status: "approved",
    authorId: "user_123",
  },
  {
    id: "post_3",
    slug: "risk-management-trading",
    title: "Risk Management: The Key to Long-Term Trading Success",
    date: "2023-07-10",
    coverImage: "/placeholder.svg?height=300&width=500",
    excerpt:
      "Discover why proper risk management is more important than any trading strategy and how to implement it effectively.",
    category: "RISK MANAGEMENT",
    readingTime: "6 MIN READ",
    content:
      "# Risk Management: The Key to Long-Term Trading Success\n\nRisk management is arguably the most important component of a trading plan. Without it, even the best strategy will eventually fail.\n\n## Position Sizing\n\nDetermining the appropriate amount of capital to allocate to each trade is crucial for managing risk effectively.\n\n## Stop-Loss Orders\n\nA stop-loss order is a predetermined price at which you'll exit a losing trade to prevent further losses.\n\n## Risk-Reward Ratio\n\nThe risk-reward ratio compares the potential profit of a trade to its potential loss. A favorable ratio is typically 1:2 or higher.\n\n## Diversification\n\nSpreading your capital across different markets, sectors, or strategies can help reduce overall portfolio risk.\n\n## Psychological Discipline\n\nMaintaining emotional control and sticking to your trading plan is essential for consistent risk management.",
    status: "approved",
    authorId: "user_123",
  },
  {
    id: "post_4",
    slug: "swing-trading-guide",
    title: "Complete Guide to Swing Trading in Volatile Markets",
    date: "2023-08-05",
    coverImage: "/placeholder.svg?height=300&width=500",
    excerpt:
      "Learn how to capture medium-term market moves with swing trading strategies designed for today's volatile markets.",
    category: "SWING TRADING",
    readingTime: "8 MIN READ",
    content:
      "# Complete Guide to Swing Trading in Volatile Markets\n\nSwing trading aims to capture gains in a stock within one to several days. It's ideal for those who can't monitor trades all day.\n\n## Identifying Swing Trading Opportunities\n\nLook for stocks showing strong momentum but approaching key support or resistance levels where a reversal might occur.\n\n## Technical Indicators for Swing Trading\n\nEffective indicators include moving averages, RSI, MACD, and Bollinger Bands to identify potential entry and exit points.\n\n## Fundamental Considerations\n\nWhile primarily technical, swing traders should be aware of upcoming earnings reports, economic data releases, or other events that could impact price.\n\n## Setting Profit Targets\n\nEstablish realistic profit targets based on previous price action, volatility, and key resistance/support levels.\n\n## Managing Volatility\n\nIn highly volatile markets, consider reducing position sizes and widening stop-loss orders to avoid being shaken out of otherwise good trades.",
    status: "approved",
    authorId: "user_123",
  },
  {
    id: "post_5",
    slug: "trading-psychology",
    title: "Trading Psychology: Overcoming Fear and Greed",
    date: "2023-09-12",
    coverImage: "/placeholder.svg?height=300&width=500",
    excerpt:
      "Explore the psychological aspects of trading and learn techniques to master your emotions for better trading outcomes.",
    category: "PSYCHOLOGY",
    readingTime: "6 MIN READ",
    content:
      "# Trading Psychology: Overcoming Fear and Greed\n\nTrading psychology refers to the emotions and mental state that influence your trading decisions. The two primary emotions that impact traders are fear and greed.\n\n## Understanding Fear in Trading\n\nFear can manifest as hesitation to enter trades, exiting profitable positions too early, or inability to cut losses when necessary.\n\n## The Impact of Greed\n\nGreed often leads to overtrading, excessive risk-taking, and holding positions too long in hopes of extracting maximum profit.\n\n## Developing Emotional Discipline\n\nCreating and following a detailed trading plan helps remove emotional decision-making from the equation.\n\n## Mindfulness Techniques\n\nPracticing mindfulness can help you recognize emotional states that might negatively impact your trading decisions.\n\n## Learning from Losses\n\nViewing losses as learning opportunities rather than failures can help develop a healthier psychological approach to trading.",
    status: "approved",
    authorId: "user_123",
  },
  {
    id: "post_6",
    slug: "crypto-trading-fundamentals",
    title: "Cryptocurrency Trading: Essential Strategies for 2023",
    date: "2023-10-18",
    coverImage: "/placeholder.svg?height=300&width=500",
    excerpt: "Discover specialized strategies for trading cryptocurrencies in the current market environment.",
    category: "CRYPTO TRADING",
    readingTime: "9 MIN READ",
    content:
      "# Cryptocurrency Trading: Essential Strategies for 2023\n\nCryptocurrency markets operate differently from traditional markets, requiring specialized knowledge and strategies.\n\n## Understanding Market Cycles\n\nCrypto markets tend to move in pronounced cycles of accumulation, uptrend, distribution, and downtrend. Identifying the current cycle phase is crucial.\n\n## On-Chain Analysis\n\nUnlike traditional markets, blockchain data provides unique insights into network activity, whale movements, and potential price catalysts.\n\n## Trading the Bitcoin Correlation\n\nMost altcoins maintain varying degrees of correlation with Bitcoin. Understanding these relationships can provide trading advantages.\n\n## Navigating Regulatory News\n\nCrypto markets are highly sensitive to regulatory developments. Staying informed about potential regulatory changes is essential.\n\n## Managing Extreme Volatility\n\nCryptocurrencies can experience significant price swings in short periods. Position sizing and strict risk management are particularly important in this market.",
    status: "approved",
    authorId: "user_123",
  },
  {
    id: "post_7",
    slug: "forex-trading-basics",
    title: "Forex Trading: A Beginner's Guide to Currency Markets",
    date: "2023-11-05",
    coverImage: "/placeholder.svg?height=300&width=500",
    excerpt: "Learn the fundamentals of forex trading and how to navigate the world's largest financial market.",
    category: "FOREX",
    readingTime: "7 MIN READ",
    content:
      "# Forex Trading: A Beginner's Guide to Currency Markets\n\nThe foreign exchange market is the largest financial market in the world, with trillions of dollars traded daily.\n\n## Understanding Currency Pairs\n\nForex trading involves buying one currency while simultaneously selling another, which is why currencies are quoted in pairs.\n\n## Major, Minor, and Exotic Pairs\n\nMajor pairs involve the US dollar, minor pairs don't include USD but involve major currencies, and exotic pairs include currencies from emerging economies.\n\n## Leverage and Margin\n\nForex trading typically involves leverage, allowing traders to control large positions with a relatively small amount of capital.\n\n## Best Times to Trade\n\nThe forex market operates 24 hours a day, but volatility and liquidity vary depending on which sessions are active.\n\n## Common Forex Trading Strategies\n\nPopular approaches include day trading, swing trading, position trading, and carry trading, each with different time horizons and objectives.",
    status: "pending",
    authorId: "user_123",
  },
  {
    id: "post_8",
    slug: "options-trading-explained",
    title: "Options Trading Explained: Strategies for Beginners",
    date: "2023-11-15",
    coverImage: "/placeholder.svg?height=300&width=500",
    excerpt: "Understand the basics of options trading and learn beginner-friendly strategies to get started.",
    category: "OPTIONS",
    readingTime: "8 MIN READ",
    content:
      "# Options Trading Explained: Strategies for Beginners\n\nOptions provide traders with the right, but not the obligation, to buy or sell an asset at a predetermined price within a specific timeframe.\n\n## Calls and Puts\n\nCall options give the holder the right to buy an asset, while put options give the right to sell an asset at the strike price.\n\n## Understanding Option Greeks\n\nDelta, gamma, theta, and vega are metrics that help traders understand how option prices might change under different conditions.\n\n## Covered Calls\n\nA beginner-friendly strategy where you sell call options on stocks you already own to generate income.\n\n## Cash-Secured Puts\n\nSelling put options with enough cash to cover the potential purchase of shares if the option is exercised.\n\n## Vertical Spreads\n\nBuying and selling options of the same type and expiration but different strike prices to limit risk and potential profit.",
    status: "rejected",
    authorId: "user_123",
  },
  {
    id: "post_9",
    slug: "futures-trading-guide",
    title: "Futures Trading: A Comprehensive Guide for Intermediate Traders",
    date: "2023-12-01",
    coverImage: "/placeholder.svg?height=300&width=500",
    excerpt: "Explore the world of futures trading and learn how to trade these derivative contracts effectively.",
    category: "FUTURES",
    readingTime: "10 MIN READ",
    content:
      "# Futures Trading: A Comprehensive Guide for Intermediate Traders\n\nFutures contracts are standardized agreements to buy or sell an asset at a predetermined price at a specified time in the future.\n\n## Understanding Futures Markets\n\nFutures markets exist for commodities, currencies, stock indices, and even individual stocks, allowing traders to speculate or hedge.\n\n## Contract Specifications\n\nEach futures contract has specific details regarding size, delivery date, tick size, and margin requirements that traders must understand.\n\n## Contango and Backwardation\n\nThese market conditions describe the relationship between futures prices and spot prices, which can impact trading strategies.\n\n## Rolling Contracts\n\nTraders who don't want to take delivery must close or roll their positions before expiration, which requires specific timing and execution.\n\n## Risk Management in Futures\n\nDue to the leverage involved, futures trading requires strict risk management protocols to protect capital.",
    status: "pending",
    authorId: "user_456",
  },
  {
    id: "post_10",
    slug: "algorithmic-trading-basics",
    title: "Introduction to Algorithmic Trading: Building Your First Strategy",
    date: "2023-12-15",
    coverImage: "/placeholder.svg?height=300&width=500",
    excerpt: "Learn how to create and implement automated trading strategies using algorithms.",
    category: "ALGO TRADING",
    readingTime: "12 MIN READ",
    content:
      "# Introduction to Algorithmic Trading: Building Your First Strategy\n\nAlgorithmic trading uses computer programs to follow a defined set of instructions for placing trades to generate profits at a speed and frequency impossible for human traders.\n\n## Types of Algorithmic Strategies\n\nCommon approaches include trend-following, mean reversion, statistical arbitrage, and market making strategies.\n\n## Required Technical Skills\n\nAlgorithmic trading requires programming knowledge (typically Python, R, or C++), statistical analysis skills, and market understanding.\n\n## Backtesting Frameworks\n\nBefore deploying algorithms, traders must test them against historical data to evaluate performance and robustness.\n\n## Execution Infrastructure\n\nSuccessful algorithmic trading requires low-latency connections, proper order execution systems, and reliable data feeds.\n\n## Common Pitfalls\n\nOverfitting, look-ahead bias, and survivorship bias are common issues that can lead to strategies that perform well in backtests but fail in live trading.",
    status: "approved",
    authorId: "user_456",
  },
]

// In-memory store for blog posts
let blogPostsStore = [...tradingPosts]

export async function getAllPosts(): Promise<Post[]> {
  // Return only approved posts for public viewing
  return blogPostsStore.filter((post) => post.status === "approved")
}

export async function getAllUserPosts(userId: string): Promise<Post[]> {
  // Return only posts created by this user
  return blogPostsStore.filter((post) => post.authorId === userId)
}

export async function getAllPendingPosts(): Promise<Post[]> {
  // Return all pending posts for admin review
  return blogPostsStore.filter((post) => post.status === "pending")
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Find the post in our data
    const post = blogPostsStore.find((post) => post.slug === slug)
    return post || null
  } catch (error) {
    console.error("Error getting post by slug:", error)
    return null
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    // Find the post in our data
    const post = blogPostsStore.find((post) => post.id === id)
    return post || null
  } catch (error) {
    console.error("Error getting post by id:", error)
    return null
  }
}

export async function createPost(post: Omit<Post, "id">): Promise<Post> {
  const newPost = {
    ...post,
    id: `post_${Date.now()}`,
    status: "pending" as BlogStatus, // New posts are pending by default
  }

  blogPostsStore.push(newPost)
  return newPost
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post | null> {
  const index = blogPostsStore.findIndex((post) => post.id === id)

  if (index === -1) {
    return null
  }

  // Update the post
  blogPostsStore[index] = {
    ...blogPostsStore[index],
    ...updates,
  }

  return blogPostsStore[index]
}

export async function deletePost(id: string): Promise<boolean> {
  const initialLength = blogPostsStore.length
  blogPostsStore = blogPostsStore.filter((post) => post.id !== id)
  return blogPostsStore.length < initialLength
}
