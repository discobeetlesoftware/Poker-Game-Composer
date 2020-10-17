smallConfig = {
  section: {
    title: {
      size: 12,
      family: 'Verdana, sans-serif',
      color: 'black',
      margins: { x: 1, y: 5}
    },
    margins: { x: 5, y: 0 }
  },
  element: {
    detail: {
      size: 10,
      color: 'black',
      family: 'Verdana, sans-serif',
      margins: { x: 0, y: 3 }
    },
    text: {
      fontSize: 10,
      fontFamily: 'Verdana, sans-serif',
      color: 'black',
      backgroundColor: '#d9ffe3',
      margins: { x: 6, y: 6 },
      border: {
        color: '#000',
        width: 1,
        corner: 4
      }
    },
    card: {
      size: { width: 30, height: 45 },
      border: {
        color: '#212121',
        width: 1
      },
      corner: 5,
      faceDown: {
        backgroundColor: '#d2d9e2',
        fontColor: 'black',
        fontSize: 25
      },
      faceUp: {
        backgroundColor: '#feffe4',
        fontColor: 'black',
        fontSize: 25,
        fontFamily: 'Courier',
        pip: {
          size: 22,
          offset: 5
        }
      }
    },
    betting_round: {
      size: { width: 30, height: 22 },
      backgroundColor: '#916ebf',
      fontColor: 'white',
      fontSize: 10
    }
  }
};
config = smallConfig;
