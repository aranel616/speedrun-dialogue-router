import { Script } from "../../types";

export const script: Script = {
    // ===================== Alternative Beach =====================
    "start": {
        "text": [
            "It's weird hanging out with you again.",
            "I know... I'm glad we are, though.",
            "It was nice that you sent me actual letters. That's more than any of my other friends have done... And you even wrote on that cool parchment paper. That's so Max.",
            "So pretentious. But I love writing on it, like an English poet. You deserve the best stationery.",
            "Probably easier to write than to visit me. I don't mean that in a bitchy way. Not totally. You probably wanted to avoid awkward conversations like this.",
            "Uh...pretty much, yeah.",
            "Look, the worst thing you can do is treat me like a baby. I still want to laugh and talk shit with my best friend. Can we stop? This is seriously the best view of the sunset. What do photographers call that?",
            "\"The golden hour.\"",
            "See? Without you here, I'd have no clue. Bet you could take some amazing shots... Those beached whales are so sad. I kind of know how they feel... At least I'm alive here with you.",
            "You're a real survivor, Chloe. I know you have to deal with so much.",
            "I don't want anybody else feeling sorry for me. I can do that...along with my parents. My dad still feels guilty about buying me that car."
        ],
        "next": "alt_beach_1"
    },
    "alt_beach_1": {
        "choices": [
            {
                "name": "Talk about accident?",
                "text": [
                    "Are you okay to talk about the accident?",
                    "We never actually have, huh? There's not much to say. Some prick in an SUV cut me off and I flew into a ditch."
                ],
                "next": "alt_beach_2"
            },
            {
                "name": "Blame William?",
                "text": [
                    "You don't really blame William...do you?",
                    "For getting me the hybrid I wanted for my sweet sixteen? No, I blame the asshole who cut me off and sent me into a ditch."
                ],
                "next": "alt_beach_2"
            }
        ]
    },
    "alt_beach_2": {
        "text": [
            "Do you...remember everything?",
            "I saw everything in bullet time. I felt my back snap and... And that was the last thing I ever felt in my body. When I woke up in the hospital, I literally couldn't move a muscle.",
            "Jesus! I...I don't know what to say.",
            "Don't say anything. I'm just happy I did get to see you again. I could have ended up vanishing out of the blue like that girl from Blackwell."
        ],
        "next": "alt_beach_3"
    },
    "alt_beach_3": {
        "choices": [
            {
                "name": "You mean Rachel?",
                "text": [
                    "You mean Rachel Amber? When was the last time you talked to her?",
                    "Uh, never. I just read about her in the news. I didn't even know her name. You did?"
                ],
                "next": "alt_beach_4"
            },
            {
                "name": "What missing girl?",
                "text": [
                    "What missing girl?",
                    "I don't know her name, just read about it in the news. I feel bad for her family."
                ],
                "next": "alt_beach_4"
            }
        ]
    },
    "alt_beach_4": {
        "text": [
            "This is such a different world than when we were kids, isn't it...",
            "After that snow and eclipse, it's more like the end of the world."
        ],
        "next": "alt_beach_5"
    },
    "alt_beach_5": {
        "choices": [
            {
                "name": "You think?",
                "text": [
                    "Do you think so? I haven't kept up with the details.",
                    "I have more time on my hands than you... Plus I'm a science nerd. But none of this makes sense."
                ],
                "next": "alt_beach_6"
            },
            {
                "name": "It might be.",
                "text": [
                    "It might be, but...I'd like to think we can still change things for the better.",
                    "I'd like to think that too...but I don't have much hope these days."
                ],
                "next": "alt_beach_6"
            },
            {
                "name": "Don't say that.",
                "text": [
                    "Don't say that.",
                    "Not trying to bum you out. It just seems like Arcadia Bay is having a meltdown."
                ],
                "next": "alt_beach_6"
            }
        ]
    },
    "alt_beach_6": {
        "text": [
            "I know things seem out of control, but...as long as we're together, I don't feel afraid.",
            "Hanging out with you makes me feel like a total kid again. You don't even know...",
            "Listen, Chloe...I'm sorry I haven't been out to see you more. That was wrong. You're my best friend.",
            "Max, thanks for coming out to see me. You're...you're doing awesome.",
            "I don't think so.",
            "Um. My...my nose is getting cold. Maybe we should get back to my place.",
            "It is hella cold out here.",
            "\"Hella\"? I hate that word, no offense.",
            "None taken."
        ],
        "next": "alt_room_1"
    },

    // ===================== Alternative Chloe's Room =====================
    "alt_room_1": {
        "text": [
            "This is a pretty high-tech lair.",
            "Feels like a high-tech cell. But I am lucky my parents bust their ass to take care of me. I know it's hard for them...",
            "They're grateful you are here with them.",
            "Right. Especially when they can't even take a walk alone. Sometimes I act like a total teenage brat just to give them an excuse to yell at me. Pathetic, I know.",
            "Chloe, you're a great daughter. You're kind and sensitive, when you don't even have to be.",
            "Trust me, I still get my rage on. Especially when a nurse has to watch while I take a dump, so she can wipe my bum. Or when doctors flip me around like I was a science doll...",
            "I can't even imagine... But you're still amazing. You always have been since we were kids.",
            "Thanks again for coming, Max. I, uh...need to get my drink on. Can you bring me some water?",
            "Drink up, buttercup.",
            "Oh man, no wonder my throat is dry. I don't think I've talked this much the whole year.",
            "Have you ever thought about doing a podcast or something?",
            "I wish I could punch your face right now. A podcast? Dude, I am a pod in a cast. Boring.",
            "Ouch. It was just a thought...",
            "I know you're just trying to help.",
            "Yeah, that's become a bad habit of mine...",
            "You sound like an adult now. It seems like we were kids in another life."
        ],
        "next": "alt_room_2"
    },
    "alt_room_2": {
        "choices": [
            {
                "name": "You're right.",
                "text": [
                    "You're right... I wish I could take us all the way back there again.",
                    "Wish I could build us a...DeLorean.",
                    "Well, um, with your scientific mind, you might do that. But time travel can screw things up, too...",
                    "Plus, you'd have to be my live-in assistant to help me build a machine."
                ],
                "next": "alt_room_3"
            },
            {
                "name": "What do you remember?",
                "text": [
                    "What do you remember about us as kids? We all have different memories...",
                    "I think about us as little pirates, running and jumping through Arcadia Bay.",
                    "Me too. But, we're still pirates in our own way.",
                    "Uh, yeah, right. Check me out, \"Chloe of the Caribbean.\" No way will I get on a fucking boat now. Unless you're with me."
                ],
                "next": "alt_room_3"
            },
            {
                "name": "Seems like yesterday.",
                "text": [
                    "To me, it seems like yesterday we were little brats here, watching \"Power Rangers\" and destroying the kitchen.",
                    "Oh my God, we covered everything in flour, even my parents.",
                    "That was so hilarious!",
                    "But a long time ago. You're the only person I grew up with who visits me..."
                ],
                "next": "alt_room_3"
            }
        ]
    },
    "alt_room_3": {
        "choices": [
            {
                "name": "Which friends?",
                "text": [
                    "Which friends did you hang out with the most?",
                    "Megan Weaver, but you don't know her. She was cool. But after my accident she was too cool for school."
                ],
                "next": "alt_room_4"
            },
            {
                "name": "You have me.",
                "text": [
                    "You have me. I'm not leaving you, Chloe.",
                    "Well, you didn't visit me a lot either. I mean, I loved your cards and photos, but..."
                ],
                "next": "alt_room_4"
            }
        ]
    },
    "alt_room_4": {
        "text": [
            "I know I wasn't around much. No excuses, I'm a loser. But, I am trying to make things right.",
            "How? Dude, you're not Super Max. And I'm not trying to guilt-trip you. That's what my parents are for..."
        ],
        "next": "alt_room_5"
    },
    "alt_room_5": {
        "choices": [
            {
                "name": "Are they okay?",
                "text": [
                    "Are they okay? I mean, are they still happy together and everything?",
                    "So now you're Dr. Bill? I guess they're good, considering they have to deal with me. They laugh and hold hands...and I hope they still get busy too..."
                ],
                "next": "alt_room_6"
            },
            {
                "name": "Are you lonely?",
                "text": [
                    "I know this is a dumb question, but...are you lonely here?",
                    "Yes, dumb question. I don't mind being alone. I can't exactly go party like a rock star, though...or get in any teen trouble with the folks."
                ],
                "next": "alt_room_6"
            },
            {
                "name": "They love you.",
                "text": [
                    "They love you so much.",
                    "I know. My mom and dad are so cute. They always pop in here and make sure everything's okay with me."
                ],
                "next": "alt_room_6"
            }
        ]
    },
    "alt_room_6": {
        "text": [
            "I think Joyce and William are incredible.",
            "Max, the accident has been so hard on them. Our insurance sucks and the medical bills are fucking insane."
        ],
        "next": "alt_room_7"
    },
    "alt_room_7": {
        "choices": [
            {
                "name": "I bet.",
                "text": [
                    "I bet. This tech must be crazy expensive.",
                    "Along with the drugs, the nurses, the supplies... Mom and Dad are always broke and they get so frustrated... Is it worth it?"
                ],
                "next": "alt_room_8"
            },
            {
                "name": "Can they pay?",
                "text": [
                    "Can they pay all the bills?",
                    "No way. They keep the numbers away from me, but it doesn't take much research to find out I'm costing my parents almost a million dollars a year."
                ],
                "next": "alt_room_8"
            }
        ]
    },
    "alt_room_8": {
        "text": [
            "Chloe, you're priceless. Uh, no pun intended.",
            "You are such a geek. That's why I love you. Of course, I know a geek when I be one. See, I'm practically a human entertainment system. It would be sweet to chill out together and watch a movie, like when you'd spend the night at my house...",
            "What do you want to watch?",
            "Uh, I think I'm in, like, a mellow \"Blade Runner\" mood. I always cry at the end. Plus you know I always wanted to have cool colored bangs like Pris.",
            "I know. You would look incredible with blue hair. Now let's get this show on the road. And you better not fall asleep on me, like you always do when we watch movies.",
            "I remember, Max. Swear I won't fall asleep. Not when you're here. Not yet."
        ],
        "next": "alt_morphine"
    },
    "alt_morphine": {
        "text": [
            "Finally. Give me the blue pill...",
            "I'm sorry. I'm nosy, but not precise.",
            "Go ahead and plug it right in. It's so easy. And painless.",
            "Um, okay, but get ready to yell for your folks if I screw up.",
            "Oh, trust me, I will. Of course, my pain just keeps getting worse...but you caught me on a good day. Max, I'm so grateful that I'm even able to hang out with you. See, I'm getting mushy. I'm already high.",
            "You are so adorable. Do you want anything else?",
            "Um, stop me if I'm being too emo, but can you grab one of the photo albums over there? I'd like to check out some old pictures of us when we were kids.",
            "Please. My diary is like emo ground zero. Plus Max Caulfield does not pass up a photo op with Chloe Price. Ever.",
            "Is that okay?",
            "Perfect. Oh my god, look how little we are there! We look like toys!",
            "I remember that day by the lighthouse.",
            "My dad was pissed at us. He actually tried to give us a time-out!",
            "And you laughed at him. My dad would have banished me.",
            "Whoa, awesome picture. We look so badass in our pirate gear.",
            "We should have taken over Arcadia Bay when we had the chance.",
            "There's still time for you...",
            "Oh man, there we are making pancakes. I love that shot of us. It's hard to believe my dad took that picture only five years ago.",
            "Literally seems like yesterday...",
            "I wish it was.",
            "Me too...",
            "This photo... Maybe I could...",
            "Listen, Max, my respiratory system is failing and...and it's only getting worse. I've heard the doctors talking about it when they thought I was zonked out. So I know I'm just putting off the inevitable, while my parents suffer along...and I will, too. This isn't how I want things to end.",
            "What? What are you saying?",
            "I'm saying that being with you again has been so special. I just wanted to feel like when we were kids running around Arcadia Bay...and everything was possible. And you made me feel that way today. I want this time with you to be my last memory... Do you understand?",
            "Yes, I do.",
            "All you have to do is crank up the IV to eleven..."
        ],
        "next": "alt_euthanasia"
    },
    "alt_euthanasia": {
        "choices": [
            {
                "name": "ACCEPT",
                "text": [
                    "Chloe...",
                    "I'll just drift asleep...dreaming of us here together...forever.",
                    "Thank you so much. I'm so proud of you for following your dreams. Don't forget about me.",
                    "Never.",
                    "I love you, Max. See you around.",
                    "Sooner than you think."
                ],
                "next": "alt_focus"
            },
            {
                "name": "REFUSE",
                "text": [
                    "Chloe...I can't. It wrecks me to see you in any pain, but I don't have any right to do this.",
                    "I'm an adult. I'm giving you the right.",
                    "But Joyce...and William...",
                    "I already said my goodbyes to them, but they won't honor my wishes. You will...right?",
                    "I can't...kill you with an overdose.",
                    "Max, I'm dying from my illness, not my dosage. This accelerates the process. I'd rather go out on a wave than a rock. And I want my best friend to help me out...",
                    "I'm going to help you, but not like that. You have to believe me, Chloe.",
                    "Why, Max? You're just bailing on me like everybody else! Why don't you go now? You've been wanting to since you got here, right? So go and don't come back.",
                    "Chloe, I am never leaving you again."
                ],
                "next": "alt_focus"
            },
            {
                "name": "I DON'T KNOW",
                "text": [
                    "Chloe...I really don't know if I can do this. I had another friend who wanted to...end it all and I did everything I could to try and save her life. How can I be responsible for ending yours? I mean, there's got to be another way.",
                    "Max, you were there for your friend no matter what. Now I'm asking you to help me the same way.",
                    "I want to help you, Chloe, but I think my help is hurting.",
                    "At least you have a choice. When you want to make a decision, you can just do it. Look at me, I'm at the mercy of...everybody. For once, I want to make my own choice...the most important one of my life. Please...help me, Max."
                ],
                "next": "alt_euthanasia"
            }
        ]
    },
    "alt_focus": {
        "text": "I'm sorry, William...",
        "next": "alt_2008"
    },

    // ===================== Young Chloe's House (2008) =====================
    "alt_2008": {
        "text": [
            "Someday Dad will get one of them newfangled computers.",
            "I hope the flash didn't scare you, Max. This is a keeper.",
            "Hello? Hey, honey... What? Oh, I didn't know you had to get groceries. Of course I'll come pick you up.",
            "Shit, where are my keys?",
            "That's a dollar for the swear jar!",
            "You mean your college fund. Keys, please...",
            "A-ha! You can't hide from me forever!",
            "And no Chloe and Max wine-tasting session...",
            "Dad!",
            "Don't blow it because tonight your mother promised to make her world-famous salmon surprise with chocolate cake for dessert. Max, you'll be here too, right?",
            "She's never leaving me!",
            "That makes all of us.",
            "Max, you are being so fucking strange, like you're never going to see us again.",
            "Chloe, I'm so sorry... I tried to make things different for you... I...I did try...I'm sorry.",
            "I don't know exactly what you're talking about, but come on. You have made things different, like my whole life. You're my best friend. I've got you and a great family. What's to be sorry for? We'll be best friends forever. And when we grow up we're taking over the world.",
            "Listen, whatever happens, I want you to be strong. Even if you feel like I wasn't there for you...because I will never abandon you, Chloe. I'll always have your back. Always."
        ],
        "next": "real_room_1"
    },

    // ===================== Chloe's Room (back to reality) =====================
    "real_room_1": {
        "choices": [
            { "name": "Accepted Alternative Chloe's request", "text": "Chloe...you're alive. Yes!", "next": "real_room_kiss" },
            { "name": "Refused Alternative Chloe's request", "text": "Chloe...you're back.", "next": "real_room_kiss" }
        ]
    },
    "real_room_kiss": {
        "choices": [
            { "name": "Kissed Chloe", "text": "Whoa! Down, Max! You get one kiss and now you're all over me...", "next": "real_room_2" },
            { "name": "Didn't kiss Chloe", "text": "Oh yeah, now you suddenly want to kiss me? You had your chance.", "next": "real_room_2" },
            { "name": "Skipped that scene (Glitched Out of Bounds)", "text": "", "next": "real_room_2" }
        ]
    },
    "real_room_2": {
        "text": [
            "I'm just...I'm just--I'm so glad you're here!",
            "You sound high, but thanks for the morning grope. Since we were up all night playing \"CSI: Arcadia Bay,\" I was still spaced out here, trying to put all this info together. Max, did you forget we've gone over this? I hope you weren't messing around with time while I was sleeping...",
            "Not anymore. I'm just spaced out, too.",
            "Welcome back to the real world, Max... I don't think I can ever tell Chloe about what happened.",
            "Let's look at the big board and see all our pieces in the puzzle so far.",
            "So close, yet so far away... We have to do three main things.",
            "Right...uh, what things?",
            "One, decipher Frank's logbook. Two, get Nathan's phone to find out where he's been during the Vortex Club parties with Kate and Rachel. And see whatever hidden shit he's got in his messages.",
            "Three, beat step-douche down until he tells us about Frank, Nathan, and the \"Dark Room.\""
        ],
        "next": "real_room_3"
    },
    "real_room_3": {
        "choices": [
            { "name": "Chloe has a gun", "text": ["And I do have a gun now...", "Keep it in your pants."], "next": "real_room_4" },
            { "name": "Chloe doesn't have a gun", "text": ["Too bad I don't have a gun anymore...", "Yes, that's the solution."], "next": "real_room_4" }
        ]
    },
    "real_room_4": {
        "text": [
            "We'll have to do this on our own.",
            "Dude, at least let me kick his ass, then rewind--Fine, whatevs, it's your power.",
            "Which I can't waste on shit like that. Or Blackwell would be in big trouble."
        ],
        "next": "real_room_5"
    },
    "real_room_5": {
        "choices": [
            { "name": "Left the money", "text": ["You didn't even let me take that money to pay Frank off.", "And I'm glad. We have to be better than that."], "next": "real_room_6" },
            { "name": "Stole the money", "text": ["At least you let me take that money to pay Frank off.", "Don't remind me. I just want him off your back. Our back..."], "next": "real_room_6" }
        ]
    },
    "real_room_6": {
        "text": "I know. You should get busy in the garage to see what dirt you can dig up. I'm going to cyberstalk some names and see where that leads...or to who.",
        "next": "real_room_7"
    },
    "real_room_7": {
        "choices": [
            { "name": "Sided with David", "text": ["And be careful of step-crack...unless you want to hang out with him after you stood up for his ass yesterday.", "Oh, please."], "next": "real_room_8" },
            { "name": "Sided with Chloe", "text": ["And be careful of step-crack. He's not going to be a happy camper after you reamed him yesterday, and Mom is giving him the boot...", "I'm on it, partner."], "next": "real_room_8" }
        ]
    },
    "real_room_8": {
        "text": "I can't abuse this level of my rewind power... It's way too dangerous, and I need to navigate the present without messing up the past...",
        "next": "upstairs_bird"
    },

    // ===================== Upstairs / Downstairs (bird, David) =====================
    "upstairs_bird": {
        "choices": [
            { "name": "Saved the bird", "text": ["Oh no, that poor little bird has been trapped in here!", "Fly! Be free!"], "next": "downstairs_david" },
            { "name": "Let the bird die", "text": "", "next": "downstairs_david" }
        ]
    },
    "downstairs_david": {
        "choices": [
            { "name": "Sided with David", "text": "", "next": "garage" },
            {
                "name": "Sided with Chloe",
                "text": [
                    "You won this battle, Max. You broke up my family. I salute you.",
                    "David, I didn't try to hurt you. Ever. But I won't let anybody hurt Chloe.",
                    "Too late, isn't it? You just better be damn careful with her. Don't you wander off into the dark..."
                ],
                "next": "garage"
            }
        ]
    },

    // ===================== David's Garage =====================
    "garage": {
        "text": [
            "It looks like David finished his car repairs. Maybe there's some new clues around.",
            "I better go scope out those lockers.",
            "Whoa, that is a serious padlock on that locker. Hey, David, whatcha hidin'?",
            "Oh yes, I knew that number would be important."
        ],
        "next": "garage_open"
    },
    "garage_open": {
        "choices": [
            {
                "name": "(Sided with David)",
                "text": [
                    "For once, I don't have time to search for the code... I need to find a key.",
                    "Excuse me, Max! Do not touch one goddamn thing!",
                    "Come on, Max, find a way to get David out of his cave...",
                    "I can't let David see me while I snag his keys. Enter the ninja...",
                    "Son of a bitch, I just fixed that fuse box!",
                    "Shit. Somebody fix the fuse!",
                    "Gotcha!",
                    "I am the Keymaster!"
                ],
                "next": "garage_locker"
            },
            {
                "name": "(Sided with Chloe)",
                "text": [
                    "For once, I don't have time to search for the code... I need to find a way to break this padlock.",
                    "Okay, I can use that crowbar to pry open the locker.",
                    "Sorry, David, but I bet you would do the same thing as me."
                ],
                "next": "garage_locker"
            }
        ]
    },
    "garage_locker": {
        "text": [
            "Whoa... Maps, notes, coordinates, photos of Kate, Nathan... Oh, yes!",
            "Score! Back to Chloe now.",
            "Yo, Chloe, are you ready yet? I have to get back to my dorm!",
            "Are we happy?",
            "Very happy. I hit the secret file jackpot. Kate, Nathan, and Rachel. Plus, there's some location coordinates. David is, like, a one-man surveillance army. Now let's get the hell out of here, before we get busted."
        ],
        "next": "garage_next"
    },
    "garage_next": {
        "choices": [
            {
                "name": "(Saved Kate)",
                "text": "But I absolutely have to go see Kate in the hospital right now. I want to find out how she's doing.",
                "next": "hospital"
            },
            {
                "name": "(Couldn't save Kate)",
                "text": [
                    "Now let's go find out what Nathan is hiding in his room.",
                    "We have to be extra careful.",
                    "Max, now it's time for Nathan Prescott to be afraid of us."
                ],
                "next": "dorm_intro"
            }
        ]
    },

    // ===================== Hospital (only if Kate was saved) =====================
    "hospital": {
        "text": [
            "This is definitely Kate's floor.",
            "Hospitals always freak me out.",
            "I hear you. But imagine how Kate feels... I'm so glad I get to see her again. I hope it's not too weird for her.",
            "No, she'll be stoked to see you. Who wouldn't be?",
            "This be it. I'm a little nervous...",
            "Just go in there and be her friend. I'll wait out here so you can chill by yourselves."
        ],
        "next": "hospital_call"
    },
    "hospital_call": {
        "choices": [
            {
                "name": "(Answered Kate's call)",
                "text": "I was a total dick for blowing a fuse when you answered Kate's call the other day. Good thing you ignored me. I had no idea what shit she was going through. And you saved her... like me.",
                "next": "hospital_kate_intro"
            },
            {
                "name": "(Didn't answer Kate's call)",
                "text": "I was a... I was a total dick for blowing a fuse when Kate called the other day. I had no idea what shit she was going through. I stopped you from being her friend. But you saved her... like me.",
                "next": "hospital_kate_intro"
            }
        ]
    },
    "hospital_kate_intro": {
        "text": [
            "I'm sorry.",
            "Thanks, Chloe, but don't be sorry. We're all on the same team.",
            "Team Max. Let Kate know we're gonna string Nathan up by his balls then.",
            "Oh, yes. I'm on it.",
            "Max!",
            "Oh, Kate!",
            "I thought I'd never see you again. I feel so ridiculous... I'm so sorry.",
            "Kate, listen to me... you have nothing to be sorry about. Other people do. You do not know how happy I am to see you. You look awesome. Is it a stupid question if I ask how you're doing?",
            "Now that you're here, I'm doing even better. I'm so grateful to you for coming up to the roof to talk me down... Max, I felt so lost and alone... but when I saw how much you cared, how hard you were trying... you made me realize I wasn't alone. Thank you.",
            "Kate, there are so many people who love you and want to help you.",
            "I know, you should see all the letters and postcards. I gave most of the flowers to other patients here because they need them more than me. I'm keeping the balloons, though. One of the nurses gave me some pen and paper so I could do some drawings.",
            "I love your illustrations.",
            "They got kind of dark there for a while, but I have an idea for a new children's book about bullying... I was thinking about having some photographs in there too.",
            "I hope that's a subtle hint that you'll let me take the photographs for the book...",
            "Was that subtle? You better take the pictures, Max. I'm going to be here for another day until my family comes out to visit.",
            "How are they treating you?",
            "Like they need to protect me forever. They're so upset and I know they feel guilty, even though they didn't do anything. I was surprised how many students from Blackwell wrote me. Daniel, Mr. Jefferson... Even Victoria wrote me a very sweet note... and I believe she was being real.",
            "Me too. I'm glad you believe again, Kate.",
            "I'm working on it, Max. I just pray I can get this drawing right...",
            "Kate, it is so good to hang out with you again.",
            "Max, I owe you so much. And I can tell you want to talk to me about something."
        ],
        "next": "hospital_kate_topics"
    },
    "hospital_kate_topics": {
        "choices": [
            {
                "name": "Kate.",
                "text": [
                    "I always want to talk to you...",
                    "We missed our tea session this week...",
                    "That was so not cool. We need to plan, like, a tea shop tour of Portland.",
                    "Oh yes! And you could bring Warren along too..."
                ],
                "next": "hospital_kate_warren"
            },
            {
                "name": "Victoria. (after looking at postcard)",
                "text": [
                    "I saw Victoria's letter... How does that make you feel?",
                    "Max, I know Victoria can be a... a... not nice. But, I do believe in forgiveness and redemption. I might be naive, but I feel her struggle."
                ],
                "next": "hospital_kate_vic"
            },
            {
                "name": "Nathan.",
                "text": [
                    "I want you to know I'm this close to getting all the info I need about Nathan...",
                    "Nathan Prescott has to pay for what he did. And we have to stop him from hurting anybody else."
                ],
                "next": "hospital_kate_nathan"
            },
            {
                "name": "Leave.",
                "text": [
                    "I have to get back to our mission. You don't know how much it means to see you again.",
                    "I do. That's why I love you, Max. And thanks for taking care of my bunny. Tell Alice I'll see her soon."
                ],
                "next": "hospital_exit"
            }
        ]
    },
    "hospital_kate_warren": {
        "choices": [
            {
                "name": "Warren?",
                "text": [
                    "What do you think of Warren?",
                    "Oh, smart and silly... He's got such a good heart. And he's a cutie pie. You know he likes you..."
                ],
                "next": "hospital_kate_warren2"
            },
            {
                "name": "No boys allowed.",
                "text": [
                    "No boys allowed.",
                    "You are funny, Max. And right."
                ],
                "next": "hospital_exit"
            }
        ]
    },
    "hospital_kate_warren2": {
        "choices": [
            {
                "name": "(Accepted Warren's invitation)",
                "text": [
                    "I'm going to the drive-in with him, so we'll see... With everything that's going on, a date seems weird...",
                    "No, you deserve that."
                ],
                "next": "hospital_kate_warren3"
            },
            {
                "name": "(Didn't accept Warren's invitation)",
                "text": [
                    "So I've heard. He asked me to go to the drive-in, but I turned him down.",
                    "Awww, really? You guys would be a perfect couple..."
                ],
                "next": "hospital_kate_warren3"
            }
        ]
    },
    "hospital_kate_warren3": {
        "text": [
            "Kate Marsh, matchmaker. I'm glad somebody is looking out for my love life.",
            "Even angels need angels, Max."
        ],
        "next": "hospital_exit"
    },
    "hospital_kate_vic": {
        "choices": [
            {
                "name": "(Made fun of Victoria)",
                "text": "I wasn't so nice to her this week either when I took a picture of her covered in paint. Not a proud moment.",
                "next": "hospital_kate_vic2"
            },
            {
                "name": "(Comforted Victoria)",
                "text": "Me too. I could've taken a picture of her covered in paint, but I didn't and we had a genuine moment.",
                "next": "hospital_kate_vic2"
            }
        ]
    },
    "hospital_kate_vic2": {
        "text": "We all have our moments. Why do you think she acts so mean?",
        "next": "hospital_kate_vic3"
    },
    "hospital_kate_vic3": {
        "choices": [
            {
                "name": "She's a bitch.",
                "text": [
                    "She's a bitch. I'm sorry, but... she's wealthy, pretty, and, yes, talented. So, there's no reason for her to treat people like shit.",
                    "Well, there must be. If Victoria could write me such a sincere letter..."
                ],
                "next": "hospital_kate_vic4"
            },
            {
                "name": "She's insecure.",
                "text": [
                    "She's insecure. If you're comfortable with yourself, you don't need to act superior.",
                    "Victoria doesn't look like she has much to be insecure about..."
                ],
                "next": "hospital_kate_vic4"
            }
        ]
    },
    "hospital_kate_vic4": {
        "text": [
            "If anybody could make Victoria see the light, it would be Kate Marsh.",
            "No, I think it will take more than that, Max."
        ],
        "next": "hospital_exit"
    },
    "hospital_kate_nathan": {
        "choices": [
            {
                "name": "(Nathan is suspended)",
                "text": [
                    "Well, I did get his ass suspended, so that might be a start...",
                    "You did? Oh, right on, Max! I love how fearless you are."
                ],
                "next": "hospital_kate_nathan2"
            },
            {
                "name": "(Nathan isn't suspended)",
                "text": [
                    "I wish I could've gotten his ass kicked out of Blackwell.",
                    "Me too. But his dad would never let that happen. I thought I had a tough family..."
                ],
                "next": "hospital_kate_nathan2"
            }
        ]
    },
    "hospital_kate_nathan2": {
        "text": "So what is going on with him now?",
        "next": "hospital_kate_nathan3"
    },
    "hospital_kate_nathan3": {
        "choices": [
            {
                "name": "Vortex Club.",
                "text": [
                    "I assume he'll show up at the Vortex Club party tonight like nothing happened.",
                    "And nobody can do anything to him after what he did."
                ],
                "next": "hospital_kate_nathan4"
            },
            {
                "name": "Prescott family.",
                "text": [
                    "I think his family is totally protecting him... or worse.",
                    "I never say this about people... but Max, there's something evil about the Prescotts. They have something to do with death."
                ],
                "next": "hospital_kate_nathan4"
            }
        ]
    },
    "hospital_kate_nathan4": {
        "text": [
            "We're going to stop him. I just have to find Nathan's room number, get inside and get the clues I need.",
            "Max, please let me help! I can get the number and I'll text it to you, okay?",
            "Of course, Kate! I can't do this without you!",
            "Now it's time for Nathan to watch out for us..."
        ],
        "next": "hospital_exit"
    },
    "hospital_exit": {
        "text": [
            "Hey, Kate, back again.",
            "Which makes me happy.",
            "Well, how is she?",
            "She's still Kate Marsh. Thank God.",
            "I'm glad we came to see her.",
            "Thanks for coming with me.",
            "Now let's go pay a visit to Nathan Prescott. That little prick is not gonna be glad when he sees us..."
        ],
        "next": "dorm_intro"
    },

    // ===================== Dormitories =====================
    "dorm_intro": {
        "text": [
            "Hey, Max. How you doing?",
            "Oh, hi, Mr. Jefferson. I'm okay. Um, and this is my...friend Chloe.",
            "Yo.",
            "Chloe, why isn't someone as cool as you going to Blackwell?",
            "I was way too cool for this school. It's a long story. In actual files here...",
            "I can imagine. Max, are you sure that you're alright?"
        ],
        "next": "dorm_jeff1"
    },
    "dorm_jeff1": {
        "choices": [
            {
                "name": "(Max isn't suspended)",
                "text": [
                    "It's weird just being on campus, like everything's normal.",
                    "I know. Lame as it sounds, life has to go on.",
                    "I think there's too much going on in my life."
                ],
                "next": "dorm_jeff_bridge"
            },
            {
                "name": "(Max is suspended)",
                "text": [
                    "It's weird being suspended and just walking around campus.",
                    "Well, you are an adult now. This isn't prison, is it?",
                    "Not until we get orange jumpsuits."
                ],
                "next": "dorm_jeff_bridge"
            }
        ]
    },
    "dorm_jeff_bridge": {
        "text": "On that note, Blackwell duty calls. Remember, I'm going to announce the winner of the \"Everyday Heroes\" contest tonight at the party, so I hope you'll be there to celebrate. Even though I'm sorry you didn't enter a photo, I understand your reasons. You can't force an artist to work.",
        "next": "dorm_jeff2"
    },
    "dorm_jeff2": {
        "choices": [
            { "name": "(Didn't blame Jefferson)", "text": "I feel like a total loser, but it's been a hard week to focus. No pun intended.", "next": "dorm_jeff3" },
            { "name": "(Blamed Jefferson)", "text": "So, you don't hate me for what I said to the Principal?", "next": "dorm_jeff3" }
        ]
    },
    "dorm_jeff3": {
        "text": [
            "I'm proud of you for caring so much about a troubled friend. And I take hope in the fact that you have plenty of time to find your way. Just...get in the habit of putting your work out there.",
            "Thanks, Mr. Jefferson. I'll definitely be there tonight.",
            "Me too. I'll be Max's date. You better dance with us at least once.",
            "Nobody should have to see me dance. Plus, you don't want to watch the old hipster trying to keep up with the kids... I have some pride. Be seeing you.",
            "Yes, you will.",
            "Hot for teacher.",
            "Gross! You are out of control.",
            "Not yet. Just wait until the rager tonight...",
            "Ugh, shut up.",
            "Don't be jealous because Mark Jefferson thinks I'm cool...",
            "I am so ignoring you.",
            "Fine. Since I'm here, I'll see if I can get some dirt from Justin. I haven't talked to him in a while...",
            "Now, that is a great plan.",
            "Let's see if I can find out where Nathan is..."
        ],
        "next": "dorm_hub"
    },
    "dorm_hub": {
        "choices": [
            { "name": "Talk to Daniel", "text": "", "next": "daniel_1" },
            { "name": "Talk to Ms. Grant", "text": "", "next": "grant_1" },
            { "name": "Talk to Samuel", "text": "", "next": "samuel_1" },
            { "name": "Talk to Brooke", "text": "", "next": "brooke_1" },
            { "name": "(Find Nathan's room)", "text": "", "next": "dorm_findnathan" }
        ]
    },

    // ----- Optional: Daniel -----
    "daniel_1": {
        "text": [
            "Hey, Daniel. You look bummed out... Are you alright?",
            "Hola, Max. I just figured out that my photos...basically suck. I'm a wannabe artist..."
        ],
        "next": "daniel_2"
    },
    "daniel_2": {
        "choices": [
            {
                "name": "Take different photos.",
                "text": [
                    "Maybe you should try different subjects...something more like your portraits.",
                    "That makes sense, but not if I can't choose the subjects in class. If only I could draw my photographs... I think I'll just sit here bummed out, thanks."
                ],
                "next": "dorm_hub"
            },
            {
                "name": "Draw your photos.",
                "text": [
                    "Daniel, your drawings are your photographs. So, draw the photos with your eyes and make the camera your \"lens pen.\"",
                    "\"Lens pen\"? Oh, I dig that, Max. That could work for me... I do feel better now. You are good, Max."
                ],
                "next": "daniel_topics"
            },
            {
                "name": "Don't give up.",
                "text": [
                    "Don't give up that easy. Just...stay away from your sketchbook for a while. You need to keep taking the shot, as Jefferson says.",
                    "Stay away from my sketchbook? You don't know me, Max. That's like you staying away from your camera. I think I'll just sit here bummed out, thanks."
                ],
                "next": "dorm_hub"
            }
        ]
    },
    "daniel_topics": {
        "choices": [
            { "name": "Kate.", "text": "Have you talked to anybody about what happened with Kate?", "next": "daniel_kate" },
            { "name": "Nathan.", "text": "By the way, have you seen Nathan Prescott?", "next": "daniel_nathan" },
            { "name": "End of the World party.", "text": ["Are you going to the \"End of the World\" party tonight?", "It will be if I go, man. People here push me into lockers, not dance floors."], "next": "daniel_party" },
            { "name": "Leave.", "text": "Let's talk later. Okay, Daniel?", "next": "dorm_hub" }
        ]
    },
    "daniel_kate": {
        "choices": [
            {
                "name": "(Saved Kate)",
                "text": [
                    "I...don't talk to anyone, Max. But I did actually have a nice talk with Brooke. She couldn't stop talking about how brave you were on that roof.",
                    "I don't think doing the right thing is \"brave,\" but I appreciate what she means. The most important thing is that Kate gets better...and gets justice.",
                    "I hear that, Max. She's the sweetest, most genuine person I've ever met. I don't mind getting picked on by Blackwell bro-holes, but don't fuck with Kate.",
                    "I like this revolutionary Daniel DaCosta.",
                    "Only if I can start the revolution from my sketchbook, Max."
                ],
                "next": "daniel_topics"
            },
            {
                "name": "(Couldn't save Kate)",
                "text": [
                    "I don't talk to anybody, Max. But I did actually have a conversation with Brooke. She was very sad about Kate.",
                    "So am I. And angry...",
                    "We should stop going to class and stage a protest. But that's not going to happen at Blackwell. Yet...",
                    "I like this revolutionary Daniel DaCosta.",
                    "Only if I can start the revolution from my sketchbook, Max."
                ],
                "next": "daniel_topics"
            }
        ]
    },
    "daniel_nathan": {
        "choices": [
            {
                "name": "(Nathan is suspended)",
                "text": [
                    "Ooh, I heard a rumor he's actually suspended...",
                    "Yeah, but he's still gotta be on campus.",
                    "That explains why he looked so pissed off when I saw him leaving campus a few moments ago."
                ],
                "next": "daniel_topics"
            },
            {
                "name": "(Nathan isn't suspended)",
                "text": [
                    "You mean lately?",
                    "Like anytime today.",
                    "I saw Jefferson talking with Nathan a little while ago, but I try to stay out of his way. I have enough assholes to deal with here."
                ],
                "next": "daniel_topics"
            }
        ]
    },
    "daniel_party": {
        "choices": [
            {
                "name": "Go to the party.",
                "text": [
                    "That's exactly why you should go to that party. We have to stand up to these Blackwell bullies for Kate. You won't be alone, Daniel.",
                    "Not with you to back me up, Max. Damn it, I will go to the party like it is the end of the world! Okay, maybe I won't go, but... No, I won't do that, but...I'll go."
                ],
                "next": "daniel_topics"
            },
            {
                "name": "Don't go to the party.",
                "text": [
                    "Screw the Vortex Club. They don't deserve you, Daniel.",
                    "They don't deserve anything. I mean, what do they actually do for Blackwell, huh? You're right, Max. Screw them."
                ],
                "next": "daniel_topics"
            }
        ]
    },

    // ----- Optional: Ms. Grant -----
    "grant_1": {
        "text": [
            "Hi, Ms. Grant.",
            "Max, you always show up when I'm talking about you."
        ],
        "next": "grant_petition"
    },
    "grant_petition": {
        "choices": [
            { "name": "(Signed the petition)", "text": "I'm still bragging about you and the other students making Blackwell surveillance-free.", "next": "grant_topics" },
            { "name": "(Didn't sign the petition)", "text": "And I swear it's not about that petition you didn't sign.", "next": "grant_topics" }
        ]
    },
    "grant_topics": {
        "choices": [
            {
                "name": "Recent events.",
                "text": [
                    "I was hoping you could explain some of these crazy things happening in Arcadia Bay...",
                    "If I could, I'd be collecting my Nobel prize in science today. I haven't been able to wrap my mind around that eclipse, much less the snow and whales..."
                ],
                "next": "grant_events"
            },
            {
                "name": "Nathan.",
                "text": "I was looking for Nathan Prescott and I thought he might be in your class...",
                "next": "grant_nathan"
            },
            {
                "name": "Kate.",
                "text": "I don't think surveillance would've helped Kate Marsh.",
                "next": "grant_kate"
            },
            {
                "name": "Leave.",
                "text": [
                    "I'm sorry, Ms. Grant, I have to get going. I'll see you later.",
                    "It's always good talking to you, Max."
                ],
                "next": "dorm_hub"
            }
        ]
    },
    "grant_events": {
        "choices": [
            {
                "name": "Scientific explanation.",
                "text": [
                    "There must be a scientific explanation...right?",
                    "When my friends at NASA tell me they can't explain a solar eclipse without a single theory as to how or why, maybe it's time to get worried. Like they are.",
                    "I am worried about reality... I feel like it's changing right in front of us.",
                    "You and Samuel both. We were talking about that before you came over. Our planet is changing, but it's not mystic. It's erosion."
                ],
                "next": "grant_topics"
            },
            {
                "name": "Beyond science.",
                "text": [
                    "I think this is beyond science.",
                    "Nothing is beyond science except for our lack of knowledge. We may never know why, but that doesn't change reality.",
                    "I am worried about reality... I feel like it's changing right in front of us.",
                    "You and Samuel both. We were talking about that before you came over. Our planet is changing, but it's not mystic. It's erosion."
                ],
                "next": "grant_topics"
            }
        ]
    },
    "grant_nathan": {
        "choices": [
            {
                "name": "(Nathan is suspended)",
                "text": [
                    "Mr. Prescott has no class at all, after his suspension. I didn't think you were friends.",
                    "Hell no. Sorry, Ms. Grant.",
                    "You're an adult, you can swear, damn it. And I'm glad you did. But I did catch him storming off campus. After what happened this week, I hope you don't see him either. You're not the best student here, but you--you might be the wisest."
                ],
                "next": "grant_topics"
            },
            {
                "name": "(Nathan isn't suspended)",
                "text": [
                    "I'm surprised, Max. I didn't think you and Nathan were exactly friends.",
                    "No way. I just have to... ask him a question.",
                    "I saw him leaving campus looking angrier than usual. But to be honest, Max, Nathan hasn't been too well lately. You might know more about that than me."
                ],
                "next": "grant_topics"
            }
        ]
    },
    "grant_kate": {
        "choices": [
            {
                "name": "(Saved Kate)",
                "text": [
                    "Who needs surveillance when we have Maxine Caulfield? You did a wonderful thing and now we have to make sure Kate gets the help she needs.",
                    "Kate was drugged at the Vortex Club party and bullied by them, until she ended up on the roof. How do you stop that?",
                    "Shut down that damn Vortex Club, for a start! That party should've been postponed. It's extremely tasteless given what happened with Kate."
                ],
                "next": "grant_topics"
            },
            {
                "name": "(Couldn't save Kate)",
                "text": [
                    "Oh, Max, I'm so sorry you had to go through that... Kate was the sweetest student I've ever met at Blackwell...and they can be so cruel to each other...",
                    "Kate was drugged at the Vortex Club party and bullied by them, until she ended up on the roof. How do you stop that?",
                    "Shut down that damn Vortex Club, for a start! That party should've been postponed. It's extremely tasteless given what happened with Kate."
                ],
                "next": "grant_topics"
            }
        ]
    },

    // ----- Optional: Samuel -----
    "samuel_1": {
        "text": [
            "How are you doing, Max? Been a tough week, I know.",
            "Yes, it has, Samuel. How are you?",
            "Sad and confused, like everybody else in Arcadia Bay. You look like you have a lot of questions, too..."
        ],
        "next": "samuel_topics"
    },
    "samuel_topics": {
        "choices": [
            { "name": "People.", "text": ["More questions than answers...", "Samuel is always here to talk."], "next": "samuel_people" },
            { "name": "Animals.", "text": ["I definitely have questions about what's happening to the animals in Arcadia Bay.", "Oh, many do. These poor creatures have no choice in what happens to them..."], "next": "samuel_animals" },
            { "name": "Arcadia Bay.", "text": ["I still have a million questions about what's happening to Arcadia Bay.", "That must be why Ms. Grant says you're one of her favorite students at Blackwell..."], "next": "samuel_bay" },
            { "name": "Leave.", "text": "I'm sorry, I better get going now.", "next": "dorm_hub" }
        ]
    },
    "samuel_people": {
        "choices": [
            {
                "name": "Kate.",
                "text": [
                    "Samuel, you're the eyes of Blackwell. Did you know Kate was being bullied?",
                    "Most everyone makes fun of me...but Samuel warned them about Kate. I hate bullies, Max.",
                    "I believe you.",
                    "Kate just needed some more helpful spirits like her friend Max. I hope she finds them now..."
                ],
                "next": "samuel_topics"
            },
            {
                "name": "Nathan.",
                "text": [
                    "Have you seen Nathan Prescott around?",
                    "Not enough to help you, Max. I truly wish I could... I see what you're doing..."
                ],
                "next": "samuel_topics"
            },
            {
                "name": "David.",
                "text": [
                    "Do you ever talk with David Madsen?",
                    "He sees things, not people. But I...I think he sees you, Max...",
                    "I think you have better vision than both of us...",
                    "No, Max, I just look at everything from...a different angle."
                ],
                "next": "samuel_topics"
            }
        ]
    },
    "samuel_animals": {
        "choices": [
            {
                "name": "Beached whales.",
                "text": [
                    "How can anybody explain all those poor beached whales...?",
                    "My dad was a fisherman, and he'd take me out to hear the whales sing... Now they...they just cry.",
                    "You think so, Samuel?",
                    "You and Arcadia Bay are connected by time and tide... So, next time I have a question, I'm coming to you."
                ],
                "next": "samuel_topics"
            },
            {
                "name": "Squirrels.",
                "text": [
                    "Well, I'm glad to see your squirrels are still healthy and happy on the campus.",
                    "Me too. If something happened to them... Oh...",
                    "Not as long as you're here to take care of them, Samuel.",
                    "The only thing that calms them is food. Lots of food. Which reminds me that I have to feed them now."
                ],
                "next": "samuel_topics"
            },
            {
                "name": "Dead birds.",
                "text": [
                    "What do you think about all those dying birds?",
                    "Samuel had to bury dozens near the Tobanga...",
                    "It's so ominous...",
                    "Unless it's fate...then it doesn't matter."
                ],
                "next": "samuel_topics"
            }
        ]
    },
    "samuel_bay": {
        "choices": [
            {
                "name": "Eclipse.",
                "text": [
                    "Even though Ms. Grant likes me, I have zero science skills to explain that eclipse.",
                    "As I was just saying to her, that's because science has no explanation. No offense to Ms. Grant here, but...this is just the beginning.",
                    "That's why I can sense something bigger is coming to Arcadia Bay...and, Max, I don't like it at all."
                ],
                "next": "samuel_topics"
            },
            {
                "name": "Rachel.",
                "text": [
                    "I keep thinking that Rachel Amber has a few answers...if we can find her...",
                    "If Rachel wants to be found...",
                    "Max, all I can tell you is to stay on your path and you'll find what you're looking for... Rachel Amber is waiting, too..."
                ],
                "next": "samuel_topics"
            },
            {
                "name": "Vortex Club.",
                "text": [
                    "I'd rather be in her class then the Vortex Club.",
                    "Yes, you would. Rachel saw right through them...",
                    "She's not the only one.",
                    "Nobody should be trapped in the Vortex Club. Get out now, Max...while time is on your side."
                ],
                "next": "samuel_topics"
            }
        ]
    },

    // ----- Optional: Brooke -----
    "brooke_1": {
        "choices": [
            { "name": "(Saved Kate)", "text": ["Hey, Brooke, how are you?", "I'm here, as usual. By the way, thanks for helping Kate down. Are you okay?"], "next": "brooke_topics" },
            { "name": "(Couldn't save Kate)", "text": ["Hey, Brooke, how are you?", "Considering what happened to Kate, I could be better. Are you okay?"], "next": "brooke_topics" }
        ]
    },
    "brooke_topics": {
        "choices": [
            {
                "name": "Nathan.",
                "text": [
                    "I need to find Nathan, have you seen him around?",
                    "I did see him this morning heading off campus. He looked more angry than usual... I wouldn't look for him now, if I were you."
                ],
                "next": "brooke_topics"
            },
            {
                "name": "Whales.",
                "text": [
                    "I can't get my limited brain around that eclipse and the beached whales... I was hoping the science department had some ideas.",
                    "Warren and I are supposed to compare notes and theories this weekend. But honestly, neither of us can explain this phenomenon... It's pretty scary."
                ],
                "next": "brooke_topics"
            },
            {
                "name": "Leave.",
                "text": "I have to go. Talk later, Brooke.",
                "next": "dorm_hub"
            }
        ]
    },
    "dorm_findnathan": {
        "text": [
            "Kate brings it! So room 111 is the magic number...",
            "Coast is clear. It would be so cool if you and me were going to school here together...",
            "But now you can have Mr. Jefferson all to yourself...",
            "Ugh, you suck. Now let's get into Blackwell Ninja mode."
        ],
        "next": "boys_dorm"
    },

    // ===================== Boys' Dormitories =====================
    "boys_dorm": {
        "text": [
            "So lame they don't have co-ed dorms here.",
            "Yes, because I want Nathan Prescott in the room next door.",
            "Good point.",
            "Wait here. Give me the signal if Nathan or anybody shows up.",
            "I won't let you down, Bat-Max.",
            "Now I just have to find Nathan's room...",
            "I'm glad you stayed over.",
            "Fuck that dorm curfew shit! We're eighteen!",
            "And after what happened to Kate...",
            "Yeah, I feel so bad for her...and her family.",
            "That's why you're so hot: because you care.",
            "I'm here with you, right?"
        ],
        "next": "nathan_room"
    },
    "nathan_room": {
        "text": [
            "Now I need to find Nathan's phone or anything with clues.",
            "What the hell are all those marks on the floor?",
            "Let's find out what you're hiding...",
            "Oh, yes, little phone, you are mine now.",
            "Now I have Nathan's phone, so I can show it to Chloe. Well, before Nathan comes back."
        ],
        "next": "hallway_fight"
    },
    "hallway_fight": {
        "text": [
            "Damn, Max, you're finally back. I got worried... So, what did you find?",
            "His room was clean and...creepy. Check this out...",
            "Boom, Nathan! We got you by the balls, fucker.",
            "What are you doing in my dorm?!",
            "You're such a nosy bitch, Max!",
            "Stop right there, Nathan!",
            "Make me, ho!",
            "Max, I got this!",
            "Get the fuck outta my face!",
            "You are so fucking dead--!",
            "Get off me, brah!"
        ],
        "next": "hallway_warren_choice"
    },
    "hallway_warren_choice": {
        "choices": [
            {
                "name": "STAY OUT OF IT",
                "text": [
                    "You like to hurt people, huh? Like Max? Like Kate? Like me? Huh? Feel this, motherfucker!",
                    "Get...off me... Please...please stop!",
                    "He's down! Hey...come on...",
                    "Stop... Sorry...",
                    "Yes, we have to go!",
                    "Who's the bitch now?",
                    "Chloe!",
                    "Damn, Warren went full alpha on Nathan...and it was good. But...scary..."
                ],
                "next": "campus_warren"
            },
            {
                "name": "STOP WARREN",
                "text": [
                    "Warren, stop it! Come on.",
                    "Oh! Ow, my head... Why are you all looking at me like that, huh?! You, and you, you're all dead!",
                    "Let's go. Now!",
                    "Plus, my dad is on his way! You're all fucked! He owns you!",
                    "Even if Nathan definitely deserved a beating...we should try to be better than that."
                ],
                "next": "campus_warren"
            }
        ]
    },

    // ===================== Main Campus =====================
    "campus_warren": {
        "text": [
            "Damn, that was intense. Warren...thank you so much.",
            "For what?"
        ],
        "next": "campus_warren_choice"
    },
    "campus_warren_choice": {
        "choices": [
            {
                "name": "Stayed out of it",
                "text": [
                    "For beating the shit out of Nathan Prescott! Dude, you rule.",
                    "I don't know. I kinda went crazy there...like Nathan."
                ],
                "next": "campus_warren2"
            },
            {
                "name": "Stopped Warren",
                "text": [
                    "For headbutting Nathan Prescott! That was awesome!",
                    "I don't know. I almost went crazy there...like Nathan."
                ],
                "next": "campus_warren2"
            }
        ]
    },
    "campus_warren2": {
        "text": [
            "You're not anything like him.",
            "Good to know. So, where are you going? I better stick with you guys. Just in case you need me to get my Hulk on again. Or should I call the cops on Nathan?",
            "No police. Not yet. Uh...so maybe you better...um...",
            "Warren, me and Max have to do this on our own. No offense.",
            "It's cool. Whatever I can do to help...",
            "What you can do is find out anything you can about Nathan's father.",
            "I'm on it. Between the snow and eclipse, I'm assuming the apocalypse is around the corner...",
            "And...thank you. Seriously. I'll call you later.",
            "You better. I'm feeling pretty alpha now.",
            "Yes. You are.",
            "Man, that guy is so fucking in love with you.",
            "I know...",
            "He really did give a serious beatdown to Nathan.",
            "It was a little scary to watch him do that...",
            "Now let's make a date with Frank.",
            "Will he even answer you?",
            "Frank always answers when he wants money.",
            "Like I said, Frank wants to see me right now.",
            "Let's not keep him waiting..."
        ],
        "next": "beach_1"
    },

    // ===================== Beach (Frank negotiation) =====================
    "beach_1": {
        "text": [
            "God... I hate seeing those poor whales like that.",
            "Me too. I just think of their families out there in the ocean looking for them. Well, that asshole is gonna help us find Rachel."
        ],
        "next": "beach_gun"
    },
    "beach_gun": {
        "choices": [
            {
                "name": "(Chloe has a gun)",
                "text": [
                    "Or what? You'll actually shoot him? Chloe, do not count on my rewind... seriously.",
                    "Obviously I'm not counting on you. That's why I have a gun. And I might even save you someday.",
                    "About time.",
                    "I am so going to hit you."
                ],
                "next": "beach_2"
            },
            {
                "name": "(Chloe doesn't have a gun)",
                "text": [
                    "You know what would be great? If I still had a gun.",
                    "Yes, the chance for gunplay would just about even the odds here.",
                    "Frank would scare better. He's a pussy. Besides, if I take him out, you can just rewind...",
                    "Chloe, do not count on my rewind... seriously. After Kate, I feel like every time I do it might be the last..."
                ],
                "next": "beach_2"
            }
        ]
    },
    "beach_2": {
        "text": [
            "There's no way we could have guessed this is what would happen to us when we grew up.",
            "I'm looking forward to the day when we can just go on a road trip to Portland.",
            "Fuck yeah. You, me... and Rachel.",
            "Absolutely. So, let's play this cool, okay?"
        ],
        "next": "beach_money"
    },
    "beach_money": {
        "choices": [
            { "name": "(Left the money)", "text": "Just talk to Frank so we can get that code for the book from him. That's all.", "next": "beach_3" },
            { "name": "(Stole the money)", "text": "Just pay Frank his money and then we can get that code for the book from him. That's all.", "next": "beach_3" }
        ]
    },
    "beach_3": {
        "text": [
            "Got it. No dicking around.",
            "Let's roll.",
            "It blows my mind that I was just here with Chloe in an alternate reality..."
        ],
        "next": "beach_approach"
    },
    "beach_approach": {
        "choices": [
            { "name": "(Max didn't rewind)", "text": "", "next": "beach_frank_intro" },
            {
                "name": "(Max rewound the whole scene)",
                "text": [
                    "Listen, Chloe, I can tell you for a fact that this will not go well.",
                    "Max, I should have known you would be kind and rewind... So tell me exactly what I need to do here."
                ],
                "next": "beach_rewind_advice"
            }
        ]
    },
    "beach_rewind_advice": {
        "choices": [
            {
                "name": "Get rid of gun.",
                "text": [
                    "You won't like this, but you need to get rid of that gun.",
                    "No, Max, I don't like that at all... but I trust you. And girl, if I need that gun, you better rewind fast..."
                ],
                "next": "beach_frank_intro"
            },
            {
                "name": "Watch your mouth.",
                "text": [
                    "Please watch your mouth. You have no social skills here and you will piss off Frank immediately.",
                    "You kind of love this, don't you? Fine, I'll try being like you for a change. Or how you used to be..."
                ],
                "next": "beach_frank_intro"
            },
            {
                "name": "Be careful.",
                "text": [
                    "Be careful, okay? Don't give Frank any excuses to go ballistic. We need his help, Chloe.",
                    "You know, I'm not a total fuck-up. Occasionally I can be both cool and careful... like now, okay?"
                ],
                "next": "beach_frank_intro"
            }
        ]
    },
    "beach_frank_intro": {
        "text": [
            "Oh, look... The Wonder Twins. You should have come alone.",
            "She's my partner.",
            "Yeah, or bodyguard. So let's get to business. Where's my fucking money?"
        ],
        "next": "beach_money2"
    },
    "beach_money2": {
        "choices": [
            {
                "name": "(Give the money to Frank)",
                "text": [
                    "Oh, why, thank you. That wasn't so hard, now was it? And let's not do any more business again. Now if you'll excuse me...",
                    "Frank... could we ask you a couple of quick questions?"
                ],
                "next": "beach_negotiate2"
            },
            {
                "name": "(Keep / Left the money)",
                "text": [
                    "I—I don't have the money... yet.",
                    "Oh, really... then why did you text me that you did?",
                    "Because I wanted to tell you in person.",
                    "Oh, I'm truly touched, Chloe. Now why are you losers really here?",
                    "We just want to ask you some questions."
                ],
                "next": "beach_negotiate2"
            }
        ]
    },
    "beach_negotiate2": {
        "text": [
            "You have some serious ladyballs. No.",
            "Jesus, okay, okay. But I'm not getting you high."
        ],
        "next": "beach_notgethigh"
    },
    "beach_notgethigh": {
        "choices": [
            {
                "name": "(Max didn't rewind)",
                "text": [
                    "Frank, we're not here to get high.",
                    "No, you don't look like the type. Not like Chloe here. So what do you Hardy Boys want?"
                ],
                "next": "beach_names"
            },
            {
                "name": "Close the door. (rewound)",
                "text": [
                    "Frank, uh... your dog is kind of scary, could you please close the RV door?",
                    "You aim your gun at me, but you're scared of my dog. Figures.",
                    "Okay. There, you're safe. Now what do you want?"
                ],
                "next": "beach_names"
            },
            {
                "name": "No fight. (rewound)",
                "text": [
                    "Thanks for hearing me out, Frank. Look, we only want to talk and it's not even about you... We're not here to start a fight.",
                    "No, that shit would be over pretty fast. Don't fuck with me and I won't return the favor. So what do you want?"
                ],
                "next": "beach_names"
            }
        ]
    },
    "beach_names": {
        "text": [
            "Just the names of some of your clients...",
            "Oh, is that all? Well, why didn't you just tell me? How about I just give you the keys to my RV while I'm at it?"
        ],
        "next": "beach_appeal"
    },
    "beach_appeal": {
        "choices": [
            {
                "name": "I'm sorry.",
                "text": [
                    "Listen, Frank, I'm sorry to be such a nuisance, but this is important.",
                    "Yeah, yeah... Everything is important these days. But I can tell you're not bullshitting me.",
                    "There's no time for that, Frank. I just need a little bit of information.",
                    "Yeah, yeah... well, it always starts with just a little. Chloe here knows all about that, don't you?",
                    "Come on, Frank. This isn't about me now."
                ],
                "next": "beach_rachel"
            },
            {
                "name": "You already did.",
                "text": [
                    "You already did.",
                    "Uh, are you fucking mental? I lost my keys, but I changed the lock. You better goddamn not be snooping around here.",
                    "No, I'm not, I—",
                    "Christ, I hate you Blackwell shits. You expect everything for free.",
                    "Yes, Frank. Without those Blackwell shits as customers, you wouldn't have any work at all. Dude, you're a drug dealer!"
                ],
                "next": "beach_rachel"
            },
            {
                "name": "Help or else.",
                "text": [
                    "Help us... or else.",
                    "Are you actually threatening me again, little girl?",
                    "No, I'm not, I—",
                    "Christ, I hate you Blackwell shits. You expect everything for free.",
                    "Yes, Frank. Without those Blackwell shits as customers, you wouldn't have any work at all. Dude, you're a drug dealer!"
                ],
                "next": "beach_rachel"
            }
        ]
    },
    "beach_rachel": {
        "text": [
            "Yeah, right, okay. Both of you are giving me a headache. No deal.",
            "Frank, we didn't come here to fight. This is so much bigger than us.",
            "Rachel? Is that why you're really here?",
            "Yes, we're so close to finding her now, Frank. We need all the help we can get now... especially from you.",
            "You and Chloe do not know Rachel like I did and I couldn't even help her. You're in way over your heads. Why don't you just go play in your clubhouse?"
        ],
        "next": "beach_rachel_choice"
    },
    "beach_rachel_choice": {
        "choices": [
            {
                "name": "You know Rachel.",
                "text": [
                    "Frank, you knew Rachel almost better than anybody. And you know more than us. Together we can find her… Do you have anything to lose?",
                    "When Rachel vanished, I pretty much lost everything… I can't stand not knowing where she is... not hearing her voice... or her laugh... anymore.",
                    "We can change all that... it's up to you."
                ],
                "next": "beach_outcome"
            },
            {
                "name": "Rachel Photo.",
                "text": [
                    "Rachel said she gave you one of her favorite photos. That proves how much she cares... and you care. That's why you have to help.",
                    "How the hell did you know about that photo? That's my favorite picture of her... I can't stand not knowing where she is... not hearing her voice... or her laugh... anymore.",
                    "We can change all that... it's up to you."
                ],
                "next": "beach_outcome"
            },
            {
                "name": "What are you hiding?",
                "text": [
                    "What are you hiding, Frank? You should want to help us, not scare us away.",
                    "Don't you accuse me of anything. You don't know me or who I am. Or what I can do. You understand? Huh?",
                    "Man, there is something about you that is so wrong... I don't trust you at all. Now get out of my face.",
                    "It's too late! She's gone! You don't even know her!",
                    "Like you did? I loved her, asshole. And she loved me. I know that.",
                    "Chloe, you don't know shit. You were part of her problem. Always trying to take her away from me... Always!"
                ],
                "next": "beach_rage"
            }
        ]
    },
    "beach_outcome": {
        "choices": [
            {
                "name": "(Successful conversation — no one is hurt)",
                "text": [
                    "Help us find her, Frank. Please… we really need your client list.",
                    "If there's a chance in hell you two dorks can find Rachel... I'll take it.",
                    "My dog isn't barking at you, so I guess that's a good sign.",
                    "Thank you.",
                    "Yeah, thanks, Frank. Seriously.",
                    "It's hard to take you characters seriously... but I want to. Good luck.",
                    "That was cool Frank gave up the code to help us... Rachel must have seen something good in him."
                ],
                "next": "invest_1"
            },
            {
                "name": "(Frank enters Rage Mode)",
                "text": [
                    "Calm down, Frank. Let's just talk..."
                ],
                "next": "beach_rage"
            }
        ]
    },
    "beach_rage": {
        "choices": [
            {
                "name": "(Chloe shoots Frank — Frank killed)",
                "text": [
                    "Don't you ever tell me what to do. Get it, bitch? Get it?",
                    "Step the fuck back, now!",
                    "Pompidou! You fucking killed my dog!",
                    "Oh no… Chloe…",
                    "I just shot a man and his dog… I killed Frank Bowers…",
                    "You saved my life, Chloe. It was self-defense for both of us.",
                    "Max... Frank is really dead.",
                    "I know. But we can't stop now. We have to find that code. Fast.",
                    "Before the co—cops come...",
                    "That's it. Let's get out of here.",
                    "Sorry, Frank... I'm sorry...",
                    "Jesus, Chloe actually killed Frank... She'll never forgive herself... or forget this... And only I can change it…"
                ],
                "next": "invest_1"
            },
            {
                "name": "(Chloe shoots Frank in the leg)",
                "text": [
                    "Don't you ever tell me what to do. Get it, bitch? Get it?",
                    "Step the fuck back, now!",
                    "You... you actually shot me. I wasn't going to hurt you. Ow, this fucking hurts... it hurts!",
                    "Chloe, you shot him...",
                    "I know…",
                    "You're both fucking crazy! What do you want?",
                    "We—we just want the code for your account book.",
                    "Fine, whatever, just put the goddamn gun down! You already shot me, all right? There.",
                    "Do you want us to call an ambulance? Or...",
                    "No, thanks... You know what, I'll manage somehow without the police.",
                    "Let's bounce.",
                    "Shit, this could have gone way worse, but Frank might be more dangerous to Chloe now... Yes Max, you can change all this if you want…"
                ],
                "next": "invest_1"
            },
            {
                "name": "(Pompidou bites Chloe — Max forced to rewind)",
                "text": [
                    "Do not ever tell me what to do.",
                    "Get off of me!",
                    "Motherfucker!"
                ],
                "next": "beach_approach"
            }
        ]
    },

    // ===================== Chloe's House - Investigation =====================
    "invest_1": {
        "text": "Chloe, are you okay?",
        "next": "invest_hurt"
    },
    "invest_hurt": {
        "choices": [
            { "name": "(No one was hurt)", "text": ["I'm glad things worked out okay with Frank. It's nice to have one less enemy in Arcadia Bay.", "Amen to that."], "next": "invest_2" },
            { "name": "(Frank was injured)", "text": ["Sorry, I just keep thinking about shooting Frank in the leg.", "Please don't. You saved us. Frank is lucky. We have to keep moving forward."], "next": "invest_2" },
            { "name": "(Frank was killed)", "text": ["I'm sorry, I... I keep seeing Frank... dead. And I'm the one who killed him.", "Listen, you saved my life. And yours. We have to keep going forward."], "next": "invest_2" }
        ]
    },
    "invest_2": {
        "text": [
            "I better focus on this board and start tying these clues together...",
            "Max, I know we can snap all these pieces together…",
            "Roger that, I'm going to study the board and try to connect all these dots…",
            "Let's look at Frank's drug deals during the week of the party.",
            "Yes! The game is on! Now talk to us, account book... tell us everything.",
            "Oh yes, these are all the times and places for Frank and Nathan's deals. That's it, Max.",
            "Great, now how do I find out which car is Nathan's to match the coordinates?",
            "Elementary, my dear Max! This is so Nathan's car! Now let's find out where this fucker was the day of the Vortex Club party.",
            "Yes, now we're finally getting somewhere… Chloe, let's plug in these numbers and see if they lead to an actual address.",
            "Aye aye, captain.",
            "Here we come, Rachel.",
            "I have to analyze Nathan's messages. What could help me unlock this phone?",
            "Booyah! Let's find out what Nathan Prescott has been trying to hide...",
            "Take a breath, Max...Go through all this data and you can find out where Nathan took Kate after the party!",
            "Chloe, this is definitely the place.",
            "Let me dig up some more clues here.",
            "Nope... Nothing, Max. There's nothing here. Just some shitty old barn...",
            "Let's keep searching and find out who owns this haunted barn.",
            "Somebody named—\"Harry Aaron Prescott.\"",
            "I'm shocked. Should we call the police?",
            "Fuck that. You know the police here are like Nathan's private security, right?",
            "That's so messed up...",
            "As you've noticed, this whole town is messed up. We can't trust anybody... Except each other. So we have to go out to that farmhouse by ourselves.",
            "I was afraid you'd say that. We could call Warren, since he kicked Nathan's ass...",
            "It's just the two of us. Nobody else. And I'm not scared at all. You have the power. I feel like we're this close to finding Rachel... We have to find her, Max.",
            "We will. But remember, my power isn't infinite. We still have to be careful. Do you hear, Chloe?",
            "Yes, sir."
        ],
        "next": "barn_1"
    },

    // ===================== Old Barn (the Dark Room) =====================
    "barn_1": {
        "text": [
            "Holy shit, this is scary.",
            "I know, but we're here. Let's go find the best way in.",
            "Whoa, check this out. Fresh tire tracks.",
            "Dude, somebody was just here.",
            "Then we need to get in that barn...",
            "Chloe! I found the front door! Come on!",
            "Oh yes! Maximus rules!",
            "God, this is way too Blair Witch... I have goose bumps all over.",
            "Come on, Super Max. Hey, check out this old chest!",
            "A little louder, Chloe! Jeez, that is ancient.",
            "Jackpot. Old shit.",
            "No, look closer.",
            "\"Harry Aaron Prescott and family donate new library to Arcadia Bay\"... \"Prescott Industries celebrate grand opening\"... \"The Prescotts bring bomb shelter boom to town.\"",
            "Nice scrapbook. You search for more clues and I'll scope out the area.",
            "Yes, old Prescott clippings, but that can't be the only thing here.",
            "Whoa, what is this? It's totally brand new. Why?",
            "Chloe, can you give me a hand?",
            "Sidekick at your service! Up, up and away, Super Max.",
            "I dig having minions.",
            "MaxGyver strikes again!",
            "Damn, this is heavy...",
            "What... is this?",
            "Jackpot. Do I even need to say how weird this is?",
            "You just did. Who builds this kind of place?",
            "A Prescott, of course.",
            "This bunker is so surreal.",
            "Oh yes! I thought that only worked in the movies! Open sesame.",
            "Stocked and ready for the apocalypse. This must have cost a fortune. Come on.",
            "Now what the hell is this...",
            "Come on, let's see what this shit is all about.",
            "We are. Okay, a binder marked \"Victoria,\" but it's empty...",
            "Look, the next one says \"Kate.\"",
            "Oh no, Kate... No...",
            "God, I should have killed that bastard back there.",
            "Kate wasn't the first... All those binders are filled with other victims. Victoria has to be next. Nathan must be planning to dose her tonight at the Vortex Club party.",
            "Rachel... This can't be real... These are all--these are all posed shots, right? Right?",
            "Chloe. Look at her face. She's... out of it.",
            "Maybe--maybe Nathan paid her a shitload of cash to do this. She probably would have.",
            "I don't think so. Why is he putting her in the ground like that? Where--",
            "The junkyard! Max, we have to find that spot, now! Then we can see what he did... There's no way she's dead. No way! She posed for those pictures, Max. I know it, please... let's go.",
            "Oh my God... Rachel... Kate... all these files..."
        ],
        "next": "junkyard_grave"
    },

    // ===================== Junkyard =====================
    "junkyard_grave": {
        "text": [
            "Chloe, slow down! Wait for me!",
            "I know exactly where I'm going!",
            "Look, this is it! This is it!",
            "Are you going to help me, Max?",
            "Chloe, stop! Look!",
            "Please, no...",
            "That smell...",
            "Rachel... Oh, Rachel, no, no! Please, not her!",
            "Chloe...",
            "Rachel... why?!",
            "I'm sorry, Chloe. I'm so sorry...",
            "I loved her so much... How can she be dead?! What kind of world does this?! Who does this?!"
        ],
        "next": "parking_1"
    },

    // ===================== Parking Lot =====================
    "parking_1": {
        "text": [
            "I hope Nathan enjoys his last party.",
            "Chloe, we can go right to the cops. We have proof.",
            "Fuck the police. Rachel wanted us to find her. So we could get real justice... and revenge. The Prescotts have had this coming for a hundred years, and nobody is going to get in my way. Especially with your help... right?",
            "I'm with you to the end, Chloe. You know that.",
            "Oh, shit, this is like that eclipse.",
            "You're right. Look at the outline.",
            "There can't be two moons... that's not possible...",
            "What is that? Jesus, Chloe, look up at the sky!",
            "Beautiful, I don't give a shit. The world is ending, cool.",
            "You're not listening! Something major is going down!",
            "That's right. Nathan Prescott is going down.",
            "Welcome to the end of the world, ladies. I'm glad you decided to escort me...",
            "You look really good, Warren. Are you all right after today?"
        ],
        "next": "parking_warren_choice"
    },
    "parking_warren_choice": {
        "choices": [
            { "name": "(Max stopped Warren from beating Nathan)", "text": "I'm glad you stopped me... Nathan is dangerous.", "next": "parking_2" },
            { "name": "(Warren beat up Nathan)", "text": "I really flipped out on Nathan. I just hate bullies... and Max, he's dangerous.", "next": "parking_2" }
        ]
    },
    "parking_2": {
        "text": [
            "Where is he?",
            "I didn't see him at the dorm again. I was holed up in my room.",
            "Dude, have you been drinking?",
            "Well, if you consider half a beer \"drinking\"...",
            "Let's go, Max.",
            "Hey, hey... I know this is a bad time, but can I get one picture? I've been feeling like this might be actually the end of the world, so... I want to have something for prosperity.",
            "Well... I don't blame you, Warren.",
            "I know, I know, I'm a pain in the booty. Just one picture. Uh...",
            "Action.",
            "We got no time for this shit. Come on, Max.",
            "Sorry... I just wanted to feel like a normal student after this week's ultraviolence. I never hit anybody like that before... I was always the one getting my ass kicked.",
            "Hey, we still need your expert help. If you see Nathan, text me immediately, okay? And do not let him see you.",
            "He won't. I know how to be invisible here...",
            "Not to me, Warren. Text soon.",
            "Okay, Chloe, where the hell are you?"
        ],
        "next": "party_stella"
    },

    // ===================== Swimming Pool - Party =====================
    "party_stella": {
        "text": [
            "Hi, Stella.",
            "Hey, Max, welcome to the \"End of the World.\" Do you want me to check anything in?",
            "No, thanks, Stella. Have you seen Nathan yet?",
            "No, thank God. That boy creeps me out... Wait, some girl just asked about Nathan before you came in."
        ],
        "next": "party_stella_topics"
    },
    "party_stella_topics": {
        "choices": [
            {
                "name": "Nathan's creepy?",
                "text": [
                    "Why does Nathan creep you out? He should. I just want your reasons.",
                    "He's a bully for one thing and he hit Warren for another... But have you ever looked at his eyes? Glazed and raging. Me no like."
                ],
                "next": "party_stella_2"
            },
            {
                "name": "What girl?",
                "text": [
                    "What girl?",
                    "She had blue hair, dressed like a punk... I've seen her putting up those Rachel Amber posters. I'm stuck here, so I'm sorry I can't help you."
                ],
                "next": "party_stella_2"
            }
        ]
    },
    "party_stella_2": {
        "text": [
            "So why are you working at a Vortex Club party? I didn't think you wanted to be a member.",
            "Screw that. I'm here for the job.",
            "Yes, you are, Stella. You're smart, honest, and you bust your ass for Blackwell. I hope everything turns out your way in the end.",
            "Awww, thank you, Max. I really appreciate that. Hey, your face looks so intense... are you okay?",
            "Um, no, I'm actually not okay. I... I just need to find Nathan. And don't get too close if you see him.",
            "Hell no. This is homework, not a party. I'll text you if I spy him. Good luck.",
            "We need to find Nathan and take him down."
        ],
        "next": "party_sarah"
    },
    "party_sarah": {
        "text": [
            "Excuse me, but I'm going in.",
            "Sorry, but this is the VIP section. Members only. Mmm-kay?",
            "Listen…",
            "No, you listen. Courtney is supposed to be the VIP gatekeeper, not me. So please go."
        ],
        "next": "party_courtney"
    },
    "party_courtney": {
        "choices": [
            {
                "name": "(Courtney wrote Max's name on the list)",
                "text": [
                    "Max! Our guest star arrives fashionably late! You still get special access to the Vortex Club VIP lounge…",
                    "You better let your minion know since she won't let me pass.",
                    "Oh, that little asshole just made her last mistake. Now, let's go make an official VIP entrance, Max Factor! Sarah, you're done. And you're off the list, permanently. Welcome to the Vortex Club."
                ],
                "next": "party_victoria"
            },
            {
                "name": "(Max isn't on the list)",
                "text": [
                    "What is Max Caulfield doing at a Vortex Club party? It really must be the end of the world… But seriously, like, what do you want?",
                    "I didn't want to be alone tonight after this week… so I thought it'd be nice to hang out in the VIP section.",
                    "Yes, it is very nice. If you're in the Vortex Club, which you're not and will never be. So, excuse me..."
                ],
                "next": "party_victoria"
            }
        ]
    },

    // ----- Conversation with Victoria -----
    "party_victoria": {
        "text": [
            "Sorry, Max. Vortex Club members only.",
            "Sorry, I'm on the guest list.",
            "I'm taking you off.",
            "Go fuck your selfie, Victoria. I don't have time for this bullshit."
        ],
        "next": "party_vic_apology"
    },
    "party_vic_apology": {
        "choices": [
            { "name": "(Max comforted Victoria)", "text": "Real cute, Max. And after I apologized to you the other day...", "next": "party_vic_kate" },
            { "name": "(Max made fun of Victoria)", "text": "Real cute, Max. You still pissed about me taking your picture?", "next": "party_vic_kate" }
        ]
    },
    "party_vic_kate": {
        "text": "Do you even have a clue what's going on at Blackwell?",
        "next": "party_vic_kate_choice"
    },
    "party_vic_kate_choice": {
        "choices": [
            { "name": "(Kate died)", "text": "Kate Marsh killed herself in front of you and me... everybody here!", "next": "party_vic_blame" },
            { "name": "(Kate lived)", "text": "Kate Marsh tried to kill herself in front of you and me... everybody here!", "next": "party_vic_blame" }
        ]
    },
    "party_vic_blame": {
        "text": "That's not my fault, Max. Don't you even try to blame me!",
        "next": "party_vic_argue"
    },
    "party_vic_argue": {
        "choices": [
            {
                "name": "Blame.",
                "text": [
                    "Oh, I will. You didn't help Kate at that party. You knew she was totally wasted. Then you sent the video to everybody, just to twist the knife.",
                    "Wow. Are you kidding me? I didn't make her drink that wine! Nobody pushed her tongue into everybody's mouth. I watched her, Max.",
                    "Then shame on you. And you know Kate was dosed, no matter how much you deny it. That's why she ended up on that roof... and you made sure to take one last video of her, right?",
                    "I deleted that video from my phone, Max.",
                    "I bet that comforts Kate's family... I don't even know how you sleep at night.",
                    "I'm not perfect, okay? I'm a teenager at an art school. I'm only here to become a photographer and get famous."
                ],
                "next": "party_vic_warn"
            },
            {
                "name": "Don't blame.",
                "text": [
                    "I don't blame you, Victoria, but you know Kate had a church group and that she didn't party. So why did you send out that video?",
                    "Oh God... I swear we weren't even going to do it. Then we had some wine and got stupid.",
                    "More than stupid. It's mean... hateful. Kate never did anything to you.",
                    "That makes both of us, Max. I always feel like I have to overcompensate. For what, I have no clue. I'm only here to become a photographer, not president."
                ],
                "next": "party_vic_warn"
            },
            {
                "name": "You have talent.",
                "text": [
                    "You have talent, Victoria. You don't have to push people out of your way.",
                    "You don't understand. My parents own a gallery. I know how this art game has to be played... it's brutal.",
                    "Hard to believe, but I don't always make the best choices. Do you think it's, like, fate we're not supposed to be friends?"
                ],
                "next": "party_vic_warn"
            }
        ]
    },
    "party_vic_warn": {
        "choices": [
            { "name": "THE DARK ROOM", "text": "", "next": "party_vic_dr" },
            { "name": "DON'T WARN HER", "text": "", "next": "party_vic_dw" }
        ]
    },
    "party_vic_dr": {
        "choices": [
            {
                "name": "(Victoria believes Max)",
                "text": [
                    "Victoria, listen to me... your life is in serious danger. I know Nathan is your friend, but he is truly unstable and dangerous. He did drug Kate at that party so he could take her some place... dark.",
                    "What? Nice try, Max. But I don't believe you. And why would he do that?",
                    "That I don't know yet. But it was enough to make Kate want to die... And I think you're next.",
                    "Max, that is crazy. Nathan is like one of my best friends. Yes, he takes serious meds, but that's not his fault.",
                    "They're not little anymore. They're deadly. I don't care if you hate me or not, but you have to believe me.",
                    "Max, I don't hate you... To be honest, Nathan has been freaking me out lately... He's not here and I haven't seen him.",
                    "Just make sure you stay away from him and stick close to your friends tonight, okay?",
                    "I'll let you boss me around this one time. Thanks for telling me this, Max. If what you said is true... then you be careful, too.",
                    "I've got my own protection.",
                    "Um, text me if you need anything...",
                    "I will. Thanks, Victoria.",
                    "Au revoir."
                ],
                "next": "party_vic_thoughts"
            },
            {
                "name": "(Victoria doesn't believe Max)",
                "text": [
                    "Victoria, enough of this high school bullshit. We're adults now. So listen to me, your life is in serious danger. I know you're close to Nathan... but he is truly unstable and dangerous. He did drug Kate at that party so he could take her some place... dark.",
                    "Oh my God... and I'm the drama queen?",
                    "Touché. But I am not fucking around here.",
                    "Sorry, but no, no way. Nathan is like one of my best friends.",
                    "They're not little anymore. They're deadly. I don't care if you hate me or not, but you have to believe me.",
                    "I don't believe anything you say. You're full of shit.",
                    "Now will you listen?",
                    "No, I won't. This is a party. And it's the \"end of the world,\" so I am going to get so wasted even you won't bother me anymore. I'll let Nathan know if he finally shows up. Adios.",
                    "Au revoir…"
                ],
                "next": "party_vic_thoughts"
            }
        ]
    },
    "party_vic_dw": {
        "choices": [
            {
                "name": "(Victoria is friendly)",
                "text": [
                    "Oh, um... no reason. I'm glad we finally had a talk, Victoria. I see where you're coming from now.",
                    "I don't blame you for not caring. I totally know I'm a mean bitch... We are supposed to be adults, right?",
                    "That's what they tell us... Speaking of, have you seen Nathan?",
                    "Nathan Prescott? Why do you want to know that?",
                    "Oh, Principal Wells wanted to see us Monday. No big deal.",
                    "I hope he doesn't give you any shit. Actually, I haven't seen Nathan tonight. I swear.",
                    "Au revoir…"
                ],
                "next": "party_vic_thoughts"
            },
            {
                "name": "(Victoria is hostile)",
                "text": [
                    "Never mind. It was good talking to you, Victoria. As usual.",
                    "Eat a dick, Max. You're just jealous of me because I actually do the things you can't.",
                    "At least tell me where Nathan is.",
                    "Uh, why do you want to know?",
                    "Principal Wells wanted to see us Monday. It's no big deal.",
                    "Then why ask me? I haven't even seen him tonight. Adios.",
                    "Au revoir…"
                ],
                "next": "party_vic_thoughts"
            }
        ]
    },
    "party_vic_thoughts": {
        "choices": [
            { "name": "(Max didn't warn Victoria)", "text": "Should I have warned Victoria about Nathan? She might be evil, but...", "next": "party_chloe" },
            { "name": "(Victoria didn't believe Max)", "text": "Okay, I tried... She's not gonna believe me over her Vortex Club partner…", "next": "party_chloe" },
            { "name": "(Victoria believed Max)", "text": "Maybe there's hope yet for Victoria and me... I'm glad I warned her. I hope she's okay.", "next": "party_chloe" }
        ]
    },

    // ----- Conversation with Chloe / Contest -----
    "party_chloe": {
        "text": [
            "There you are. Chloe, Nathan isn't here. Nobody has seen him tonight.",
            "He's definitely not upstairs or in the lockers.",
            "Damn, maybe he's hiding in his dorm.",
            "Then let's bail. Nathan can't hide anymore.",
            "So you made it, Max.",
            "Oh, hey, Mr. Jefferson...",
            "Um... are you both okay? You look like you're on a mission...",
            "Oh, I was just looking for Nathan.",
            "Aha. I didn't know you were pals with him. I haven't seen him since this afternoon... He seemed pretty upset. I think he's still quite upset over the whole Kate situation.",
            "Yeah, that makes sense.",
            "Let's talk later, Max. I have to announce the winner of the contest. I do wish you would have entered. You have to build up that résumé and portfolio, but I know you will.",
            "Thanks, I hope so.",
            "Okay, excuse me. I'm almost on...",
            "Let's get the hell out of here, Max."
        ],
        "next": "contest"
    },
    "contest": {
        "text": [
            "Okay, everybody calm down. Thank you, thank you... I appreciate it. I don't want to get in the way of the party, but it's time to announce the winner of the \"Everyday Heroes\" contest.",
            "Before I do, I want to thank everybody who entered their photograph... and everybody who thought about entering. All of you represent Blackwell Academy, and everything our school stands for. As far as I'm concerned, you're all \"Everyday Heroes\"! The envelope, please... And the winner is… Oh my, what a shocker... Victoria Chase!",
            "Oh my God!",
            "Thank you so much, Mr. Jefferson. It was your incredible photography that brought me to Blackwell and I hope I can live up to your name... and fame. I also want to thank all the students for being so dedicated in their pursuit."
        ],
        "next": "contest_dedicate"
    },
    "contest_dedicate": {
        "choices": [
            { "name": "(Kate died)", "text": "And I'd like to dedicate this prize to the memory of Kate Marsh... She was the real \"everyday hero\" of Blackwell...", "next": "contest_end" },
            { "name": "(Kate lived)", "text": "And I'd like to dedicate this prize to Kate Marsh... She is the real \"everyday hero\" of Blackwell. And I can't wait for her to come back.", "next": "contest_end" }
        ]
    },
    "contest_end": {
        "text": [
            "Thank you.",
            "You suck, Victoria!",
            "Victoria won. Big surprise. I can't believe she blackmailed Jefferson... Well... yes, I can.",
            "Who fucking cares? Rachel is still dead. And I want Nathan's punk ass... now!",
            "Me too. Let's go check out the dormitories.",
            "glad you got one last look at rachel",
            "nobody will ever find her again after im done",
            "Oh Christ, Nathan just texted me... He says there won't be any evidence left after he's done.",
            "Shit, we have to go to the junkyard right now!"
        ],
        "next": "junkyard_evening"
    },

    // ===================== Junkyard - Evening (ending) =====================
    "junkyard_evening": {
        "text": [
            "Stop stomping around, Chloe!",
            "Right. Just get ready to use your rewind fast if Nathan tries to jump us.",
            "Chloe, come over here, quick!",
            "Oh God, Max, look... she's still there.",
            "Don't look, Chloe…",
            "Oh no…",
            "Chloe! Look out!",
            "What the fuck?",
            "Chloe…"
        ]
    }
};
