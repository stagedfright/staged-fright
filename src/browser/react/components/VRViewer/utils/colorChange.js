export default function colorChange(volume) {
      if (volume < 2.1) {
        return `#FF0000`
      } else if (volume < 3.6) {
        return `#FFFF00`
      } else {
        return `#00FF00`
      }
    }
