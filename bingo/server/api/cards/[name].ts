import crypto from 'crypto';
import fs from 'fs';
import path from 'path';


const db = {
  "players": [
      "AleG",
      "AleS",
      "AnnL",
      "DanH",
      "DenR",
      "DusK",
      "EilW",
      "EliD",
      "EraB",
      "EugT",
      "FabA",
      "GorM",
      "HarW",
      "JanV",
      "KlaL",
      "LeoD",
      "MafR",
      "MalB",
      "MarS",
      "MarW",
      "MicT",
      "MirB",
      "NatC",
      "NesD",
      "OlgS",
      "PasL",
      "PatS",
      "PreS",
      "RavS",
      "SasS",
      "SveN",
      "SyuH",
      "ThiS",
      "TimW",
      "RavS"
  ],
  "bingo": [
      "One More Thing",
      "iPhone 15: New Battery Tech",
      "Craig Federighi Showcases New Features",
      "Watch 8: New Health Metrics",
      "iPhone 15: NFT Wallet Integration",
      "Apple Car Update",
      "AirPower Mentioned",
      "New Apple Watch Band Materials",
      "Periscope Lens",
      "Transition to secret location in Apple Park",
      "11th gen iPad",
      "S9 Chip",
      "Action Button",
      "Apple Watch Ultra 2",
      "USB-C iPhone",
      "Titanium",
      "iPhone 15 Ultra",
      "New CarPlay features",
      "Our best ... ever",
      "A17 Chip",
      "$100 increase to either Pro model",
      "Story how Apple product improved someone's life",
      "iPhone 15 available in 6 colors",
      "USB-C AirPods",
      "Dynamic Island replaces Notch",
      "Apple TV updates",
      "HomePod updates",
      "Vegan Leather case",
      "Vision Pro updates",
      "WiFi 6E",
      "Tim Cook Talks Environmental Initiatives",
      "AirPods Pro 2 Announced",
      "macOS Update Preview",
      "Apple Fitness+ New Features",
      "iOS 17: iMessage Improvements",
      "Improved Battery Life for iPhone and Watch",
      "Apple Store App Updated",
      "New MacBook Models",
      "Subscription Bundle for Services",
      "Apple Pencil 3 Announced",
      "Apple Card New Features",
      "New iOS Features: Improved Siri",
      "Apple Pay Expansion",
      "Stock Price Change Mentioned",
      "Innovation Mentioned More Than 10 Times",
      "Apple Maps Update",
      "Tim Cook Comments on Privacy",
      "New Apple TV+ Series",
      "Dark Mode Extended to All Apps",
      "Apple Patents Mentioned",
      "iPad Pro Updates",
      "New Animojis Announced",
      "Apple Music Update",
      "iMessage for Android Teased",
      "Tim Cook Acknowledges Android Market",
      "Apple Watch Series 8 with Blood Sugar Monitoring",
      "Apple Stock Split Teased",
      "New Magnetic Charging for iPhone",
      "Apple Trade-In Program Expanded",
      "New Mac Pro Announced",
      "Face ID Improvements",
      "New Retina Display Tech",
      "Enhanced Airdrop Features",
      "5G Capabilities Improved",
      "iMac Color Updates",
      "Apple Watch Additional Sensors",
      "Touch ID Under Display for iPhone",
      "Siri Updates",
      "Apple Campus New Green Initiatives",
      "Apple Arcade Adds New Games",
      "Tim Cook Selfie with New iPhone",
      "New Magic Mouse Released",
      "Apple Enters New Market",
      "Apple Books Updates",
      "iPad Multi-User Support",
      "iCloud+ Enhanced Features",
      "Apple Watch Solar Charging",
      "Safari Browser Updates",
      "Podcast Subscription Updates",
      "Preview of Next iOS Version",
      "New Ringtones by Famous Musicians",
      "Apple News Features",
      "Event Starts on Time",
      "Touch Bar Update or Removal",
      "New AirTags Features",
      "iCloud New Security Features",
      "Apple Watch Series 8: New Fitness Features",
      "HomeKit Updates",
      "New Apple Store Openings",
      "First Look at Future Projects",
      "Craig Federighi's Dad Jokes",
      "Updated AirPods Design",
      "Tim Cook Talks Diversity and Inclusion",
      "Sign in With Apple Update",
      "New MacBook Detachable Screen",
      "Pro Apps Updated (Final Cut, Logic)",
      "Apple Music Lossless Audio",
      "Watch 8: New Customization Options",
      "MacBook Air New Features",
      "Apple HealthKit Update",
      "Jonathan Ive Mentioned",
      "Special Guest Appearance",
      "Watch 8: New Watch Faces",
      "Memoji Update",
      "Tim Cook Addresses Supply Chain Issues",
      "iPadOS Update",
      "Apple Services Milestone",
      "Apple Wallet Update",
      "AppleTV Remote Update",
      "Apple Cash Expansion",
      "Accessibility Features Update",
      "Employee Spotlight or Success Story",
      "No Dongles",
      "Apple Acquires a Meme",
      "Craig Federighi's Hair Gets Its Own Twitter Account",
      "New iPhone 15: Now Powered by Love",
      "Apple Watch Now Comes with Flair",
      "Siri Gets Sassy",
      "Tim Cook Wears a Disguise",
      "Virtual Craig Federighi AR Experience",
      "AirPods Now Make Coffee",
      "New Emoji: Craig Federighi Face",
      "Animoji Karaoke Segment",
      "Podcast Subscription for Dogs",
      "Tim Cook's Secret Recipe App",
      "Find My...Socks",
      "Siri Tells a Dad Joke",
      "Foldable iPhone Tease",
      "iPet: Apple's Pet Monitoring System",
      "Tim Cook Takes Flight with AR Wings",
      "Apple's New Social Network: iFriend",
      "App Store for Physical Products",
      "AirPods Now Speak Multiple Languages",
      "Craig Federighi Virtual Hug"
    ]
}


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
  
  // const db = JSON.parse(fs.readFileSync(path.resolve('db.json'), 'utf-8'));
  // if(!db) return createError({statusCode: 500, message: "internal server error"});

  let user = event.context.params?.name;
  if(!user) return createError({statusCode: 400, message: "bad request"});

  let found = db.players.map((x: string) => x.toLowerCase()).indexOf(user.toLowerCase()) !== -1;
  if(!found) return createError({statusCode: 404, message: "user not found"});
    
  return {
    cards: getUserCards(db.bingo, user)
  };

});
