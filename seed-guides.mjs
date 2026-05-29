import mysql from 'mysql2/promise';

const guides = [
  {
    gameId: 1,
    title: 'Defend Your Castle Guide',
    content: 'Defend your castle from waves of enemies by clicking on them to shoot. Upgrade your weapons and defenses between waves.',
    tips: 'Focus on upgrading attack power early\nSave money for critical upgrades\nClick faster enemies first\nUse the freeze ability strategically',
    keyboardShortcuts: 'MOUSE: Aim and shoot\nSPACE: Pause game\nM: Mute sound'
  },
  {
    gameId: 2,
    title: 'The Last Stand Guide',
    content: 'Survive zombie waves by building barricades and shooting. Manage your resources carefully to last as long as possible.',
    tips: 'Build barricades before each wave\nStock up on ammunition\nUpgrade weapons progressively\nFocus fire on dangerous zombies first',
    keyboardShortcuts: 'ARROW KEYS: Move\nMOUSE: Aim and shoot\nE: Build/Repair\nSPACE: Reload'
  },
  {
    gameId: 3,
    title: 'Super Smash Flash Guide',
    content: 'Fight opponents in this Flash fighting game. Master combos and special moves to defeat your enemies.',
    tips: 'Learn your character\'s combos\nPractice timing your attacks\nUse the environment to your advantage\nBlock incoming attacks',
    keyboardShortcuts: 'ARROW KEYS: Move\nZ: Attack\nX: Special\nC: Block\nSPACE: Jump'
  },
  {
    gameId: 4,
    title: 'Bloons TD Guide',
    content: 'Pop balloons by placing monkey towers strategically. Upgrade towers to handle stronger balloon waves.',
    tips: 'Start with dart monkeys\nUpgrade attack speed early\nPlace towers strategically\nSave for key upgrades',
    keyboardShortcuts: 'MOUSE: Place towers\nRIGHT CLICK: Sell tower\nSPACE: Start wave'
  },
  {
    gameId: 5,
    title: 'Bejeweled Guide',
    content: 'Match three or more gems to clear them and score points. Create power-ups by matching 4+ gems.',
    tips: 'Look for cascades\nCreate power-ups for big points\nMatch gems at the bottom first\nPlan ahead for combos',
    keyboardShortcuts: 'MOUSE: Click gems to swap\nENTER: Confirm move\nSPACE: Pause'
  },
  {
    gameId: 6,
    title: 'Pac-Man Guide',
    content: 'Navigate the maze eating pellets while avoiding ghosts. Eat power pellets to turn the tables on ghosts.',
    tips: 'Learn ghost patterns\nUse corners strategically\nEat power pellets when surrounded\nAvoid dead ends',
    keyboardShortcuts: 'ARROW KEYS: Move\nSPACE: Pause\nP: Power-up mode'
  },
  {
    gameId: 7,
    title: 'Tetris Guide',
    content: 'Stack falling blocks to create complete lines. Clear lines to score points and prevent the stack from reaching the top.',
    tips: 'Keep the middle clear\nBuild walls on sides\nRotate pieces strategically\nAnticipate future pieces',
    keyboardShortcuts: 'ARROW LEFT/RIGHT: Move\nARROW UP: Rotate\nARROW DOWN: Drop faster\nSPACE: Hard drop'
  },
  {
    gameId: 8,
    title: 'Doom Guide',
    content: 'Fight demons in a sci-fi setting. Use various weapons and power-ups to survive the onslaught.',
    tips: 'Manage ammo carefully\nUse cover effectively\nSwitch weapons for different enemies\nCollect health packs',
    keyboardShortcuts: 'WASD: Move\nMOUSE: Aim and shoot\nE: Use item\nSPACE: Jump\n1-9: Switch weapons'
  },
  {
    gameId: 9,
    title: 'Flappy Bird Guide',
    content: 'Navigate a bird through pipes by tapping to make it jump. Avoid hitting pipes and the ground.',
    tips: 'Tap gently for small jumps\nAim for the center of pipes\nStay calm under pressure\nPractice timing',
    keyboardShortcuts: 'MOUSE CLICK: Jump\nSPACE: Jump\nENTER: Restart'
  },
  {
    gameId: 10,
    title: 'Angry Birds Guide',
    content: 'Launch birds at pigs to destroy their structures. Use different bird abilities strategically.',
    tips: 'Use bird abilities wisely\nAim for weak points\nCreate chain reactions\nExperiment with angles',
    keyboardShortcuts: 'MOUSE: Aim and launch\nSPACE: Pause\nR: Restart level'
  }
];

async function seedGuides() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'retro_game_portal'
  });

  try {
    for (const guide of guides) {
      await connection.execute(
        'INSERT INTO guides (gameId, title, content, tips, keyboardShortcuts) VALUES (?, ?, ?, ?, ?)',
        [guide.gameId, guide.title, guide.content, guide.tips, guide.keyboardShortcuts]
      );
    }
    console.log(`✓ Seeded ${guides.length} game guides`);
  } catch (error) {
    console.error('Error seeding guides:', error);
  } finally {
    await connection.end();
  }
}

seedGuides();
