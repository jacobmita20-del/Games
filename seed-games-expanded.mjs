import mysql from 'mysql2/promise';

const games = [
  // 1980s Arcade Classics
  { title: 'Pac-Man', genre: 'Arcade', year: 1980, description: 'Navigate mazes and eat pellets while avoiding ghosts in this iconic arcade game.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NTkucG5n/315x250%23c/3fRqL7.image.png', swfUrl: 'https://archive.org/download/PAC_MAN_1980/PAC_MAN_1980.swf', featured: true },
  { title: 'Donkey Kong', genre: 'Arcade', year: 1981, description: 'Jump over barrels and climb ladders to rescue the damsel in distress.', thumbnail: 'https://img.itch.zone/aW1nLzE0OTEwNzMucG5n/315x250%23c/nRBqL8.image.png', swfUrl: 'https://archive.org/download/Donkey_Kong_1981/Donkey_Kong_1981.swf', featured: false },
  { title: 'Galaga', genre: 'Arcade', year: 1981, description: 'Shoot down waves of alien invaders in this space shooter classic.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NjAucG5n/315x250%23c/4fRqL9.image.png', swfUrl: 'https://archive.org/download/Galaga_1981/Galaga_1981.swf', featured: false },
  { title: 'Space Invaders', genre: 'Arcade', year: 1978, description: 'Defend Earth from descending rows of alien invaders.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NjEucG5n/315x250%23c/5fRqL0.image.png', swfUrl: 'https://archive.org/download/Space_Invaders_1978/Space_Invaders_1978.swf', featured: false },
  { title: 'Asteroids', genre: 'Arcade', year: 1979, description: 'Shoot asteroids and avoid collisions in this vector-based arcade classic.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NjIucG5n/315x250%23c/6fRqL1.image.png', swfUrl: 'https://archive.org/download/Asteroids_1979/Asteroids_1979.swf', featured: false },

  // 1990s Classics
  { title: 'Doom', genre: 'Action', year: 1993, description: 'Fight demons in this groundbreaking first-person shooter.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NjMucG5n/315x250%23c/7fRqL2.image.png', swfUrl: 'https://archive.org/download/Doom_1993/Doom_1993.swf', featured: true },
  { title: 'Wolfenstein 3D', genre: 'Action', year: 1992, description: 'Escape from a Nazi fortress in this pioneering 3D shooter.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NjQucG5n/315x250%23c/8fRqL3.image.png', swfUrl: 'https://archive.org/download/Wolfenstein_3D_1992/Wolfenstein_3D_1992.swf', featured: false },
  { title: 'Sonic the Hedgehog', genre: 'Adventure', year: 1991, description: 'Race through loops and collect rings as the blue speedster.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NjUucG5n/315x250%23c/9fRqL4.image.png', swfUrl: 'https://archive.org/download/Sonic_1991/Sonic_1991.swf', featured: false },
  { title: 'Super Mario Bros', genre: 'Adventure', year: 1985, description: 'Jump through the Mushroom Kingdom and rescue Princess Peach.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NjYucG5n/315x250%23c/0fRqL5.image.png', swfUrl: 'https://archive.org/download/Super_Mario_Bros_1985/Super_Mario_Bros_1985.swf', featured: false },
  { title: 'The Legend of Zelda', genre: 'Adventure', year: 1986, description: 'Explore dungeons and solve puzzles to save Princess Zelda.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NjcucG5n/315x250%23c/1fRqL6.image.png', swfUrl: 'https://archive.org/download/The_Legend_of_Zelda_1986/The_Legend_of_Zelda_1986.swf', featured: false },
  { title: 'Tetris', genre: 'Puzzle', year: 1989, description: 'Stack falling blocks to complete rows in this timeless puzzle game.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NjgucG5n/315x250%23c/2fRqL7.image.png', swfUrl: 'https://archive.org/download/Tetris_1989/Tetris_1989.swf', featured: true },
  { title: 'Street Fighter II', genre: 'Action', year: 1991, description: 'Battle opponents in this legendary fighting game.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NjkucG5n/315x250%23c/3fRqL8.image.png', swfUrl: 'https://archive.org/download/Street_Fighter_II_1991/Street_Fighter_II_1991.swf', featured: false },
  { title: 'Mortal Kombat', genre: 'Action', year: 1992, description: 'Engage in brutal combat with signature finishing moves.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NzAucG5n/315x250%23c/4fRqL9.image.png', swfUrl: 'https://archive.org/download/Mortal_Kombat_1992/Mortal_Kombat_1992.swf', featured: false },

  // 2000s Flash Games
  { title: 'Defend Your Castle', genre: 'Strategy', year: 2007, description: 'Defend your castle from waves of stick figure invaders.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NzEucG5n/315x250%23c/5fRqL0.image.png', swfUrl: 'https://archive.org/download/Defend_Your_Castle_2007/Defend_Your_Castle_2007.swf', featured: true },
  { title: 'The Last Stand', genre: 'Action', year: 2007, description: 'Survive zombie waves in this tower defense action game.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NzIucG5n/315x250%23c/6fRqL1.image.png', swfUrl: 'https://archive.org/download/The_Last_Stand_2007/The_Last_Stand_2007.swf', featured: true },
  { title: 'Super Smash Flash', genre: 'Action', year: 2006, description: 'Battle as your favorite characters in this Flash fighting game.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NzMucG5n/315x250%23c/7fRqL2.image.png', swfUrl: 'https://archive.org/download/Super_Smash_Flash_2006/Super_Smash_Flash_2006.swf', featured: false },
  { title: 'Stick Fighter', genre: 'Action', year: 2005, description: 'Fight stick figure opponents in one-on-one combat.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NzQucG5n/315x250%23c/8fRqL3.image.png', swfUrl: 'https://archive.org/download/Stick_Fighter_2005/Stick_Fighter_2005.swf', featured: false },
  { title: 'Bloons Tower Defense', genre: 'Strategy', year: 2007, description: 'Pop balloons with strategic tower placement.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NzUucG5n/315x250%23c/9fRqL4.image.png', swfUrl: 'https://archive.org/download/Bloons_TD_2007/Bloons_TD_2007.swf', featured: false },
  { title: 'Bejeweled', genre: 'Puzzle', year: 2001, description: 'Match gems to create combos in this addictive puzzle game.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NzYucG5n/315x250%23c/0fRqL5.image.png', swfUrl: 'https://archive.org/download/Bejeweled_2001/Bejeweled_2001.swf', featured: false },
  { title: 'Zuma', genre: 'Puzzle', year: 2003, description: 'Shoot balls to match colors and clear the board.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NzcucG5n/315x250%23c/1fRqL6.image.png', swfUrl: 'https://archive.org/download/Zuma_2003/Zuma_2003.swf', featured: false },
  { title: 'Diner Dash', genre: 'Strategy', year: 2004, description: 'Manage a restaurant and serve customers efficiently.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NzgucG5n/315x250%23c/2fRqL7.image.png', swfUrl: 'https://archive.org/download/Diner_Dash_2004/Diner_Dash_2004.swf', featured: false },
  { title: 'Cooking Mama', genre: 'Strategy', year: 2006, description: 'Prepare dishes by following quick-time cooking instructions.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2NzkucG5n/315x250%23c/3fRqL8.image.png', swfUrl: 'https://archive.org/download/Cooking_Mama_2006/Cooking_Mama_2006.swf', featured: false },
  { title: 'Escape the Room', genre: 'Puzzle', year: 2005, description: 'Solve puzzles and find clues to escape the room.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2ODAucG5n/315x250%23c/4fRqL9.image.png', swfUrl: 'https://archive.org/download/Escape_the_Room_2005/Escape_the_Room_2005.swf', featured: false },
  { title: 'Stick Arena', genre: 'Action', year: 2006, description: 'Battle other stick figures in multiplayer arenas.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2ODEucG5n/315x250%23c/5fRqL0.image.png', swfUrl: 'https://archive.org/download/Stick_Arena_2006/Stick_Arena_2006.swf', featured: false },

  // 2010s Flash Games
  { title: 'Flappy Bird', genre: 'Arcade', year: 2013, description: 'Tap to fly through pipes in this addictive mobile game.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2ODIucG5n/315x250%23c/6fRqL1.image.png', swfUrl: 'https://archive.org/download/Flappy_Bird_2013/Flappy_Bird_2013.swf', featured: true },
  { title: 'Chrome Dino', genre: 'Arcade', year: 2014, description: 'Jump over cacti as a dinosaur in this offline Chrome game.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2ODMucG5n/315x250%23c/7fRqL2.image.png', swfUrl: 'https://archive.org/download/Chrome_Dino_2014/Chrome_Dino_2014.swf', featured: false },
  { title: '2048', genre: 'Puzzle', year: 2014, description: 'Combine tiles to reach the 2048 tile.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2ODQucG5n/315x250%23c/8fRqL3.image.png', swfUrl: 'https://archive.org/download/2048_2014/2048_2014.swf', featured: false },
  { title: 'Slither.io', genre: 'Arcade', year: 2016, description: 'Grow your snake by eating pellets and avoiding others.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2ODUucG5n/315x250%23c/9fRqL4.image.png', swfUrl: 'https://archive.org/download/Slither_io_2016/Slither_io_2016.swf', featured: false },
  { title: 'Agar.io', genre: 'Arcade', year: 2015, description: 'Consume smaller cells to grow larger in this multiplayer game.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2ODYucG5n/315x250%23c/0fRqL5.image.png', swfUrl: 'https://archive.org/download/Agar_io_2015/Agar_io_2015.swf', featured: false },
  { title: 'Crossy Road', genre: 'Arcade', year: 2014, description: 'Navigate across roads and rivers in this voxel-based game.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2ODcucG5n/315x250%23c/1fRqL6.image.png', swfUrl: 'https://archive.org/download/Crossy_Road_2014/Crossy_Road_2014.swf', featured: false },
  { title: 'Threes!', genre: 'Puzzle', year: 2014, description: 'Combine numbered tiles in strategic ways.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2ODgucG5n/315x250%23c/2fRqL7.image.png', swfUrl: 'https://archive.org/download/Threes_2014/Threes_2014.swf', featured: false },
  { title: 'Candy Crush Saga', genre: 'Puzzle', year: 2012, description: 'Match candies to complete levels in this popular puzzle game.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2ODkucG5n/315x250%23c/3fRqL8.image.png', swfUrl: 'https://archive.org/download/Candy_Crush_2012/Candy_Crush_2012.swf', featured: false },
  { title: 'Angry Birds', genre: 'Puzzle', year: 2009, description: 'Launch birds at pigs in this physics-based puzzle game.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2OTAucG5n/315x250%23c/4fRqL9.image.png', swfUrl: 'https://archive.org/download/Angry_Birds_2009/Angry_Birds_2009.swf', featured: true },
  { title: 'Jetpack Joyride', genre: 'Arcade', year: 2011, description: 'Fly with a jetpack and collect coins while avoiding obstacles.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2OTEucG5n/315x250%23c/5fRqL0.image.png', swfUrl: 'https://archive.org/download/Jetpack_Joyride_2011/Jetpack_Joyride_2011.swf', featured: false },
  { title: 'Temple Run', genre: 'Arcade', year: 2011, description: 'Run through temples collecting coins and avoiding obstacles.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2OTIucG5n/315x250%23c/6fRqL1.image.png', swfUrl: 'https://archive.org/download/Temple_Run_2011/Temple_Run_2011.swf', featured: false },
  { title: 'Plants vs Zombies', genre: 'Strategy', year: 2009, description: 'Place plants to defend your garden from zombies.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2OTMucG5n/315x250%23c/7fRqL2.image.png', swfUrl: 'https://archive.org/download/Plants_vs_Zombies_2009/Plants_vs_Zombies_2009.swf', featured: true },
  { title: 'Doodle Jump', genre: 'Arcade', year: 2009, description: 'Jump upwards while avoiding enemies in this endless climber.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2OTQucG5n/315x250%23c/8fRqL3.image.png', swfUrl: 'https://archive.org/download/Doodle_Jump_2009/Doodle_Jump_2009.swf', featured: false },
  { title: 'Cut the Rope', genre: 'Puzzle', year: 2010, description: 'Cut ropes to feed candy to a cute monster.', thumbnail: 'https://img.itch.zone/aW1nLzEwMDY2OTUucG5n/315x250%23c/9fRqL4.image.png', swfUrl: 'https://archive.org/download/Cut_the_Rope_2010/Cut_the_Rope_2010.swf', featured: false },
];

async function seedGames() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    for (const game of games) {
      await connection.execute(
        `INSERT INTO games (title, genre, year, description, thumbnail, swfUrl, featured) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [game.title, game.genre, game.year, game.description, game.thumbnail, game.swfUrl, game.featured ? 1 : 0]
      );
    }
    console.log(`✓ Successfully seeded ${games.length} games!`);
  } catch (error) {
    console.error('Error seeding games:', error);
  } finally {
    await connection.end();
  }
}

seedGames();
