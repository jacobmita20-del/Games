import dotenv from 'dotenv';

dotenv.config();

const games = [
  {
    title: "Defend Your Castle",
    genre: "Strategy",
    year: 2007,
    description: "A tower defense strategy game where you defend your castle from invading stick figure forces. Recruit fighters and experiment with different defensive combinations.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/defend-your-castle.jpg",
    swfUrl: "https://archive.org/download/armorgames/Defend%20Your%20Castle.swf",
    featured: true
  },
  {
    title: "The Last Stand",
    genre: "Action",
    year: 2007,
    description: "A zombie apocalypse survival game where you scavenge for weapons and build barricades to survive 20 days and nights against zombie hordes.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/the-last-stand.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/The%20Last%20Stand.swf",
    featured: true
  },
  {
    title: "Pandemic 2",
    genre: "Strategy",
    year: 2008,
    description: "An early version of Plague Inc. where you spread a virus across the world. Multiple starting points and difficulty levels provide replayability.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/pandemic-2.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Pandemic%202.swf",
    featured: false
  },
  {
    title: "Super Smash Flash",
    genre: "Action",
    year: 2006,
    description: "A free Flash version of Super Smash Bros. featuring expanded character roster including Sonic, Naruto, and Inuyasha with altered mechanics.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/super-smash-flash.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Super%20Smash%20Flash.swf",
    featured: true
  },
  {
    title: "Madness Interactive",
    genre: "Action",
    year: 2005,
    description: "A violent action game with story mode and challenges. Kill a sheriff to retrieve your pie through 15 levels with various weapons and environmental hazards.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/madness-interactive.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Madness%20Interactive.swf",
    featured: false
  },
  {
    title: "Powder Game",
    genre: "Puzzle",
    year: 2006,
    description: "A physics-based sandbox game where you play as a god creating worlds with sand, water, fire, and other elements to build intricate patterns.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/powder-game.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Powder%20Game.swf",
    featured: false
  },
  {
    title: "Stick RPG",
    genre: "Adventure",
    year: 2005,
    description: "A stick-figure GTA-style RPG where you build stats, work jobs, skateboard around town, and get into bar fights to earn money.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/stick-rpg.jpg",
    swfUrl: "https://archive.org/download/armorgames/Stick%20RPG.swf",
    featured: false
  },
  {
    title: "Learn to Fly",
    genre: "Adventure",
    year: 2010,
    description: "Help a penguin achieve flight by sliding down icy slopes and purchasing upgrades like rocket launchers and gliders in this addictive progression game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/learn-to-fly.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Learn%20to%20Fly.swf",
    featured: true
  },
  {
    title: "QWOP",
    genre: "Action",
    year: 2008,
    description: "A notoriously difficult runner game where you control a sprinter's individual limbs using Q, W, O, and P keys to complete a 100-meter race.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/qwop.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/QWOP.swf",
    featured: false
  },
  {
    title: "Max Dirt Bike",
    genre: "Sports",
    year: 2007,
    description: "A physics-based dirt bike racing game with stylized sunset-like graphics. Navigate obstacles and slopes while maintaining momentum across multiple levels.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/max-dirt-bike.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Max%20Dirt%20Bike.swf",
    featured: false
  },
  {
    title: "Bloons Tower Defense 5",
    genre: "Strategy",
    year: 2011,
    description: "The fifth installment of the popular tower defense series where you pop balloons using monkey towers with unique abilities and upgrades.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/bloons-td5.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Bloons%20Tower%20Defense%205.swf",
    featured: true
  },
  {
    title: "Fancy Pants Adventure",
    genre: "Adventure",
    year: 2006,
    description: "A stylish platformer featuring a stick figure in fancy pants who can draw platforms and swing on ropes to explore colorful worlds.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/fancy-pants-adventure.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Fancy%20Pants%20Adventure.swf",
    featured: false
  },
  {
    title: "Pong",
    genre: "Arcade",
    year: 2005,
    description: "The classic arcade game reimagined in Flash. Control your paddle to bounce the ball and defeat your opponent in this timeless two-player game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/pong.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Pong.swf",
    featured: false
  },
  {
    title: "Tetris",
    genre: "Puzzle",
    year: 2005,
    description: "The legendary block-stacking puzzle game in Flash. Rotate and place falling Tetriminos to complete lines and achieve the highest score.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/tetris.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Tetris.swf",
    featured: false
  },
  {
    title: "Pac-Man",
    genre: "Arcade",
    year: 2006,
    description: "Navigate through mazes collecting dots while avoiding ghosts in this Flash recreation of the iconic arcade classic.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/pacman.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Pac-Man.swf",
    featured: false
  },
  {
    title: "Snake",
    genre: "Arcade",
    year: 2005,
    description: "Control a growing snake to eat food and avoid hitting walls or itself in this addictive Flash adaptation of the mobile classic.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/snake.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Snake.swf",
    featured: false
  },
  {
    title: "Breakout",
    genre: "Arcade",
    year: 2006,
    description: "Break through brick walls with a bouncing ball and paddle in this Flash version of the classic arcade game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/breakout.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Breakout.swf",
    featured: false
  },
  {
    title: "Asteroids",
    genre: "Arcade",
    year: 2007,
    description: "Destroy asteroids and enemy ships while managing your ammo in this Flash remake of the classic arcade shooter.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/asteroids.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Asteroids.swf",
    featured: false
  },
  {
    title: "Space Invaders",
    genre: "Arcade",
    year: 2007,
    description: "Defend Earth from waves of descending aliens in this Flash adaptation of the legendary arcade shooter.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/space-invaders.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Space%20Invaders.swf",
    featured: false
  },
  {
    title: "Flappy Bird",
    genre: "Arcade",
    year: 2013,
    description: "Guide a bird through pipes by tapping to make it flap. Simple mechanics but deceptively challenging in this viral sensation.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/flappy-bird.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Flappy%20Bird.swf",
    featured: false
  },
  {
    title: "Doodle Jump",
    genre: "Arcade",
    year: 2009,
    description: "Guide a doodle creature upward by jumping on platforms while avoiding monsters and collecting power-ups.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/doodle-jump.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Doodle%20Jump.swf",
    featured: false
  },
  {
    title: "Whack Your Boss",
    genre: "Action",
    year: 2008,
    description: "An interactive game where you use various office objects to whack your boss in creative and humorous ways.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/whack-your-boss.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Whack%20Your%20Boss.swf",
    featured: false
  },
  {
    title: "Alien Hominid",
    genre: "Action",
    year: 2002,
    description: "A run-and-gun action game where you play as an alien fighting government agents to recover your crashed UFO.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/alien-hominid.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Alien%20Hominid.swf",
    featured: false
  },
  {
    title: "Raft Wars",
    genre: "Action",
    year: 2007,
    description: "Defend your raft from pirates using various weapons and upgrades in this tower defense-style action game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/raft-wars.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Raft%20Wars.swf",
    featured: false
  },
  {
    title: "Stick Fighter",
    genre: "Action",
    year: 2006,
    description: "Engage in one-on-one stick figure combat with various fighting moves and combos against increasingly difficult opponents.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/stick-fighter.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Stick%20Fighter.swf",
    featured: false
  },
  {
    title: "Bubble Trouble",
    genre: "Puzzle",
    year: 2007,
    description: "Pop bubbles of decreasing sizes using a harpoon gun while avoiding obstacles in this addictive puzzle game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/bubble-trouble.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Bubble%20Trouble.swf",
    featured: false
  },
  {
    title: "Bejeweled",
    genre: "Puzzle",
    year: 2001,
    description: "Match three or more jewels in a row to clear them and earn points in this addictive match-three puzzle game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/bejeweled.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Bejeweled.swf",
    featured: false
  },
  {
    title: "Zuma",
    genre: "Puzzle",
    year: 2003,
    description: "Shoot colored balls to match three or more in a row and stop them from reaching the skull in this puzzle game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/zuma.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Zuma.swf",
    featured: false
  },
  {
    title: "Mahjong",
    genre: "Puzzle",
    year: 2005,
    description: "Match pairs of identical tiles to clear the board in this classic tile-matching puzzle game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/mahjong.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Mahjong.swf",
    featured: false
  },
  {
    title: "2048",
    genre: "Puzzle",
    year: 2014,
    description: "Slide tiles on a grid to combine numbers and reach the 2048 tile in this minimalist puzzle game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/2048.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/2048.swf",
    featured: false
  },
  {
    title: "Minesweeper",
    genre: "Puzzle",
    year: 2005,
    description: "Uncover safe squares while avoiding hidden mines in this classic logic puzzle game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/minesweeper.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Minesweeper.swf",
    featured: false
  },
  {
    title: "Solitaire",
    genre: "Puzzle",
    year: 2005,
    description: "Play the classic card game of Solitaire where you arrange cards in descending order to clear the deck.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/solitaire.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Solitaire.swf",
    featured: false
  },
  {
    title: "Chess",
    genre: "Strategy",
    year: 2006,
    description: "Play chess against the computer or another player in this classic strategy board game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/chess.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Chess.swf",
    featured: false
  },
  {
    title: "Checkers",
    genre: "Strategy",
    year: 2006,
    description: "Jump your pieces over opponents to capture them in this classic board game of strategy.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/checkers.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Checkers.swf",
    featured: false
  },
  {
    title: "Poker",
    genre: "Strategy",
    year: 2007,
    description: "Play Texas Hold'em poker against computer opponents with varying difficulty levels.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/poker.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Poker.swf",
    featured: false
  },
  {
    title: "Blackjack",
    genre: "Strategy",
    year: 2006,
    description: "Try to beat the dealer by getting a hand closer to 21 without going over in this casino card game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/blackjack.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Blackjack.swf",
    featured: false
  },
  {
    title: "Roulette",
    genre: "Strategy",
    year: 2007,
    description: "Spin the wheel and place your bets on this classic casino game of chance.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/roulette.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Roulette.swf",
    featured: false
  },
  {
    title: "Slots",
    genre: "Strategy",
    year: 2006,
    description: "Pull the lever and try to match symbols to win big in this virtual slot machine game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/slots.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Slots.swf",
    featured: false
  },
  {
    title: "Basketball",
    genre: "Sports",
    year: 2008,
    description: "Shoot basketballs from various distances and angles to score points and beat your high score.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/basketball.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Basketball.swf",
    featured: false
  },
  {
    title: "Football",
    genre: "Sports",
    year: 2009,
    description: "Play American football with simplified controls, throwing touchdowns and making tackles.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/football.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Football.swf",
    featured: false
  },
  {
    title: "Soccer",
    genre: "Sports",
    year: 2008,
    description: "Score goals against the computer in this arcade-style soccer game with simple controls.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/soccer.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Soccer.swf",
    featured: false
  },
  {
    title: "Golf",
    genre: "Sports",
    year: 2007,
    description: "Adjust your swing and aim to sink putts on various golf courses in this realistic golf simulator.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/golf.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Golf.swf",
    featured: false
  },
  {
    title: "Tennis",
    genre: "Sports",
    year: 2008,
    description: "Play tennis against computer opponents, hitting forehands and backhands to win matches.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/tennis.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Tennis.swf",
    featured: false
  },
  {
    title: "Bowling",
    genre: "Sports",
    year: 2007,
    description: "Roll bowling balls down lanes to knock down pins and score strikes in this arcade bowling game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/bowling.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Bowling.swf",
    featured: false
  },
  {
    title: "Racing",
    genre: "Sports",
    year: 2008,
    description: "Race against opponents on various tracks, collecting power-ups and avoiding obstacles.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/racing.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Racing.swf",
    featured: false
  },
  {
    title: "Skateboarding",
    genre: "Sports",
    year: 2007,
    description: "Perform tricks and stunts on your skateboard to score points and complete challenges.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/skateboarding.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Skateboarding.swf",
    featured: false
  },
  {
    title: "Snowboarding",
    genre: "Sports",
    year: 2008,
    description: "Race down snowy slopes performing tricks to earn points and unlock new areas.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/snowboarding.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Snowboarding.swf",
    featured: false
  },
  {
    title: "Surfing",
    genre: "Sports",
    year: 2007,
    description: "Ride waves and perform aerial tricks to score points in this surfing simulation game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/surfing.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Surfing.swf",
    featured: false
  },
  {
    title: "Fishing",
    genre: "Sports",
    year: 2008,
    description: "Cast your line and reel in fish of various sizes and species in this relaxing fishing game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/fishing.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Fishing.swf",
    featured: false
  },
  {
    title: "Archery",
    genre: "Sports",
    year: 2007,
    description: "Aim and shoot arrows at targets, adjusting for wind and distance to achieve high scores.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/archery.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Archery.swf",
    featured: false
  },
  {
    title: "Darts",
    genre: "Sports",
    year: 2006,
    description: "Throw darts at a dartboard to score points and complete various game modes.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/darts.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Darts.swf",
    featured: false
  },
  {
    title: "Billiards",
    genre: "Sports",
    year: 2007,
    description: "Play pool or billiards against the computer, using physics to sink balls into pockets.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/billiards.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Billiards.swf",
    featured: false
  },
  {
    title: "Ping Pong",
    genre: "Sports",
    year: 2006,
    description: "Play table tennis against the computer, moving your paddle to hit the ball back and forth.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/ping-pong.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Ping%20Pong.swf",
    featured: false
  },
  {
    title: "Badminton",
    genre: "Sports",
    year: 2008,
    description: "Play badminton against computer opponents, hitting the shuttlecock over the net.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/badminton.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Badminton.swf",
    featured: false
  },
  {
    title: "Volleyball",
    genre: "Sports",
    year: 2007,
    description: "Play volleyball on the beach, spiking and blocking against computer opponents.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/volleyball.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Volleyball.swf",
    featured: false
  },
  {
    title: "Cricket",
    genre: "Sports",
    year: 2008,
    description: "Play cricket as a batsman, hitting balls bowled at you to score runs.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/cricket.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Cricket.swf",
    featured: false
  },
  {
    title: "Baseball",
    genre: "Sports",
    year: 2007,
    description: "Step up to the plate and hit home runs in this arcade baseball game.",
    thumbnail: "https://images.armorgames.com/media/images/game_thumb/baseball.jpg",
    swfUrl: "https://archive.org/download/flash-games_20211214/Baseball.swf",
    featured: false
  }
];

async function seedGames() {
  try {
    const response = await fetch(process.env.BUILT_IN_FORGE_API_URL + '/api/v1/data/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
      },
      body: JSON.stringify({ games }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    console.log('✓ Games seeded successfully');
  } catch (error) {
    console.error('Error seeding games:', error);
    process.exit(1);
  }
}

seedGames();
