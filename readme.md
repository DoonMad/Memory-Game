# Memory Game

## Overview
The Memory Game is a fun, interactive web-based game where players match pairs of cards. As players progress, they face increasingly challenging levels with more cards and different themes. The game tracks the player's performance by recording the best time, fewest moves, and misses for each level.

## Features
- **Dynamic Themes**: Each level has a unique color theme (e.g., green for easy, orange for medium, red for hard).
- **Performance Tracking**: Tracks the best time, fewest moves, and misses for every level.
- **Responsive Design**: Adapts to various screen sizes for a seamless user experience.
- **Levels**: Three levels of increasing difficulty with more cards at higher levels.
- **Reset and Next Level Buttons**: Restart the current level or advance to the next level.

## How to Play
1. Open the game in your browser.
2. Click on cards to reveal their hidden symbols.
3. Match pairs of cards to clear the board.
4. Complete the level in the fewest moves and time to set records.
5. Advance to the next level by clicking the "Next Level" button.

## Technologies Used
- **HTML**: For the structure of the game.
- **CSS**: For styling, including themes and animations.
- **JavaScript**: For game logic, performance tracking, and dynamic theme switching.

## Installation
1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd memory-game
   ```
3. Open the `index.html` file in your browser to start the game.

## File Structure
```
memory-game/
|-- index.html         # Main HTML file
|-- style.css          # CSS for styling
|-- script.js          # JavaScript for game logic
|-- media/             # Folder for audio files and other assets
```

## Customization
### Adding New Levels
1. Update the CSS grid properties in `script.js` to define the layout for the new level.
2. Add a new theme by extending the `changeTheme` function in `script.js`.
3. Update the JavaScript logic to handle additional levels.

### Changing Themes
Modify the CSS variables in `style.css`:
```css
--primary-color: <color>;
--secondary-color: <color>;
--bg-color: <color>;
--button-color: <color>;
```

## Future Enhancements
- **Sound Effects**: Add different sounds for matches, mismatches, and level completion.
- **Leaderboard**: Implement a leaderboard to compare scores across multiple players.
- **Advanced Levels**: Add more levels with unique challenges.
- **Animations**: Enhance the UI with animations for card flips and level transitions.

## Contributions
Contributions are welcome! Feel free to submit a pull request or open an issue for suggestions or bug fixes.

## License
This project is licensed under the [MIT License](LICENSE).

---

Enjoy the game and challenge yourself to achieve the best records!
