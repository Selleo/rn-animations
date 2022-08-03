# Selleo biweekly RN animation challenge

The goal of this project is to get familiar with Reanimated V2 API. We decided to create a challenge to grow our skills. Feel free to join and play with the greatest React Native animation api so far.

## Schedule

- we meet every two Tuesdays at 16:30
- you have two weeks to complete animation
- under special circumstances the challenge can be postponed
- for up-to-date information visit `react-native` slack channel

## Rules

- use [Reanimated v2 API](https://docs.swmansion.com/react-native-reanimated/docs)
- you should put your code to your personal directory `/participants/[your_name]/[animation_number_and_name]`
- you should modify `src/constants/paths.ts` file accordingly to have your new animation listed
- do not modify any files out of your personal directory or the paths mentioned above
- do not modify others work
- create your own directory in `/participants` if it does not exists yet
- do not cheat - we will review and talk about problems every two Tuesdays
- have fun

## Prizes

We will review all projects together and choose the best solution / design / code quality project

- 5 kudos from TL
- kudos rain from each participant

## [1] Week 1 - BB - Pump me [FINISHED]

|                          |                  |
| ------------------------ | ---------------- |
| Start                    | 14.09.2021       |
| PR                       | 27.09.2021 16:30 |
| End                      | 28.09.2021 16:30 |
| Who                      | BB               |
| Next animation challenge | Bob              |
| Winner                   | BB               |

### Goals

- [ ] Create rounded touchable element r=40
- [ ] Handle touch animation
  - [ ] When you press element should become bigger, to max 90% of screen size (animation should be smooth)
  - [ ] When it has max size change its color to any other than initial and display somewhere text "Stop it! I'll explode in a moment"
  - [ ] When you release element should go back to its initial size (animation should be smooth)
  - [ ] When you press again when its size decreases, animation should start from its current size
  - [ ] Create PR and mark all other participants as reviewers

## [2] Week 2 - Bob - Tomato catapult [FINISHED]

|                          |                  |
| ------------------------ | ---------------- |
| Start                    | 29.09.2021       |
| PR                       | 12.10.2021 16:30 |
| End                      | 12.10.2021 16:30 |
| Who                      | Bob              |
| Next animation challenge | Gosia            |
| Winner                   | k1eu             |

### Goals

- [ ] Create smaller "wall" View with gray color with 80% of width and height
- [ ] Create a horizontal brown line across the screen
  - [ ] This should be touchable (react-native-gesture-handler)
  - [ ] Upon swiping down it should bend - bend animation should follow finger
  - [ ] On tearing a new potato should be placed under finger
  - [ ] On release potato should fire and smash on the wall
- [ ] Position where tomato land on a wall should be random

## [3] Week 3 - Gosia - Stickers

|                          |                      |
| ------------------------ | -------------------- |
| Start                    | 13.10.2021           |
| PR                       | 09.11.2021 11:30     |
| End                      | 09.11.2021 11:30     |
| Who                      | Gosia                |
| Next animation challenge | matro                |
| Winners                  | BB, Bob, k1eu, Gosia |

### Goals

- [ ] Create "sticker store" at the bottom of the screen
- [ ] Make it possible to drag and drop stickers across screen
- [ ] Last placed sticker should be on top
- [ ] Add sticking and unsticking animation
- [ ] When draging sticker, add shadow indication that it is in the air.
- [ ] (Optional) Add possibility to draw on screen in different colors. Lines should be show below stickers

## [4] Week 4 - matro - Curling

|                          |            |
| ------------------------ | ---------- |
| Start                    | 16.10.2021 |
| PR                       | 30.11.2021 |
| End                      | 30.11.2021 |
| Who                      | matro      |
| Next animation challenge | k1eu       |
| Winner                   | BB         |

### Goals

- [ ] Make a simple curling game with one target point placed horizontally in the middle of the screen and vertically 20% height from the top (2D view from above the game field)
- [ ] There's a horizontal "throwing line" at 20% screen height from the bottom of the screen
- [ ] You have one kettle (alright... it's called the stone as wikipedia claims) to throw at the target
- [ ] The throwing line separates the bottom "aiming field" from the upper "target field"
- [ ] You can control the stone with your finger only while it's on the aiming field
- [ ] When the stone crosses the throwing line, you lose control over it and the stone continues the travel up on the target field based on the force that you gave it releasing it
- [ ] The stone should gradually lose speed based on the amount of initial speed given on release
- [ ] When the stone stops, you calculate and display the distance from the target
- [ ] 1 second after stopping on the target field, the stone is being reset back to the aiming field

## [5] Week 5 - k1eu - Apartment's swipee

|                          |            |
| ------------------------ | ---------- |
| Start                    | 06.12.2021 |
| PR                       | 21.12.2021 |
| End                      | 21.12.2021 |
| Who                      | k1eu       |
| Next animation challenge | damcyk     |
| Winner                   | BOB        |

### Goals

- [ ] Make a bottom tab navigator with main `Apartments View`
- [ ] Create Aparments Card slider with where both previous and next cards are visible (just a little)
- [ ] When the user swipes, next card should go to the middle and scale just a bit
- [ ] When the use clicks there should be an enter in animation which connects with the previous screen (so it looks smooth :sweetJesus:)
- [ ] Optional (gif 1)\* - Create a view that rolls out from below the tab navigator (we can call it `My favourites` - content doesn't matter)
- [ ] There are examples below :)

<p>
  <img src="https://cdn.dribbble.com/users/3421391/screenshots/6978055/airbnb_3.gif" width="350">
  <img src="https://cdn.dribbble.com/users/3687894/screenshots/6680064/upload.gif" width="350">
</p>

## [6] Week 6 - damcyk - Wallet

|                          |            |
| ------------------------ | ---------- |
| Start                    | 28.12.2021 |
| PR                       | 11.01.2022 |
| End                      | 11.01.2022 |
| Who                      | damcyk     |
| Next animation challenge | TBD        |
| Winner                   | TBD        |

### Goals

- [ ] Example: https://dribbble.com/shots/6713486-2-FREE-Touch-Gesture-Animations-interactions-for-after-effects
- [ ] Create a wallet view with rolled-up cards and button to add new card
- [ ] It should be possible to see details of card on press (currency with amount - for example cryptocurrency like on dribbble)
- [ ] (On details view) - when the user press again card, the view should get back
- [ ] Card can be just image (easier solution)

<p>
  <img src="https://cdn.dribbble.com/users/20248/screenshots/6713486/output__2_.gif" width="350">
</p>

## [7] Week 7 - monika - Radial Menu

|                          |            |
| ------------------------ | ---------- |
| Start                    | 25.12.2022 |
| PR                       | 01.02.2022 |
| End                      | 11.01.2022 |
| Who                      | monika     |
| Next animation challenge | BB         |
| Winner                   | Monika     |

### Goals

- [ ] Create animated drawer with a radial menu
- [ ] Drawer should expand with some nice animation, after expanding, a radial carousel should appeared on the screen
- [ ] Each menu element should have an icon and label
- [ ] The radial menu should be an infinite scroll (when the user reach the last menu item, the first element appears again)
- [ ] When menu item is clicked, app should navigate to selected screen and drawer should smoothly hide
- [ ] Example of drawer: https://dribbble.com/shots/6155653-Menu-Design
- [ ] Example of animation with radial menu: https://dribbble.com/shots/4574257-Porsche-Passport-Menu-Interaction

<p>
  <img src="https://cdn.dribbble.com/users/1106278/screenshots/6155653/dribbble_28_feb_2.png" width="350">
  <img src="https://cdn.dribbble.com/users/2024752/screenshots/4574257/passport-dribbble-01.gif" width="350">
</p>

## [8] Week 8 - BB - Liquid animation

|                          |            |
| ------------------------ | ---------- |
| Start                    | 21.02.2022 |
| PR                       | 11.03.2022 |
| End                      | 11.03.2022 |
| Who                      | BB         |
| Next animation challenge | Bob        |
| Winner                   | k1eu       |

### Goals

- [ ] Create onboarding screen with at least 3 different steps
- [ ] Add button, press should show next step
- [ ] Add "fluid" animation - https://dribbble.com/shots/6654320-Animated-Onboarding-Screens
- [ ] For code inspiration you can check https://www.youtube.com/watch?v=vQNg06Hf0MQ

## [9] Week 9 - bob - Collapsible header - easy one!

|                          |            |
| ------------------------ | ---------- |
| Start                    | 25.03.2022 |
| PR                       | 08.04.2022 |
| End                      | 08.04.2022 |
| Who                      | Bob        |
| Next animation challenge | Bob        |
| Winner                   | monika     |

### Goals

- Create FlatList with collabsible header
- It should start with height of 250px and shrink into 100px and should start shrinking when user scroll more than 50% of the screen
- Place a button in smaller version of the header to make it big again with bounce animation
- Then again after scrolling half of the screen is should shrink
- Transition should be smoth - and should follow scroll event - sample: https://raw.githubusercontent.com/logovaser/animated-header-scroll-view/master/readme/demo.gif

## [10] Week 10 - monika - Animated button

|                          |               |
| ------------------------ | ------------- |
| Start                    | 16.04.2022    |
| PR                       | 16.04.2022    |
| End                      | 16.05.2022    |
| Who                      | monika        |
| Next animation challenge | k1eu          |
| Winner                   | bob, bb, k1eu |

### Goals

- Create an animated submit button
- Button should be able to represent different states: not loaded, loading, success, error
- Animation should smoothly go through this states
- Example1: https://pl.pinterest.com/pin/834432637223743712/?mt=login
- Example2 (easier): https://pl.pinterest.com/pin/834432637223744450/

## [11] Week 11 - k1eu - Tinder with skia spice

|                          |            |
| ------------------------ | ---------- |
| Start                    | 25.06.2022 |
| PR                       | 08.07.2022 |
| End                      | 08.07.2022 |
| Who                      | kieu       |
| Next animation challenge | matro      |
| Winner                   |            |

### Goals

- Tinder Swipe!
- Main view should have centered card with a photo (and maybe some info about a person)
- Card should have ability to be swiped left & right with some rotate animation
- Additionaly let's try skia! Card should have a border with some kind of beautiful gradient 🥰
- - for additional style points we can incorporate a `details view` using shared element transitions
- Example with skia gradient: https://www.youtube.com/watch?v=pVesCl7TY8A
- Example tinder cards (right side):
<p>
  <img src="https://cdn.dribbble.com/users/390458/screenshots/14489959/media/bd35083be38692fbc8ee24e1934a09ac.png?compress=1&resize=1600x1200&vertical=top" width="350">
</p>

## [11] Week 12 - matro - Jumping balls squashing and stretching

|                          |            |
| ------------------------ | ---------- |
| Start                    | 04.08.2022 |
| PR                       | 12.08.2022 |
| End                      | 12.08.2022 |
| Who                      | matro      |
| Next animation challenge | TBD        |
| Winner                   |            |

### Goals

- Let's experiment with animations to play with illusion of elastic bouncing balls that can be used for various toggle elements or loaders
- Create 4 variants of balls jumping in a row next to each other
- 1st red ball should jump with no shape transformations of the ball AND with constant speed
- 2nd green ball should jump with no shape transformations, BUT accelerating the closer to the floor level it is (imitating gravity)
- 3rd blue ball should jump with shape transformation (squashing horizontally when hitting the floor level and stretching vertically halfway between highest and lowest points of the jump), BUT with constant speed
- 4th black ball should both dynamically change shape AND speed imitating elastic jumping ball
- Balls should be jumping next to each other in line at the 1/3 view height (highest point of the jump at 2/3 vh)
- Example of such animations: https://www.instagram.com/p/CelyJH8jWYX/
