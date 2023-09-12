import crypto from 'crypto';
import fs from 'fs';
import path from 'path';


  // Seed random number generator
  function seededRandom(seed: number) {
    console.log(seed);
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

function getUserCards(cards: String, user: any) {
  // Generate a hash from the username for seeding the random number generator
  const hash = crypto.createHash('sha256').update(user).digest('hex');

  const generatedCards: any[] = [];
  let cardsToAdd = 10;
  let i = 0;
  
  while(cardsToAdd > 0) {

    let seed = parseInt(hash.substring(0, 15), 16);  
    const index = Math.floor(seededRandom(seed + i * 1000) * cards.length);
    const card = cards[index];

    if(generatedCards.indexOf(card) !== -1) {
      i++;
      continue;
    }

    generatedCards.push(card);
    cardsToAdd--;
  }

  return generatedCards;
}

export default defineEventHandler((event) => {
  
  const db = JSON.parse(fs.readFileSync(path.resolve('db.json'), 'utf-8'));
  if(!db) return createError({statusCode: 500, message: "internal server error"});

  let user = event.context.params?.name;
  if(!user) return createError({statusCode: 400, message: "bad request"});

  let found = db.players.map((x: string) => x.toLowerCase()).indexOf(user.toLowerCase()) !== -1;
  if(!found) return createError({statusCode: 404, message: "user not found"});
    
  return {
    cards: getUserCards(db.bingo, user)
  };

});
