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

|                          |                  |
| ------------------------ | ---------------- |
| Start                    | 13.10.2021       |
| PR                       | 09.11.2021 11:30 |
| End                      | 09.11.2021 11:30 |
| Who                      | Gosia            |
| Next animation challenge | ?                |
| Winner                   | ?                |

### Goals

- [ ] Create "sticker store" at the bottom of the screen
- [ ] Make it possible to drag and drop stickers across screen
- [ ] Last placed sticker should be on top
- [ ] Add sticking and unsticking animation
- [ ] When draging sticker, add shadow indication that it is in the air.
- [ ] (Optional) Add possibility to draw on screen in different colors. Lines should be show below stickers
