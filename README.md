# Flappy Bird - 8-bit Retro

A classic Flappy Bird game with an 8-bit retro aesthetic, built with HTML5 Canvas, CSS, and JavaScript.

## Features

- **8-bit Retro Graphics**: Pixelated bird and pipes with a classic green-on-black terminal aesthetic
- **Smooth Physics**: Realistic gravity and flap mechanics
- **Progressive Difficulty**: Pipes move at increasing speeds as you play
- **Score Tracking**: Real-time score display and final score on game over
- **Responsive Design**: Works on desktop and mobile devices
- **Simple Controls**: Spacebar or mouse click to flap

## Game Mechanics

- **Bird**: Yellow circular bird that falls due to gravity
- **Pipes**: Green pipes with randomized gaps that move from right to left
- **Scoring**: Earn 1 point for each pipe successfully passed
- **Game Over**: Triggered when the bird hits a pipe or the screen boundaries

## Controls

- **Spacebar**: Flap the bird upward
- **Mouse Click**: Flap the bird upward (alternative to spacebar)
- **Restart Button**: Click to restart the game after game over

## Technical Details

- **Canvas Size**: 400x600 pixels
- **Frame Rate**: 60 FPS
- **Physics Constants**:
  - Gravity: 0.5 pixels/frame²
  - Flap Strength: -8 pixels/frame
  - Pipe Speed: 3 pixels/frame
  - Pipe Gap: 150 pixels
- **Color Palette**: Classic 8-bit green-on-black terminal colors

## How to Run

1. Clone or download the project files
2. Open `index.html` in your web browser
3. The game will start automatically
4. Use spacebar or click to control the bird

## File Structure

- `index.html` - Main HTML file with game layout
- `style.css` - Styling with 8-bit retro aesthetic
- `game.js` - Game logic and physics engine

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!

## Acknowledgments

Inspired by the classic Flappy Bird game by Dong Nguyen.